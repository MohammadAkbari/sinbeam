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
import { inject, onMounted, ref, watch } from 'vue';
import type CharacteristicPointLoadDto from '@/models/characteristicPointLoadDto';
import type Point from '@/models/point';
import singleSelect from '@/shared/components/singleSelect.vue';
import type RestraintDto from '@/models/restraintDto';
import type FlangeVerification from '@/models/flangeVerification';
import type Beam from '@/models/beam';
import type ListItem from '@/models/listItem';
import type { array } from '@amcharts/amcharts5';
import type ConfirmFlange from '@/models/confirmFlange';


export interface Props {
    links: Link[]
}

const props = withDefaults(defineProps<Props>(), {});
const emit = defineEmits(['nextStep', 'saveLinks']);

const apiServise = inject('apiServise') as ApiServise;

const reRenderShape = ref(0 as number);

const loadingDto = ref({ permanentLoads: {}, variableLoads: {}, ultimateLoads: {} } as LoadingDto);

const webDesignCaption = ref('' as string);
const topFlangeDesignCaption = ref('' as string);
const bottomFlangeDesignCaption = ref('' as string);
const flangeWidthCollection = ref([] as ListItem[]);

const bottomConfirmFlange = ref({fixedFlange:false} as ConfirmFlange);
const topConfirmFlange = ref({fixedFlange:false} as ConfirmFlange);

const btnStatus = ref ([false,false,false] as Array<boolean>);


onMounted(() => {
    watch(() => bottomConfirmFlange, () => {
        btnStatus.value[1]=false;
        btnStatus.value[2]=false;
    }, { deep: true, immediate: true });

    watch(() => topConfirmFlange, () => {
        btnStatus.value[2]=false;
    }, { deep: true, immediate: true })
  
})


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
});
apiServise.callApi(props.links, constants.restraints.getRestraint).then((data: RestraintDto) => {
    loadingDto.value.fullRestraintTopFlange = data.fullRestraintTopFlange;
    loadingDto.value.topFlangeRestraints = data.topFlangeRestraints ?? [];

    loadingDto.value.fullRestraintBottomFlange = data.fullRestraintBottomFlange;
    loadingDto.value.bottomFlangeRestraints = data.bottomFlangeRestraints ?? [];

    reRenderShape.value++;
});

apiServise.callApi(props.links, constants.beam.getBeam).then((data: Beam) => {
    flangeWidthCollection.value = data.flangeWidthCollection.map(e => ({ id: e, title: e.toString() } as ListItem));
})



apiServise.callApi(props.links, constants.webDesign.getWebDesign).then(({ ...data }) => {
    webDesignCaption.value = data.caption
});


const acceptWebDesign = async () => {
    var res = await apiServise.callApi(props.links, constants.webDesign.confirmWebDesign);
    apiServise.callApi(props.links, constants.webDesign.getBottomFlangeDesign).then(({ ...data }) => {
        bottomFlangeDesignCaption.value = data.caption;
        btnStatus.value[0] = true;
    })
}


//#region bottom

const changeBottomFlangeWidth = () => {
    const model = {
        width: bottomConfirmFlange.value.width
    };
    apiServise.callApi(props.links, constants.webDesign.getBottomFlangeDesign, model).then((data) => {
        bottomFlangeDesignCaption.value = data.caption;       
    });

}

const acceptBottomFlangeDesign = async () => {


    var res = await apiServise.callApi(props.links, constants.webDesign.confirmBottomFlangeDesign,bottomConfirmFlange.value);
    apiServise.callApi(props.links, constants.webDesign.getTopFlangeDesign).then((data) => {
        topFlangeDesignCaption.value = data.caption; 
        btnStatus.value[1] = true;      
    })
}




//#region top

const changeTopFlangeWidth = () => {
    const model = {
        width: topConfirmFlange.value.width
    };
    apiServise.callApi(props.links, constants.webDesign.getTopFlangeDesign, model).then((data) => {
        topFlangeDesignCaption.value = data.caption;        
    });

}

const acceptTopFlangeDesign = async () => {
    var res = await apiServise.callApi(props.links, constants.webDesign.confirmTopFlangeDesign,topConfirmFlange.value);
    apiServise.callApi(props.links, constants.webDesign.getTopFlangeDesign).then(({ ...data }) => {
        topFlangeDesignCaption.value = data.caption;
        btnStatus.value[2] = true;     
    })
}


//#endregion

const nextStep = () => {
    emit('nextStep');
}
</script>

<template>
     <div class="col col-8">
        
     </div>
    <ul style="list-style-type: decimal;">
        <li>
            <div class="row">
            <div class="row">
                <div class="col col-6">
                    <span style="color: green;">
                        {{ webDesignCaption }}
                    </span>
                </div>
                <div class="divBtn col col-6">
                    <button :class="`confirmBtn btn ${btnStatus[0] ? 'btn-success' : 'btn-info'}`" @click="acceptWebDesign">
                        {{btnStatus[0] ? 'confirmed' :'confirm'}}
                    </button>
                </div>
            </div>
        </div>
          
        </li>
        <li>
            <div class="row">
                <div class="row">
                    <div class="col col-3">
                        <check-box :disabled="!btnStatus[0]" label="Fixed bottom flange width" v-model="bottomConfirmFlange.fixedFlange" name="FixedBottom"
                            :labelWidth="10" />
                    </div>
                    <div class="col col-2">
                        <single-select :disabled="!(bottomConfirmFlange.fixedFlange && btnStatus[0])" :items="flangeWidthCollection"
                            @changed="changeBottomFlangeWidth" v-model="bottomConfirmFlange.width" :labelWidth="0" />
                    </div>
                </div>
                <div class="row">
                    <div class="col col-6">
                        <span style="color: green;">
                            {{ bottomFlangeDesignCaption }}
                        </span>
                    </div>
                    <div class="divBtn col col-6">
                        <button :disabled="!btnStatus[0]" :class="`confirmBtn btn ${btnStatus[1] ? 'btn-success' : 'btn-info'}`" @click="acceptBottomFlangeDesign">
                            {{btnStatus[1] ? 'confirmed' :'confirm'}}
                        </button>
                    </div>
                </div>
            </div>          
        </li>
        <li>
            <div class="row">
                <div class="row">
                    <div class="col col-3">
                        <check-box :disabled="!(btnStatus[0] && btnStatus[1])" label="Fixed top flange width" v-model="topConfirmFlange.fixedFlange" name="topBottom"
                            :labelWidth="10" />
                    </div>
                    <div class="col col-2">
                        <single-select :disabled="!(topConfirmFlange.fixedFlange && btnStatus[0] && btnStatus[1])" :items="flangeWidthCollection"
                            @changed="changeTopFlangeWidth" v-model="topConfirmFlange.width" :labelWidth="0" />
                    </div>
                </div>
                <div class="row">
                    <div class="col col-6">
                        <span style="color: green;">
                            {{ topFlangeDesignCaption }}
                        </span>
                    </div>
                    <div class="divBtn col col-6">
                        <button  :disabled="!(btnStatus[0] && btnStatus[1])" :class="`confirmBtn btn ${btnStatus[2] ? 'btn-success' : 'btn-info'}`" @click="acceptTopFlangeDesign">
                            {{btnStatus[2] ? 'confirmed' :'confirm'}}
                        </button>
                    </div>
                </div>
            </div>
        </li>
    </ul>  
    <br />
    <div class="row">
        <shape :loadingDto="loadingDto" :reRenderShape="reRenderShape" />
    </div>
    <div class="row" style="justify-content: end; margin-top: 70px;width: 100%;">
        <button class="btn btn-success col col-md-2 mx-2" @click="nextStep()" :disabled="!btnStatus.every(e=>e)">next</button>
    </div>
</template>
<style scoped>
.selected {
    background-color: #ffe0e0;
}

li {
    border: solid 1px black;
    margin: 3px;
    border-radius: 10px;
    padding: 6px;
    background-color: aliceblue;
}

.divBtn{
    flex-direction: row-reverse;
    display: flex;
}
.confirmBtn{
    justify-content: flex-end;
    display: flex;
}
</style>
