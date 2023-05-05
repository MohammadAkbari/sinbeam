<script setup lang="ts">
import type ApiServise from '@/core/services/api.service';
import { ChartType } from '@/enums/chartType';
import type Link from '@/models/link';
import type LoadParameters from '@/models/loadParameters';
import type LoadingDto from '@/models/loadingDto';
import type UltimatePointLoadDto from '@/models/ultimatePointLoadDto';
import checkBox from '@/shared/components/checkBox.vue';
import shape from '@/shared/components/shape.vue';
import constants from '@/shared/globals/constants';
import { inject, ref } from 'vue';
import type CharacteristicPointLoadDto from '@/models/characteristicPointLoadDto';
import type Point from '@/models/point';
import inputNumber from '@/shared/components/inputNumber.vue';;
import type RestraintDto from '@/models/restraintDto';


export interface Props {
    links: Link[]
}

const props = withDefaults(defineProps<Props>(), {});
const emit = defineEmits(['nextStep', 'saveLinks']);

const apiServise = inject('apiServise') as ApiServise;

const reRenderShape = ref(0 as number);

const loadingDto = ref({ permanentLoads: {}, variableLoads: {}, ultimateLoads: {} } as LoadingDto);
const restraintDto = ref({} as RestraintDto);

const topFlange = ref(undefined as number);
const bottomFlange = ref(undefined as number);

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


const addTopFlange = () => {

    if (topFlange.value > loadingDto.value.span || topFlange.value < 0 || topFlange.value == undefined) {
        console.log('خارج ز محدوده')
        return;
    }

    if (loadingDto.value.topFlangeRestraints.every(e => e != topFlange.value))
        loadingDto.value.topFlangeRestraints.push(topFlange.value);
    topFlange.value = undefined;
}
const removeTopFlange = (index: number) => {
    loadingDto.value.topFlangeRestraints.splice(index, 1);
}

const addBottomFlange = () => {
    if (bottomFlange.value > loadingDto.value.span || bottomFlange.value < 0 || bottomFlange.value == undefined) {
        console.log('خارج ز محدوده')
        return;
    }

    if (loadingDto.value.bottomFlangeRestraints.every(e => e != bottomFlange.value))
        loadingDto.value.bottomFlangeRestraints.push(bottomFlange.value);
    bottomFlange.value = undefined;
}
const removeBottomFlange = (index: number) => {
    loadingDto.value.bottomFlangeRestraints.splice(index, 1);
}



const saveModel = (isNextStep = false) => {

    restraintDto.value.fullRestraintBottomFlange = loadingDto.value.fullRestraintBottomFlange;    
    restraintDto.value.topFlangeRestraints = loadingDto.value.topFlangeRestraints;

    restraintDto.value.fullRestraintTopFlange = loadingDto.value.fullRestraintTopFlange;
    restraintDto.value.bottomFlangeRestraints = loadingDto.value.bottomFlangeRestraints;

    apiServise.callApi(props.links, constants.restraints.saveRestraint, restraintDto.value).then((data) => {
        if (isNextStep) {
            emit('nextStep');
        }
    });
}


</script>















<template>
    <div class="col col-6">
        <div class="row">
            <div class="col col-6">
                <h3>To Top Flange</h3>
                <div class="row" style="margin: 3px;">
                    <check-box v-model="loadingDto.fullRestraintTopFlange" :labelWidth="8"
                        label="full Restraint Top Flange" />
                </div>
                <template v-if="!loadingDto.fullRestraintTopFlange">
                    <div class="row">
                        <div class="col col-md-10">
                            <input-number v-model="topFlange" :labelWidth="0" />
                        </div>
                        <div class="col col-md-2">
                            <span @click="addTopFlange()" style="color: green;" class="fa fa-plus-circle fa-2x"></span>
                        </div>
                    </div>
                    <hr>
                    <div style="height: 350px; overflow-y: scroll;">
                        <div class="row" v-for="(item, index) in loadingDto.topFlangeRestraints" :key="index"
                            style="border: solid 1px; border-radius: 25px; margin: 5px;">
                            <div class="col col-md-10" style="text-align: center;">
                                <span>{{ item }}</span>
                            </div>
                            <div class="col col-md-2">
                                <span @click="removeTopFlange(index)" style="color: red;"
                                    class="fa fa-minus-circle fa-2x"></span>
                            </div>
                        </div>
                    </div>
                </template>
            </div>
            <div class="col col-6">
                <h3>To Botto Flange</h3>
                <div class="row" style="margin: 3px;">
                    <check-box v-model="loadingDto.fullRestraintBottomFlange" :labelWidth="8"
                        label="full Restraint Bottom Flange" />
                </div>
                <template v-if="!loadingDto.fullRestraintBottomFlange">
                    <div class="row">
                        <div class="col col-md-10">
                            <input-number v-model="bottomFlange" :labelWidth="0" />
                        </div>
                        <div class="col col-md-2">
                            <span @click="addBottomFlange()" style="color: green;" class="fa fa-plus-circle fa-2x"></span>
                        </div>
                    </div>
                    <hr>
                    <div style="height: 350px; overflow-y: scroll;">
                        <div class="row" v-for="(item, index) in loadingDto.bottomFlangeRestraints" :key="index"
                            style="border: solid 1px; border-radius: 25px; margin: 5px;">
                            <div class="col col-md-10" style="text-align: center;">
                                <span>{{ item }}</span>
                            </div>
                            <div class="col col-md-2">
                                <span @click="removeBottomFlange(index)" style="color: red;"
                                    class="fa fa-minus-circle fa-2x"></span>
                            </div>
                        </div>
                    </div>

                </template>




            </div>
        </div>
    </div>

    <br>
    <div class="row">
        <shape :loadingDto="loadingDto" :reRenderShape="reRenderShape" />
    </div>
    <div class="row" style="justify-content: end; margin-top: 70px;width: 100%;">
        <button class="btn btn-primary col col-md-2 mx-2" @click="saveModel()">save</button>
        <button class="btn btn-success col col-md-2 mx-2" @click="saveModel(true)">save and next</button>
    </div></template>
