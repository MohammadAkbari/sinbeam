<script setup lang="ts">
import type ApiServise from '@/core/services/api.service';
import type Link from '@/models/link';
import type LoadParameters from '@/models/loadParameters';
import type LoadingDto from '@/models/loadingDto';
import type UltimatePointLoadDto from '@/models/ultimatePointLoadDto';
import checkBox from '@/shared/components/checkBox.vue';
import shape from '@/shared/components/shape.vue';
import constants from '@/shared/globals/constants';
import { inject, onMounted, ref } from 'vue';
import type CharacteristicPointLoadDto from '@/models/characteristicPointLoadDto';
import type Point from '@/models/point';
import lineChartMultipleValueAxes from '@/shared/components/lineChartMultipleValueAxes.vue';
import type RestraintDto from '@/models/restraintDto';
import type WebVerification from '@/models/webVerification';
import type LineChartDto from '@/shared/components/models/lineChartDto';


export interface Props {
    links: Link[]
}

const props = withDefaults(defineProps<Props>(), {});
const emit = defineEmits(['nextStep', 'saveLinks']);

const apiServise = inject('apiServise') as ApiServise;

const reRenderShape = ref(0 as number);
const loadingDto = ref({ permanentLoads: {}, variableLoads: {}, ultimateLoads: {} } as LoadingDto);

const webVerification = ref({} as WebVerification);
const chartData = ref([] as LineChartDto[]);
let chartDataLabels = [];
const reRenderChart = ref(0 as number);


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

    emit('saveLinks', data._links)
});
apiServise.callApi(props.links, constants.restraints.getRestraint).then((data: RestraintDto) => {
    loadingDto.value.fullRestraintTopFlange = data.fullRestraintTopFlange;
    loadingDto.value.topFlangeRestraints = data.topFlangeRestraints ?? [];

    loadingDto.value.fullRestraintBottomFlange = data.fullRestraintBottomFlange;
    loadingDto.value.bottomFlangeRestraints = data.bottomFlangeRestraints ?? [];



    reRenderShape.value++;
});

onMounted(() => {
    getWebVerification();
})

const getWebVerification = () => {

    chartDataLabels = [];

    apiServise.callApi(props.links, constants.webVerification.getWebVerification).then((data: WebVerification) => {

        webVerification.value.caption = data.caption;
        webVerification.value.webLocalBuckle = data.webLocalBuckle;

        webVerification.value.one = data.one;
        webVerification.value.two = data.two;

        webVerification.value.three = data.three;
        webVerification.value.four = data.four;
        webVerification.value.five = data.five;

        chartData.value = webVerification.value.one.map(e => ({ title: e.x, values: [e.y] } as LineChartDto));
        chartDataLabels.push('Applied Shear');

        addLineChart(webVerification.value.two, 'two');
        addLineChart(webVerification.value.three, 'Global Buckling');
        addLineChart(webVerification.value.four, 'four');
        addLineChart(webVerification.value.five, 'Utilisation');

        reRenderChart.value++;
    });
}


const addLineChart = (list: Array<Point>, title: string) => {
    list.forEach((item) => {
        chartData.value.find(e => e.title == item.x).values.push(item.y);
    });
    chartDataLabels.push(title);
}

const changedWebLocalBuckle = () => {
    const urlKey = webVerification.value.webLocalBuckle ? constants.webVerification.setWebLocalBuckle:constants.webVerification.unsetWebLocalBuckle;
    apiServise.callApi(props.links,urlKey).then(()=>{
        getWebVerification();
    });
}

const nextStep = () => {
    emit('nextStep');
}

</script>

<template>
    <div class="row">
        <div class="col col-3" style="margin: 3px;">
            <div class="row">
                <div class="col col-6">
                    <span>Include local buckling?</span>
                </div>
                <div class="col col-6"><check-box v-model="webVerification.webLocalBuckle" :labelWidth="0"
                        @changed="changedWebLocalBuckle" /></div>
            </div>
        </div>
        <div class="col col-6">
            <span style="color: green;">
                {{ webVerification.caption }}
            </span>
        </div>
    </div>
    <hr>
    <div class="col col-8" :key="reRenderChart">
        <line-chart-multiple-value-axes :chartData="chartData" :labels="chartDataLabels" yAxisText="Bending Moment (kNm)"
            :inversed="false" :indexTwoAxios="4" />
    </div>
    <br>
    <div class="row">
        <shape :loadingDto="loadingDto" :reRenderShape="reRenderShape" />
    </div>
    <div class="row" style="justify-content: end; margin-top: 70px;width: 100%;">
        <button class="btn btn-success col col-md-2 mx-2" @click="nextStep()">next</button>
    </div>
</template>
