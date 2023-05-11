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
import type FlangeVerification from '@/models/flangeVerification';


export interface Props {
    links: Link[]
}

const props = withDefaults(defineProps<Props>(), {});
const emit = defineEmits(['nextStep', 'saveLinks']);

const apiServise = inject('apiServise') as ApiServise;

const reRenderShape = ref(0 as number);

const loadingDto = ref({ permanentLoads: {}, variableLoads: {}, ultimateLoads: {} } as LoadingDto);
const restraintDto = ref({} as RestraintDto);


const selectedRow = ref(-1 as number);

const flangeVerificationCaptions = ref({} as FlangeVerification);
const captions = ref([] as Array<string>);



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

apiServise.callApi(props.links, constants.bottomFlangeVerification.getBottomFlangeVerification).then((data: FlangeVerification) => {

    flangeVerificationCaptions.value.captions = data.captions;
    flangeVerificationCaptions.value.maximumUtilization = data.maximumUtilization;
    flangeVerificationCaptions.value.verificationItems = data.verificationItems;

    captions.value = data.captions;

});


const changeCaptions = (index:number)=>{
    selectedRow.value = index;
    captions.value = flangeVerificationCaptions.value.verificationItems[index].captions
}

const nextStep = () => {
    emit('nextStep');
}


</script>















<template>
    <div class="col col-8">
        <div class="row">
            <div class="col col-6 offset-3">
                <span style="color: green;">
                    Maximum Utilization is {{ flangeVerificationCaptions.maximumUtilization }}
                </span>
            </div>
        </div>
        <hr>

        <div class="row" style=" margin: 0 20px;">
            <div class="col col-md-12" style="max-height: 200px;  border-bottom: solid 2px rgb(126, 126, 126);text-align: center;">
                <div class="row" style="font-weight: bold; background-color: #d1d1d1;">
                    <div class="col col-md-2">from (M)</div>
                    <div class="col col-md-2">to (M)</div>
                    <div class="col col-md-3">design force (kN)</div>
                    <div class="col col-md-2">resistance (kN)</div>
                    <div class="col col-md-2">utilization</div>
                    <div class="col col-md-1">detail</div>
                </div>
                <div :class="`row ${selectedRow == index ? 'selected' : ''}`" style="cursor: pointer; border-top: solid 1px rgb(126, 126, 126);"
                  
                    v-for="(item, index) in flangeVerificationCaptions.verificationItems" :key="index" @click="changeCaptions(index)">
                    <div class="col col-md-2">{{ item.from }}</div>
                    <div class="col col-md-2">{{ item.to }}</div>
                    <div class="col col-md-3">{{ item.designForce }}</div>
                    <div class="col col-md-2">{{ item.resistance }}</div>
                    <div class="col col-md-2">{{ item.utilization }}</div>
                    <div class="col col-md-1"><i class="fa fa-info-circle" aria-hidden="true"></i></div>
                </div>
            </div>
        </div>
        <hr>
        <div class="row" style=" margin: 0 20px;"> 
            <div class="col col-6" v-for="(item, index) in captions" :key="index">{{ item }}</div>
        </div>
    </div>

    <br>
    <div class="row">
        <shape :loadingDto="loadingDto" :reRenderShape="reRenderShape" />
    </div>
    <div class="row" style="justify-content: end; margin-top: 70px;width: 100%;">
        <button class="btn btn-success col col-md-2 mx-2" @click="nextStep()">next</button>
    </div>
</template>
<style scoped>
.selected {
    background-color: #ffe0e0;
}</style>
