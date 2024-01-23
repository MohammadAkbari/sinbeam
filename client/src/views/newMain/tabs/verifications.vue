<script setup lang="ts">
import { inject, onMounted, ref } from 'vue';
import restraints from "@/assets/img/restraints.png";
import verifications from "@/assets/img/verifications.png";
import view3 from "@/assets/img/view-3.png";
import infocircle from "@/assets/img/info-circle.png";
import view4 from "@/assets/img/view-4.png";
import includeheader from "@/assets/img/include-header.png";
import lineChart from '@/shared/components/lineChart.vue';
import constants from '@/shared/globals/newConstants';
import type ApiServise from '@/core/services/api.service';
import type LoadingDto from '@/dtos/loadingDto';
import type Link from '@/models/link';
import { DesignType } from '@/enums/designType';
import type LoadParameters from '@/models/loadParameters';
import type UltimatePointLoadDto from '@/dtos/ultimatePointLoadDto';
import type CharacteristicPointLoadDto from '@/dtos/characteristicPointLoadDto';
import RestraintDto from '@/dtos/restraintDto';
import { isNaN } from '@amcharts/amcharts5/.internal/core/util/Type';
import type LineChartDto from '@/shared/components/models/lineChartDto';

const emit = defineEmits(['nextStep', 'clearForm', 'saveLinks']);
const apiServise = inject('apiServise') as ApiServise;

export interface Props {
    links: Link[]
}

const props = withDefaults(defineProps<Props>(), {
    //hasCreated: false
});

const loadingDto = ref({ permanentLoads: {}, variableLoads: {}, ultimateLoads: {} } as LoadingDto);

const designType = DesignType;

const loadInput = ref(true as boolean);

const restraintDto = ref({ bottomFlangeRestraints: [] as number[], topFlangeRestraints: [] as number[] } as RestraintDto);

const topValue = ref(null as number);
const bottomValue = ref(null as number);
const reRender = ref(0 as number);


const positionTop = ref(true as boolean);
const positionBottom = ref(true as boolean);



const chartData = ref([] as LineChartDto[]);
const chartLabel = [];

const showChart = ref(false as boolean);


const chartCaption = ref("" as string)




onMounted(() => {
    debugger
    apiServise.callApi(props.links, constants.loading.getLoading).then((data: any) => {
        emit('saveLinks', data._links);

        loadingDto.value.loadType = data.loadType;
        loadingDto.value.designType = data.designType;
        loadingDto.value.selfWeight = data.selfWeight;
        loadingDto.value.span = data.span;
        loadingDto.value.permanentLoads = data.permanentLoads ?? {} as LoadParameters;
        loadingDto.value.ultimateLoads = data.ultimateLoads ?? {} as LoadParameters;
        loadingDto.value.variableLoads = data.variableLoads ?? {} as LoadParameters;
        loadingDto.value.ultimatePointLoads = data.ultimatePointLoads ?? [] as UltimatePointLoadDto[];
        loadingDto.value.characteristicPointLoads = data.characteristicPointLoads ?? [] as CharacteristicPointLoadDto[];
        loadingDto.value.combinationType = data.combinationType;
    });


    getData();


})

const removeDupliate = (data: Point[]): Point[] => {
    return data.filter((value, index, self) => {
        return index === self.findIndex((t) => {
            return t.x === value.x && t.y === value.y
        })
    });
}

const getData = () => {


    apiServise.callApi(props.links, constants.verification.getRestraints).then((data: RestraintDto) => {
        restraintDto.value.bottomFlangeRestraints = data.bottomFlangeRestraints ?? [];
        restraintDto.value.fullRestraintBottomFlange = data.fullRestraintBottomFlange;
        restraintDto.value.fullRestraintTopFlange = data.fullRestraintTopFlange;
        restraintDto.value.topFlangeRestraints = data.topFlangeRestraints ?? [];
        reRender.value++;

        emit('saveLinks', data._links);
    });



    apiServise.callApi(props.links, constants.verification.getBottomFlangeVerification).then((data) => {
        console.log('getBottomFlangeVerification', data);
    });
    apiServise.callApi(props.links, constants.verification.getTopFlangeVerification).then((data) => {
        console.log('getTopFlangeVerification', data);
    });
    apiServise.callApi(props.links, constants.verification.getWebVerification).then((data) => {


        chartCaption.value = data.caption

        chartData.value = removeDupliate(data.one).map(e => ({ title: e.x, values: [e.y] } as LineChartDto));
        chartLabel.push('one')

        data.two.forEach((item) => {
            chartData.value.find(e => e.title == item.x).values.push(item.y);
        });
        chartLabel.push('two')

        data.three.forEach((item) => {
            chartData.value.find(e => e.title == item.x).values.push(item.y);
        });
        chartLabel.push('three')

        data.four.forEach((item) => {
            chartData.value.find(e => e.title == item.x).values.push(item.y);
        });
        chartLabel.push('four')

        data.five.forEach((item) => {
            chartData.value.find(e => e.title == item.x).values.push(item.y);
        });
        chartLabel.push('five')


        showChart.value=true

        console.log('getWebVerification', data);
    });



}

const addFlang = (isTop: boolean) => {
    if (isTop) {

        const value = positionTop.value ? topValue.value : (topValue.value * loadingDto.value.span) / 100

        if (!restraintDto.value.topFlangeRestraints.some(e => e == value)) {
            restraintDto.value.topFlangeRestraints.push(value);
            restraintDto.value.topFlangeRestraints.sort((a, b) => a > b ? 1 : -1);
            saveRestraint()
        }
        topValue.value = null;
    } else {
        const value = positionBottom.value ? bottomValue.value : (bottomValue.value * loadingDto.value.span) / 100
        if (!restraintDto.value.bottomFlangeRestraints.some(e => e == value)) {
            restraintDto.value.bottomFlangeRestraints.push(value);
            restraintDto.value.bottomFlangeRestraints.sort((a, b) => a > b ? 1 : -1);
            saveRestraint()
        }
        bottomValue.value = null;
    }

}

const cahngeFullRestraintFlangee = () => {
    saveRestraint();
}


const saveRestraint = () => {
    apiServise.callApi(props.links, constants.verification.saveRestraint, restraintDto.value).then(() => {
        getData();
    })
}

const removeFlang = (index: number, isTop: boolean) => {
    if (isTop) {
        restraintDto.value.topFlangeRestraints.splice(index, 1)
    } else {
        restraintDto.value.bottomFlangeRestraints.splice(index, 1)
    }
}

const nextStep = () => {
    emit("nextStep");
}

const clearForm = () => {
    emit("clearForm");
}

</script>
<template>
    <div class="col-11">
        <panel label="Restraints" :icon="restraints" size="col-lg-12">
            <template v-slot:body>
                <sub-panel label="View">
                    <template v-slot:body>
                        <div class="row">
                            <div class="col-4">
                                <div class="row py-2">
                                    <div class="form-check d-flex justify-content-start mx-4">
                                        <input class="form-check-input fs-16" type="checkbox"
                                            @change="cahngeFullRestraintFlangee"
                                            v-model="restraintDto.fullRestraintTopFlange" id="fullRestraintTopFlange">
                                        <label class="form-check-label input-label px-2 fw-400 fs-16"
                                            for="fullRestraintTopFlange">
                                            Full Restraint Top Flange
                                        </label>
                                    </div>
                                </div>
                                <div class="row py-2">
                                    <span class="fs-14 fw-500" style=" color: #5C5C5C; opacity: 78%;">Position</span>
                                    <div class="d-flex justify-content-start py-2">
                                        <div class="form-check mx-2">
                                            <input class="form-check-input fs-16" type="radio" name="Element-2"
                                                :value="true" v-model="positionTop" id="Characteristic-2">
                                            <label class="form-check-label fs-16 fw-400" style="opacity: 78%;"
                                                for="Characteristic-2">
                                                Absolute
                                            </label>
                                        </div>
                                        <div class="form-check mx-2">
                                            <input class="form-check-input fs-16" type="radio" name="Element-2"
                                                :value="false" v-model="positionTop" id="Ultimate-3">
                                            <label class="form-check-label fs-16 fw-400" style="opacity: 78%;"
                                                for="Ultimate-3">
                                                Relative
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div class="row py-2">
                                    <span class="fs-14 fw-500" style=" color: #5C5C5C; opacity: 78%;">To top flange</span>
                                    <div class="d-flex justify-content-start py-2">
                                        <div class="position-relative">
                                            <input type="number" class="form-control fs-16" v-model="topValue"
                                                style="height: 36px; width:278px;">
                                            <button type="button" @click="addFlang(true)"
                                                class="btn px-2 position-absolute fs-14 fw-400 my-1 py-1"
                                                :style="`color:#FFFFFF ;background-color: ${isNaN(topValue) ? '#626262' : '#125CCB'}; top: 2px; right: 3px;height: 28px; width: 80px;`">
                                                + Add
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div class="row py-2" v-for="(item, index) in restraintDto.topFlangeRestraints"
                                    :key="index">
                                    <div class="d-flex justify-content-start py-2">
                                        <div class="position-relative">
                                            <span type="text" class="form-control fs-16" disabled
                                                style="height: 36px; width:278px; background-color: #FBFBFB; color: #3C3C3C;">{{
                                                    item }}</span>
                                            <span class="position-absolute fs-14 fw-500 my-1 py-1"
                                                @click="removeFlang(index, true)"
                                                style="color: #B61C1C; top: 2px; right: 10px;height: 28px; cursor: pointer;">
                                                Remove
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div class="row py-2">
                                    <div class="form-check d-flex justify-content-start py-2 mx-4">
                                        <input class="form-check-input fs-16" type="checkbox"
                                            @change="cahngeFullRestraintFlangee"
                                            v-model="restraintDto.fullRestraintBottomFlange" id="fullRestraintBottomFlange">
                                        <label class="form-check-label input-label px-2 fw-400 fs-16"
                                            for="fullRestraintBottomFlange">
                                            Full Restraint Bottom Flange
                                        </label>
                                    </div>
                                </div>
                                <div class="row py-2">
                                    <span class="fs-14 fw-500" style=" color: #5C5C5C; opacity: 78%;">Position</span>
                                    <div class="d-flex justify-content-start py-2">
                                        <div class="form-check mx-2">
                                            <input class="form-check-input fs-16" type="radio" name="Element-1"
                                                :value="true" v-model="positionBottom" id="Characteristic-1">
                                            <label class="form-check-label fs-16 fw-400" style="opacity: 78%;"
                                                for="Characteristic-1">
                                                Absolute
                                            </label>
                                        </div>
                                        <div class="form-check mx-2">
                                            <input class="form-check-input fs-16" type="radio" name="Element-1"
                                                :value="false" v-model="positionBottom" id="Ultimate-1">
                                            <label class="form-check-label fs-16 fw-400" style="opacity: 78%;"
                                                for="Ultimate-1">
                                                Relative
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div class="row py-2">
                                    <span class="fs-14 fw-500" style=" color: #5C5C5C; opacity: 78%;">To top flange</span>
                                    <div class="d-flex justify-content-start py-2">
                                        <div class="position-relative">
                                            <input type="number" class="form-control fs-16" v-model="bottomValue"
                                                style="height: 36px; width:278px;">
                                            <button type="button" @click="addFlang(false)"
                                                class="btn px-2 position-absolute fs-14 fw-400 my-1 py-1"
                                                :style="`color:#FFFFFF ; background-color: ${isNaN(bottomValue) ? '#626262' : '#125CCB'} ; top: 2px; right: 3px;height: 28px; width: 80px;`">
                                                + Add
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div class="row py-2" v-for="(item, index) in restraintDto.bottomFlangeRestraints"
                                    :key="index">
                                    <div class="d-flex justify-content-start py-2">
                                        <div class="position-relative">
                                            <span type="text" class="form-control fs-16" disabled
                                                style="height: 36px; width:278px; background-color: #FBFBFB; color: #3C3C3C;">{{
                                                    item }}</span>
                                            <span class="position-absolute fs-14 fw-500 my-1 py-1"
                                                @click="removeFlang(index, false)"
                                                style="color: #B61C1C; top: 2px; right: 10px;height: 28px;cursor: pointer;">
                                                Remove
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-8 d-flex align-items-center justify-content-center">
                                <div class="row" style="width: 100%;" :key="reRender">
                                    <shape-loading :loadingDto="loadingDto" :restraintDto="restraintDto"></shape-loading>
                                </div>
                            </div>
                        </div>
                    </template>
                </sub-panel>
            </template>
        </panel>
        <panel label="Verifications" :icon="verifications" size="col-lg-12">
            <template v-slot:body>
                <sub-panel label="Top Flange Verification">
                    <template v-slot:body>
                        <span class="fs-16 fw-600 px-3" style="color: #125CCB;">Maximum Utilization is 1.67</span>
                        <div class="row px-4 py-3">
                            <table class="table table-bordered text-center">
                                <thead>
                                    <tr class="fs-14 fw-500"
                                        style="background-color:#F6F6F6;height: 48px; color: #5C5C5C;vertical-align: middle;">
                                        <td style="width: 18%;">From(M)</td>
                                        <td style="width: 18%;">To(M)</td>
                                        <td style="width: 18%;">Design force (kN)</td>
                                        <td style="width: 18%;">Resistance (kN)</td>
                                        <td style="width: 18%;">Utilization</td>
                                        <td style="width: 10%;">Detail</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr class="fs-14 fw-500 py-0"
                                        style="height: 48px;color: #5C5C5C;vertical-align: middle;">
                                        <td>0</td>
                                        <td>15</td>
                                        <td>136</td>
                                        <td>82</td>
                                        <td>1.67</td>
                                        <td>
                                            <img :src="infocircle" alt="">
                                        </td>
                                    </tr>
                                    <tr class="fs-14 fw-500 py-0"
                                        style="height: 48px;color: #5C5C5C;vertical-align: middle;">
                                        <td>15</td>
                                        <td>20</td>
                                        <td>136</td>
                                        <td>525</td>
                                        <td>0.26</td>
                                        <td>
                                            <img :src="infocircle" alt="">
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="row px-4 py-3">
                            <div class="col-5 position-relative">
                                <div class="row border-left-green">
                                    <div class="row px-5">
                                        <div class="col-lg-3 p-0 py-1">
                                            <label for="exampleFormControlInput1" style="height: 36px; width: 200px;"
                                                class="form-label mb-0 d-flex input-label px-3 py-2">Segment from</label>
                                        </div>
                                        <div class="col-lg-8 py-1">
                                            <div class="form-check d-flex justify-content-between">
                                                <div class="col-5 form-label mb-0 input-label d-flex justify-content-between px-3"
                                                    style="background-color: #F5F5F5;height: 36px; width: 180px; padding-top: 8px;">
                                                    <span class="justify-content-start">15</span>
                                                    <span class="justify-content-end">mm</span>
                                                </div>
                                                <div
                                                    class="form-label mb-0 input-label d-flex justify-content-between px-3 py-2">
                                                    to</div>
                                                <div class="col-5 form-label mb-0 input-label d-flex justify-content-between px-3"
                                                    style="background-color: #F5F5F5;height: 36px; width: 180px; padding-top: 8px;">
                                                    <span class="justify-content-start">20</span>
                                                    <span class="justify-content-end">mm</span>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <div class="row px-5">
                                        <div class="col-lg-3 p-0 py-1">
                                            <label for="exampleFormControlInput1" style="height: 36px; width: 200px;"
                                                class="form-label mb-0 d-flex input-label px-3 py-2">Force due to
                                                moment</label>
                                        </div>
                                        <div class="col-lg-8 py-1">
                                            <div class="form-check ">
                                                <div class="form-label mb-0 input-label d-flex justify-content-between px-3"
                                                    style="background-color: #F5F5F5;height: 36px; width: 398px; padding-top: 8px;">
                                                    <span class="justify-content-start">135</span>
                                                    <span class="justify-content-end">kN</span>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <div class="row px-5">
                                        <div class="col-lg-3 p-0 py-1">
                                            <label for="exampleFormControlInput1" style="height: 36px; width: 200px;"
                                                class="form-label mb-0 d-flex input-label px-3 py-2">Effective Area</label>
                                        </div>
                                        <div class="col-lg-8 py-1">
                                            <div class="form-check ">
                                                <div class="form-label mb-0 input-label d-flex justify-content-between px-3"
                                                    style="background-color: #F5F5F5;height: 36px; width: 398px; padding-top: 8px;">
                                                    <span class="justify-content-start">135</span>
                                                    <span class="justify-content-end">kN</span>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <div class="row px-5">
                                        <div class="col-lg-3 p-0 py-1">
                                            <label for="exampleFormControlInput1" style="height: 36px; width: 200px;"
                                                class="form-label mb-0 d-flex input-label px-3 py-2">Correction factor
                                                kc</label>
                                        </div>
                                        <div class="col-lg-8 py-1">
                                            <div class="form-check ">
                                                <div class="form-label mb-0 input-label d-flex justify-content-between px-3"
                                                    style="background-color: #F5F5F5;height: 36px; width: 398px; padding-top: 8px;">
                                                    <span class="justify-content-start">0.77</span>
                                                    <!-- <span class="justify-content-end">kN</span> -->
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <div class="row px-5">
                                        <div class="col-lg-3 p-0 py-1">
                                            <label for="exampleFormControlInput1" style="height: 36px; width: 200px;"
                                                class="form-label mb-0 d-flex input-label px-3 py-2">Total</label>
                                        </div>
                                        <div class="col-lg-8 py-1">
                                            <div class="form-check ">
                                                <div class="form-label mb-0 input-label d-flex justify-content-between px-3"
                                                    style="background-color: #F5F5F5;height: 36px; width: 398px; padding-top: 8px;">
                                                    <span class="justify-content-start">136</span>
                                                    <span class="justify-content-end">kN</span>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-5 position-relative">
                                <div class="row border-left-green">
                                    <div class="row px-5">
                                        <div class="col-lg-3 p-0 py-1">
                                            <label for="exampleFormControlInput1" style="height: 36px; width: 200px;"
                                                class="form-label mb-0 d-flex input-label px-3 py-2">Segment length</label>
                                        </div>
                                        <div class="col-lg-8 py-1">
                                            <div class="form-check ">
                                                <div class="form-label mb-0 input-label d-flex justify-content-between px-3"
                                                    style="background-color: #F5F5F5;height: 36px; width: 398px; padding-top: 8px;">
                                                    <span class="justify-content-start">5000</span>
                                                    <span class="justify-content-end">mm</span>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <div class="row px-5">
                                        <div class="col-lg-3 p-0 py-1">
                                            <label for="exampleFormControlInput1" style="height: 36px; width: 200px;"
                                                class="form-label mb-0 d-flex input-label px-3 py-2">Slenderness</label>
                                        </div>
                                        <div class="col-lg-8 py-1">
                                            <div class="form-check ">
                                                <div class="form-label mb-0 input-label d-flex justify-content-between px-3"
                                                    style="background-color: #F5F5F5;height: 36px; width: 398px; padding-top: 8px;">
                                                    <span class="justify-content-start">0.847</span>
                                                    <!-- <span class="justify-content-end">kN</span> -->
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <div class="row px-5">
                                        <div class="col-lg-3 p-0 py-1">
                                            <label for="exampleFormControlInput1" style="height: 36px; width: 200px;"
                                                class="form-label mb-0 d-flex input-label px-3 py-2">Resistance</label>
                                        </div>
                                        <div class="col-lg-8 py-1">
                                            <div class="form-check ">
                                                <div class="form-label mb-0 input-label d-flex justify-content-between px-3"
                                                    style="background-color: #F5F5F5;height: 36px; width: 398px; padding-top: 8px;">
                                                    <span class="justify-content-start">525</span>
                                                    <span class="justify-content-end">kN</span>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <div class="row px-5">
                                        <div class="col-lg-3 p-0 py-1">
                                            <label for="exampleFormControlInput1" style="height: 36px; width: 200px;"
                                                class="form-label mb-0 d-flex input-label px-3 py-2">Force from
                                                axial</label>
                                        </div>
                                        <div class="col-lg-8 py-1">
                                            <div class="form-check ">
                                                <div class="form-label mb-0 input-label d-flex justify-content-between px-3"
                                                    style="background-color: #F5F5F5;height: 36px; width: 398px; padding-top: 8px;">
                                                    <span class="justify-content-start">1</span>
                                                    <span class="justify-content-end">kN</span>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <div class="row px-5">
                                        <div class="col-lg-3 p-0 py-1">
                                            <label for="exampleFormControlInput1" style="height: 36px; width: 200px;"
                                                class="form-label mb-0 d-flex input-label px-3 py-2">Utilisation</label>
                                        </div>
                                        <div class="col-lg-8 py-1">
                                            <div class="form-check ">
                                                <div class="form-label mb-0 input-label d-flex justify-content-between px-3"
                                                    style="background-color: #F5F5F5;height: 36px; width: 398px; padding-top: 8px;">
                                                    <span class="justify-content-start">0.26</span>
                                                    <!-- <span class="justify-content-end">kN</span> -->
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </template>
                </sub-panel>
                <sub-panel label="View" :key="reRender">
                    <template v-slot:body>
                        <shape-loading :loadingDto="loadingDto" :restraintDto="restraintDto"></shape-loading>
                    </template>
                </sub-panel>
                <sub-panel label="Bottom Flange Verification">
                    <template v-slot:body>
                        <span class="fs-16 fw-600 px-3" style="color: #125CCB;">Maximum Utilization is 1.67</span>
                        <div class="row px-4 py-3">
                            <table class="table table-bordered text-center">
                                <thead>
                                    <tr class="fs-14 fw-500"
                                        style="background-color:#F6F6F6;height: 48px; color: #5C5C5C;vertical-align: middle;">
                                        <td style="width: 18%;">From(M)</td>
                                        <td style="width: 18%;">To(M)</td>
                                        <td style="width: 18%;">Design force (kN)</td>
                                        <td style="width: 18%;">Resistance (kN)</td>
                                        <td style="width: 18%;">Utilization</td>
                                        <td style="width: 10%;">Detail</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr class="fs-14 fw-500 py-0"
                                        style="height: 48px;color: #5C5C5C;vertical-align: middle;">
                                        <td>0</td>
                                        <td>15</td>
                                        <td>136</td>
                                        <td>82</td>
                                        <td>1.67</td>
                                        <td>
                                            <img :src="infocircle" alt="">
                                        </td>
                                    </tr>
                                    <tr class="fs-14 fw-500 py-0"
                                        style="height: 48px;color: #5C5C5C;vertical-align: middle;">
                                        <td>15</td>
                                        <td>20</td>
                                        <td>136</td>
                                        <td>525</td>
                                        <td>0.26</td>
                                        <td>
                                            <img :src="infocircle" alt="">
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="row px-4 py-3">
                            <div class="col-5 position-relative">
                                <div class="row border-left-green">
                                    <div class="row px-5">
                                        <div class="col-lg-3 p-0 py-1">
                                            <label for="exampleFormControlInput1" style="height: 36px; width: 200px;"
                                                class="form-label mb-0 d-flex input-label px-3 py-2">Segment from</label>
                                        </div>
                                        <div class="col-lg-8 py-1">
                                            <div class="form-check d-flex justify-content-between">
                                                <div class="col-5 form-label mb-0 input-label d-flex justify-content-between px-3"
                                                    style="background-color: #F5F5F5;height: 36px; width: 180px; padding-top: 8px;">
                                                    <span class="justify-content-start">15</span>
                                                    <span class="justify-content-end">mm</span>
                                                </div>
                                                <div
                                                    class="form-label mb-0 input-label d-flex justify-content-between px-3 py-2">
                                                    to</div>
                                                <div class="col-5 form-label mb-0 input-label d-flex justify-content-between px-3"
                                                    style="background-color: #F5F5F5;height: 36px; width: 180px; padding-top: 8px;">
                                                    <span class="justify-content-start">20</span>
                                                    <span class="justify-content-end">mm</span>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <div class="row px-5">
                                        <div class="col-lg-3 p-0 py-1">
                                            <label for="exampleFormControlInput1" style="height: 36px; width: 200px;"
                                                class="form-label mb-0 d-flex input-label px-3 py-2">Force due to
                                                moment</label>
                                        </div>
                                        <div class="col-lg-8 py-1">
                                            <div class="form-check ">
                                                <div class="form-label mb-0 input-label d-flex justify-content-between px-3"
                                                    style="background-color: #F5F5F5;height: 36px; width: 398px; padding-top: 8px;">
                                                    <span class="justify-content-start">135</span>
                                                    <span class="justify-content-end">kN</span>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <div class="row px-5">
                                        <div class="col-lg-3 p-0 py-1">
                                            <label for="exampleFormControlInput1" style="height: 36px; width: 200px;"
                                                class="form-label mb-0 d-flex input-label px-3 py-2">Effective Area</label>
                                        </div>
                                        <div class="col-lg-8 py-1">
                                            <div class="form-check ">
                                                <div class="form-label mb-0 input-label d-flex justify-content-between px-3"
                                                    style="background-color: #F5F5F5;height: 36px; width: 398px; padding-top: 8px;">
                                                    <span class="justify-content-start">135</span>
                                                    <span class="justify-content-end">kN</span>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <div class="row px-5">
                                        <div class="col-lg-3 p-0 py-1">
                                            <label for="exampleFormControlInput1" style="height: 36px; width: 200px;"
                                                class="form-label mb-0 d-flex input-label px-3 py-2">Correction factor
                                                kc</label>
                                        </div>
                                        <div class="col-lg-8 py-1">
                                            <div class="form-check ">
                                                <div class="form-label mb-0 input-label d-flex justify-content-between px-3"
                                                    style="background-color: #F5F5F5;height: 36px; width: 398px; padding-top: 8px;">
                                                    <span class="justify-content-start">0.77</span>
                                                    <!-- <span class="justify-content-end">kN</span> -->
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <div class="row px-5">
                                        <div class="col-lg-3 p-0 py-1">
                                            <label for="exampleFormControlInput1" style="height: 36px; width: 200px;"
                                                class="form-label mb-0 d-flex input-label px-3 py-2">Total</label>
                                        </div>
                                        <div class="col-lg-8 py-1">
                                            <div class="form-check ">
                                                <div class="form-label mb-0 input-label d-flex justify-content-between px-3"
                                                    style="background-color: #F5F5F5;height: 36px; width: 398px; padding-top: 8px;">
                                                    <span class="justify-content-start">136</span>
                                                    <span class="justify-content-end">kN</span>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-5 position-relative">
                                <div class="row border-left-green">
                                    <div class="row px-5">
                                        <div class="col-lg-3 p-0 py-1">
                                            <label for="exampleFormControlInput1" style="height: 36px; width: 200px;"
                                                class="form-label mb-0 d-flex input-label px-3 py-2">Segment length</label>
                                        </div>
                                        <div class="col-lg-8 py-1">
                                            <div class="form-check ">
                                                <div class="form-label mb-0 input-label d-flex justify-content-between px-3"
                                                    style="background-color: #F5F5F5;height: 36px; width: 398px; padding-top: 8px;">
                                                    <span class="justify-content-start">5000</span>
                                                    <span class="justify-content-end">mm</span>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <div class="row px-5">
                                        <div class="col-lg-3 p-0 py-1">
                                            <label for="exampleFormControlInput1" style="height: 36px; width: 200px;"
                                                class="form-label mb-0 d-flex input-label px-3 py-2">Slenderness</label>
                                        </div>
                                        <div class="col-lg-8 py-1">
                                            <div class="form-check ">
                                                <div class="form-label mb-0 input-label d-flex justify-content-between px-3"
                                                    style="background-color: #F5F5F5;height: 36px; width: 398px; padding-top: 8px;">
                                                    <span class="justify-content-start">0.847</span>
                                                    <!-- <span class="justify-content-end">kN</span> -->
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <div class="row px-5">
                                        <div class="col-lg-3 p-0 py-1">
                                            <label for="exampleFormControlInput1" style="height: 36px; width: 200px;"
                                                class="form-label mb-0 d-flex input-label px-3 py-2">Resistance</label>
                                        </div>
                                        <div class="col-lg-8 py-1">
                                            <div class="form-check ">
                                                <div class="form-label mb-0 input-label d-flex justify-content-between px-3"
                                                    style="background-color: #F5F5F5;height: 36px; width: 398px; padding-top: 8px;">
                                                    <span class="justify-content-start">525</span>
                                                    <span class="justify-content-end">kN</span>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <div class="row px-5">
                                        <div class="col-lg-3 p-0 py-1">
                                            <label for="exampleFormControlInput1" style="height: 36px; width: 200px;"
                                                class="form-label mb-0 d-flex input-label px-3 py-2">Force from
                                                axial</label>
                                        </div>
                                        <div class="col-lg-8 py-1">
                                            <div class="form-check ">
                                                <div class="form-label mb-0 input-label d-flex justify-content-between px-3"
                                                    style="background-color: #F5F5F5;height: 36px; width: 398px; padding-top: 8px;">
                                                    <span class="justify-content-start">1</span>
                                                    <span class="justify-content-end">kN</span>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <div class="row px-5">
                                        <div class="col-lg-3 p-0 py-1">
                                            <label for="exampleFormControlInput1" style="height: 36px; width: 200px;"
                                                class="form-label mb-0 d-flex input-label px-3 py-2">Utilisation</label>
                                        </div>
                                        <div class="col-lg-8 py-1">
                                            <div class="form-check ">
                                                <div class="form-label mb-0 input-label d-flex justify-content-between px-3"
                                                    style="background-color: #F5F5F5;height: 36px; width: 398px; padding-top: 8px;">
                                                    <span class="justify-content-start">0.26</span>
                                                    <!-- <span class="justify-content-end">kN</span> -->
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </template>
                </sub-panel>
                <sub-panel label="View" :key="reRender">
                    <template v-slot:body>
                        <shape-loading :loadingDto="loadingDto" :restraintDto="restraintDto"></shape-loading>
                    </template>
                </sub-panel>
                <sub-panel label="Web verification">
                    <template v-slot:body>
                        <div class="row py-2">
                            <div class="form-check d-flex justify-content-start mx-4">

                                <label class="form-check-label input-label fw-500 fs-16" for="include">
                                    Include local buckling?
                                </label>
                                <input class="form-check-input fw-500 fs-16" style="margin-left : 0" type="checkbox"
                                    value="" id="include">
                            </div>
                        </div>
                        <div class="row">
                            <div class="form-check d-flex justify-content-start mx-4 my-3">
                                <span class="fs-16 fw-600" style="color: #125CCB;">{{ chartCaption }}</span>
                            </div>
                        </div>

                        <div v-if="showChart">
                            <line-chart :chartData="chartData" :labels="chartLabel"
                                        yAxisText="Bending Moment (kNm)" :inversed="true" />
                            
                            <!-- <img class="px-5" style="width: 100%;" :src="includeheader" alt="">
                            <img class="px-5" style="width: 100%;" :src="includebody" alt=""> -->
                        </div>


                    </template>
                </sub-panel>
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
/* .border-left-green{

   
} */

.border-left-green::before {
    content: '';
    border-left: 4px solid #69C179;
    position: absolute;
    height: 90%;
    left: 0;
    top: 5%;
}
</style>