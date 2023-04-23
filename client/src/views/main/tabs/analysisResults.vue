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

const data1 = [
    {
        title: 1,
        values: [0]
    } as LineChartDto,
    {
        title: 2,
        values: [6]
    } as LineChartDto,

] as LineChartDto[];

const data2 = [
    {
        title: 1,
        values: [0]
    } as LineChartDto,
    {
        title: 2,
        values: [6]
    } as LineChartDto,
    {
        title: 3,
        values: [6]
    } as LineChartDto, {
        title: 4,
        values: [6]
    } as LineChartDto,
] as LineChartDto[];

const labels=['behnam'];


apiServise.callApi(props.links, constants.loading.getLoading).then((data: LoadingDto) => {

loadingDto.value.loadType = data.loadType;
loadingDto.value.selfWeight = data.selfWeight;
loadingDto.value.span = data.span;
loadingDto.value.permanentLoads = data.permanentLoads ?? {} as LoadParameters;
loadingDto.value.ultimateLoads = data.ultimateLoads ?? {} as LoadParameters;
loadingDto.value.variableLoads = data.variableLoads ?? {} as LoadParameters;
loadingDto.value.ultimatePointLoads = data.ultimatePointLoads ?? [] as UltimatePointLoadDto[];
loadingDto.value.characteristicPointLoads = data.characteristicPointLoads ?? [] as CharacteristicPointLoadDto[];


reRenderShape.value++;
// loadingDto.value.loadType = loadTypeCharacteristicLoads;
emit('saveLinks', data._links)
})


apiServise.callApi(props.links, constants.analysis.getBending).then((data: {points : Point[]}) => {

    data.points = data.points.filter((value, index, self) =>
    index === self.findIndex((t) => (
        t.x === value.x && t.y === value.y
    )))

    bendingData.value = data.points.map(e=>({title : e.x,values:[e.y]} as LineChartDto ))
    reRenderBendingData.value++;
})







 const chartTypes = helper.convertEnumToListItem(ChartType);
 const selectedChart = ref(ChartType.Bending as ChartType);



</script>

<template>
<div class="row" >
    <div class="col col-2">
        <single-select :items="chartTypes" v-model="selectedChart" label="Show" :labelWidth="0"/>
    </div>
    <div class="col col-10" :key="reRenderBendingData">
        <line-chart v-if="selectedChart == ChartType.Bending" :chartData="bendingData" :labels="labels"></line-chart>
        <line-chart v-if="selectedChart == ChartType.Shear" :chartData="data1" :labels="labels"></line-chart>
        <line-chart v-if="selectedChart == ChartType.Deflection" :chartData="data2" :labels="labels"></line-chart>
    </div>
</div>
<br>
    <div class="row"  >
        <shape :loadingDto="loadingDto" :reRenderShape="reRenderShape" />
    </div> 


    
</template>