<script setup lang="ts">
import { DesignType } from '@/enums/designType';
import type Link from '@/models/link';
import { inject, onMounted, ref } from 'vue';
import type ApiServise from '@/core/services/api.service';
import constants from '@/shared/globals/newConstants';
import type AnalysisResultDto from '@/models/analysisResultDto';
import type LineChartDto from '@/shared/components/models/lineChartDto';
import type Point from '@/models/point';
import lineChart from '@/shared/components/lineChart.vue';
import type LoadingDto from '@/dtos/loadingDto';
import helper from '@/shared/common/helper';
import { CombinationType } from '@/enums/combinationType';
import analysis from "@/assets/img/analysis.png"
import {useCounterStore} from '@/stores/counter';

const store = useCounterStore();


const emit = defineEmits(['nextStep', 'clearForm', 'saveLinks']);
const apiServise = inject('apiServise') as ApiServise;


export interface Props {
    links: Link[]
}

const props = withDefaults(defineProps<Props>(), {
    //hasCreated: false
});

const analysisResultDto = ref({} as AnalysisResultDto);

const bendingData = ref([] as LineChartDto[]);
const deflectionData = ref([] as LineChartDto[]);
const shearData = ref([] as LineChartDto[]);

const designTypeEnum = DesignType;
const designType = ref(DesignType.Irish as DesignType);

const shearLabels = ['shear'];
const bendingLabels = ['bending'];
const deflectionDataLabels = [];
const reRenderBendingData = ref(0 as number);


const combinationTypeList = helper.convertEnumToListItem(CombinationType);
const combinationTypeSelected = ref(CombinationType.C1 as CombinationType);

onMounted(() => {
    store.isShowBusyIndicator =true;
    apiServise.callApi(props.links, constants.loading.getLoading).then((data: LoadingDto) => {
        designType.value = data.designType;
       
        getDate();
    });
});

const getDate = () => {
    let model = null;

    if (designType.value == DesignType.Iran) {
        model = {
            combination: CombinationType[combinationTypeSelected.value]
        }
    }


    apiServise.callApi(props.links, constants.analysis.getAnalysis, model).then((data: AnalysisResultDto) => {

        deflectionDataLabels.length = 0;
        analysisResultDto.value.bending = data.bending;
        analysisResultDto.value.deflection = data.deflection;
        analysisResultDto.value.shear = data.shear;

        bendingData.value = removeDupliate(data.bending.points).map(e => ({ title: e.x, values: [e.y] } as LineChartDto));
        shearData.value = removeDupliate(data.shear.points).map(e => ({ title: e.x, values: [e.y] } as LineChartDto));
        deflectionData.value = removeDupliate(data.deflection.bending).map(e => ({ title: e.x, values: [e.y] } as LineChartDto));

        deflectionDataLabels.push('bending');

        data.deflection.sheer.forEach((item) => {
            deflectionData.value.find(e => e.title == item.x).values.push(item.y);
        });
        deflectionDataLabels.push('sheer')

        data.deflection.total.forEach((item) => {
            deflectionData.value.find(e => e.title == item.x).values.push(item.y);
        })
        deflectionDataLabels.push('total')

        reRenderBendingData.value++;

        emit("saveLinks",data._links);

        store.isShowBusyIndicator = false;

    });

}

const removeDupliate = (data: Point[]): Point[] => {
    return data.filter((value, index, self) => {
        return index === self.findIndex((t) => {
            return t.x === value.x && t.y === value.y
        })
    });
}

const changeCombinationType = (event) => {
    combinationTypeSelected.value = +event.target.value;        
    getDate();
}

const saveCombination = () =>{
    apiServise.callApi(props.links, constants.analysis.saveCombination, {combination: combinationTypeSelected.value}).then((data)=>{
        console.log(data);
    });
}

const nextStep = () => {
    if(designType.value == designTypeEnum.Iran){
        saveCombination();
    }
    emit("nextStep");
}

const clearForm = () => {
    emit("clearForm");
}


</script>



<template>
    <div class="col-11">
        <panel label="Analysis" :icon="analysis" size="col-lg-12">
            <template v-slot:body>
                <div class="row px-2 py-3" v-if="designType == designTypeEnum.Iran">
                    <div class="d-flex justify-content-start ">
                        <span class="fs-14 fw-500 mx-4" style="opacity: 78%;">Combination:</span>
                        <div class="form-check mx-4" v-for="(item, index) in combinationTypeList" :key="index">
                            <input class="form-check-input fs-16" type="radio" name="Combination" :value="item.id"
                                v-model="combinationTypeSelected"
                                :id="`Characteristic-${item.title}`"
                                @click="changeCombinationType($event)">
                            <label class="form-check-label fs-16 fw-400" style="opacity: 78%;"
                                :for="`Characteristic-${item.title}`">
                                {{ item.title }}
                            </label>
                        </div>
                    </div>
                </div>


                <div :key="reRenderBendingData">
                    <sub-panel label="Bending">
                        <template v-slot:body>
                            <div class="row">
                                <div class="col-3">
                                    <div class="row">
                                        <div class="col-lg-4 p-0 py-1">
                                            <label for="exampleFormControlInput1" style="height: 36px; width: 200px;"
                                                class="form-label mb-0 d-flex input-label px-3 py-2">Max moment</label>
                                        </div>
                                        <div class="col-lg-8 py-1">
                                            <div class="form-check ">
                                                <div class="form-label mb-0 input-label d-flex justify-content-between px-3"
                                                    style="background-color: #F5F5F5;height: 36px; width: 200px; padding-top: 8px;">
                                                    <span class="justify-content-start">{{
                                                        analysisResultDto.bending?.maxMoment.toFixed(4) }}
                                                        kNm at 1.2m</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-lg-4 p-0 py-1">
                                            <label for="exampleFormControlInput1" style="height: 36px; width: 200px;"
                                                class="form-label mb-0 d-flex input-label px-3 py-2">Min moment</label>
                                        </div>
                                        <div class="col-lg-8 py-1">
                                            <div class="form-check ">
                                                <div class="form-label mb-0 input-label d-flex justify-content-between px-3"
                                                    style="background-color: #F5F5F5;height: 36px; width: 200px; padding-top: 8px;">
                                                    <span class="justify-content-start">{{
                                                        analysisResultDto.bending?.minMoment.toFixed(4) }}
                                                        kNm at 1.2m</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-9">
                                    <!-- <span class="fs-14 fw-500 chart-title" style="">Bending moment kNm</span> -->
                                    <line-chart :chartData="bendingData" :labels="bendingLabels"
                                        yAxisText="Bending Moment (kNm)" :inversed="true" />
                                </div>
                            </div>
                        </template>
                    </sub-panel>
                    <sub-panel label="Shear">
                        <template v-slot:body>
                            <div class="row">
                                <div class="col-3">
                                    <div class="row">
                                        <div class="col-lg-4 p-0 py-1">
                                            <label for="exampleFormControlInput1" style="height: 36px; width: 200px;"
                                                class="form-label mb-0 d-flex input-label px-3 py-2">Max Shear</label>
                                        </div>
                                        <div class="col-lg-8 py-1">
                                            <div class="form-check ">
                                                <div class="form-label mb-0 input-label d-flex justify-content-between px-3"
                                                    style="background-color: #F5F5F5;height: 36px; width: 200px; padding-top: 8px;">
                                                    <span class="justify-content-start">{{
                                                        analysisResultDto.shear?.maxShear.toFixed(4) }}
                                                        kNm at 1.2m</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-lg-4 p-0 py-1">
                                            <label for="exampleFormControlInput1" style="height: 36px; width: 200px;"
                                                class="form-label mb-0 d-flex input-label px-3 py-2">Min Shear</label>
                                        </div>
                                        <div class="col-lg-8 py-1">
                                            <div class="form-check ">
                                                <div class="form-label mb-0 input-label d-flex justify-content-between px-3"
                                                    style="background-color: #F5F5F5;height: 36px; width: 200px; padding-top: 8px;">
                                                    <span class="justify-content-start">{{
                                                        analysisResultDto.shear?.minShear.toFixed(4) }}
                                                        kNm at 1.2m</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-9">
                                    <!-- <span class="fs-14 fw-500 chart-title" style="">Shear force (kN)</span> -->
                                    <line-chart :chartData="shearData" :labels="shearLabels" yAxisText="Shear Force (kN)" />
                                </div>
                            </div>
                        </template>
                    </sub-panel>
                    <sub-panel label="Deflection">
                        <template v-slot:body>
                            <div class="row">
                                <div class="col-3">
                                    <div class="row">
                                        <div class="col-lg-4 p-0 py-1">
                                            <label for="exampleFormControlInput1" style="height: 36px; width: 200px;"
                                                class="form-label mb-0 d-flex input-label px-3 py-2">Max deflection</label>
                                        </div>
                                        <div class="col-lg-8 py-1">
                                            <div class="form-check ">
                                                <div class="form-label mb-0 input-label d-flex justify-content-between px-3"
                                                    style="background-color: #F5F5F5;height: 36px; width: 200px; padding-top: 8px;">
                                                    <span class="justify-content-start">{{
                                                        analysisResultDto.deflection?.maxDefln.toFixed(4) }}
                                                        kNm at 1.2m</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-9">
                                    <!-- <span class="fs-14 fw-500 chart-title" style="">Deflection (mm)</span> -->
                                    <line-chart :chartData="deflectionData" :labels="deflectionDataLabels"
                                        yAxisText="Deflection (mm)" :inversed="true" :isPoint="true" />
                                </div>
                            </div>
                        </template>
                    </sub-panel>
                </div>


            </template>
        </panel>



        <div class="row d-flex justify-content-end py-5">
            <button type="button" class="btn px-2 fs-16 fw-500 mx-2" @click="clearForm"
                style="background-color: #F4F4F4; width: 196px; height: 42px; color: #125CCB;">Clear All</button>
            <button type="button" class="btn btn-primary px-2 fs-16 fw-500  mx-2" @click="nextStep"
                style="background-color: #125CCB; width: 196px; height: 42px;">Next</button>
        </div>
    </div>
</template>

<style scoped>
.chart-title {
    writing-mode: vertical-lr;
    transform: scale(-1, -1);
    color: #404040;
    position: relative;
    top: 20%;
    right: 10px;
}
</style>