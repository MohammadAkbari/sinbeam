<script setup lang="ts">
import type ApiServise from '@/core/services/api.service';
import { ChartType } from '@/enums/chartType';
import type Link from '@/models/link';
import type LoadParameters from '@/models/loadParameters';
import type LoadingDto from '@/models/loadingDto';
import type UltimatePointLoadDto from '@/models/ultimatePointLoadDto';
import helper from '@/shared/common/helper';
import lineChart from '@/shared/components/lineChart.vue';
import type LineChartDto from '@/shared/components/models/lineChartDto';
import singleSelect from '@/shared/components/singleSelect.vue';
import shape from '@/shared/components/shape.vue';
import constants from '@/shared/globals/constants';
import { inject, ref } from 'vue';
import type CharacteristicPointLoadDto from '@/models/characteristicPointLoadDto';
import type Point from '@/models/point';
import type AnalysisResultDto from '@/models/analysisResultDto';
import type RestraintDto from '@/models/restraintDto';


export interface Props {
    links: Link[]
}

const props = withDefaults(defineProps<Props>(), {});
const emit = defineEmits(['nextStep', 'saveLinks']);

const apiServise = inject('apiServise') as ApiServise;


const loadingDto = ref({ permanentLoads: {}, variableLoads: {}, ultimateLoads: {} } as LoadingDto);
const reRenderShape = ref(0 as number);
const reRenderBendingData = ref(0 as number);

const bendingData = ref([] as LineChartDto[]);
const sheerData = ref([] as LineChartDto[]);

const deflectionData = ref([] as LineChartDto[]);

const chartTypes = helper.convertEnumToListItem(ChartType);
const selectedChart = ref(ChartType.Bending as ChartType);

const shearLabels = ['shear'];
const bendingLabels = ['bending'];
const deflectionDataLabels = [];

apiServise.callApi(props.links, constants.loading.getLoading).then((data: LoadingDto) => {

    loadingDto.value.loadType = data.loadType;
    loadingDto.value.selfWeight = data.selfWeight;
    loadingDto.value.span = data.span;
    loadingDto.value.permanentLoads = data.permanentLoads ?? {} as LoadParameters;
    loadingDto.value.ultimateLoads = data.ultimateLoads ?? {} as LoadParameters;
    loadingDto.value.variableLoads = data.variableLoads ?? {} as LoadParameters;
    loadingDto.value.ultimatePointLoads = data.ultimatePointLoads ?? [] as UltimatePointLoadDto[];
    loadingDto.value.characteristicPointLoads = data.characteristicPointLoads ?? [] as CharacteristicPointLoadDto[];


    reRenderBendingData.value++;

    emit('saveLinks', data._links)
})


const analysisResultDto = ref({}as AnalysisResultDto);

apiServise.callApi(props.links, constants.analysis.getBending).then((data: AnalysisResultDto) => {

    analysisResultDto.value.bending=data.bending;
    analysisResultDto.value.shear=data.shear;
    analysisResultDto.value.deflection=data.deflection;

    bendingData.value = removeDupliate(data.bending.points).map(e => ({ title: e.x, values: [e.y] } as LineChartDto));
    sheerData.value = removeDupliate(data.shear.points).map(e => ({ title: e.x, values: [e.y] } as LineChartDto));

    deflectionData.value = removeDupliate(data.deflection.bending).map(e => ({ title: e.x, values: [e.y] } as LineChartDto));
    deflectionDataLabels.push('bending')


    data.deflection.sheer.forEach((item)=>{
        deflectionData.value.find(e=>e.title == item.x).values.push(item.y);
    });
    deflectionDataLabels.push('sheer')

    data.deflection.total.forEach((item)=>{
        deflectionData.value.find(e=>e.title == item.x).values.push(item.y);
    })
    deflectionDataLabels.push('total')

    reRenderBendingData.value++;
})


apiServise.callApi(props.links, constants.restraints.getRestraint).then((data: RestraintDto) => {
    loadingDto.value.fullRestraintTopFlange = data.fullRestraintTopFlange;
    loadingDto.value.topFlangeRestraints = data.topFlangeRestraints ?? [];

    loadingDto.value.fullRestraintBottomFlange = data.fullRestraintBottomFlange;
    loadingDto.value.bottomFlangeRestraints = data.bottomFlangeRestraints ?? [];
   
    

    reRenderShape.value++;
});


const removeDupliate = (data: Point[]): Point[] => {
    return data.filter((value, index, self) => {
        return index === self.findIndex((t) => {
            return t.x === value.x && t.y === value.y
        })
    });
}

const next =()=>{
    emit('nextStep');
}

</script>

<template>
    <div class="row">
        <div class="col col-3">
            <single-select :items="chartTypes" v-model="selectedChart" label="Show" :labelWidth="0" />

            <template v-if="selectedChart == ChartType.Bending">
                <div class="col col-12">
                    <span>max moment</span> = 
                    <span>{{ analysisResultDto.bending?.maxMoment.toFixed(4)  }} kNm</span>
                </div>
                <div class="col col-12">
                    <span>min moment</span> = 
                    <span>{{ analysisResultDto.bending?.minMoment.toFixed(4)  }} kNm</span>
                </div>  
            </template>

            <template v-if="selectedChart == ChartType.Shear">
                <div class="col col-12">
                    <span>max shear</span> = 
                    <span>{{ analysisResultDto.shear?.maxShear.toFixed(4)  }} kNm</span>
                </div>
                <div class="col col-12">
                    <span>min shear</span> = 
                    <span>{{ analysisResultDto.shear?.minShear.toFixed(4)  }} kNm</span>
                </div>  
            </template>

            <template v-if="selectedChart == ChartType.Deflection">
                <div class="col col-12">
                    <span>max defln</span> = 
                    <span>{{ analysisResultDto.deflection.maxDefln.toFixed(4) }} kNm</span>
                </div>
                
            </template>




        </div>
        <div class="col col-9" :key="reRenderBendingData">
            <line-chart v-if="selectedChart == ChartType.Bending" :chartData="bendingData" :labels="bendingLabels"
                yAxisText="Bending Moment (kNm)" :inversed="true" />
            <line-chart v-if="selectedChart == ChartType.Shear" :chartData="sheerData" :labels="shearLabels"
                yAxisText="Shear Force (kN)" />
            <line-chart v-if="selectedChart == ChartType.Deflection" :chartData="deflectionData" :labels="deflectionDataLabels"
                yAxisText="Deflection (mm)" :inversed="true" :isPoint="true" />
        </div>
    </div>
    <br>
    <div class="row">
        <shape :loadingDto="loadingDto" :reRenderShape="reRenderShape" />
    </div>
    <div class="row" style="position: absolute;bottom: 30px;right: 75px; justify-content: end; display: flex;width: 100%;">
        <button class="btn btn-primary col col-md-2 mx-2" @click="next()">next</button>
    </div>
</template>