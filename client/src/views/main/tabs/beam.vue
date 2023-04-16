<script setup lang="ts">
import type Link from '@/models/link';
import type ApiServise from '@/core/services/api.service';
import type Beam from '@/models/beam';
import type Drawing from '@/models/drawing';
import type Shape from '@/models/shape';
import { inject, reactive, ref, watch } from 'vue';
import constants from '@/shared/globals/constants';
import type BeamDto from '@/models/beamDto';
import panel from '@/shared/components/panel.vue';
import inputNumber from '@/shared/components/inputNumber.vue';
import checkBox from '@/shared/components/checkBox.vue';
import singleSelect from '@/shared/components/singleSelect.vue';
import radioGroupButton from '@/shared/components/radioGroupButton.vue';
import type ListItem from '@/models/listItem';



export interface Props {
    links: Link[]
}

const props = withDefaults(defineProps<Props>(), {});
const emit = defineEmits(['nextStep', 'saveLinks']);

const apiServise = inject('apiServise') as ApiServise;

// let beam = reactive({} as Beam)
let beamDto = ref({} as BeamDto)

const drawing = ref([] as Drawing[])




let webThicknessCollection = ref([] as ListItem[]);
let flangeWidthCollection = ref([] as ListItem[]);
let flangeThicknessCollection = ref([] as ListItem[]);

let unwatch = null;

apiServise.callApi(props.links, constants.beam.getBeam).then((data: Beam) => {

    unwatch = watch(() => beamDto, () => refreshSectionDrawing(), { deep: true, immediate: true });


    webThicknessCollection.value = data.webThicknessCollection.map(e => ({ id: e, title: e.toString() } as ListItem));
    flangeWidthCollection.value = data.flangeWidthCollection.map(e => ({ id: e, title: e.toString() } as ListItem));
    flangeThicknessCollection.value = data.flangeThicknessCollection.map(e => ({ id: e, title: e.toString() } as ListItem));

    beamDto.value = data.beam;

    emit('saveLinks', data.beam._links)

})




const listRadioBotton = [
    {
        id: 1,
        title: 'S 275'
    } as ListItem,
    {
        id: 2,
        title: 'S 355'
    } as ListItem
]

const topFlange = ref('' as string);
const webFlange = ref('' as string);
const bottomFlange = ref('' as string);

const refreshSectionDrawing = () => {
    apiServise.callApi(props.links, constants.beam.drawing, beamDto.value).then((data: Shape) => {

        topFlange.value = `margin:0 auto;border:solid #000; width : ${data.topFlange.width}px; height :${data.topFlange.height}px;border-width :${data.topFlange.borderWidth}`
        webFlange.value = `margin:0 auto;border:solid #000; width : ${data.web.width}px; height :${data.web.height}px;border-width :${data.web.borderWidth}`
        bottomFlange.value = `margin:0 auto;border:solid #000; width : ${data.bottomFlange.width}px; height :${data.bottomFlange.height}px;border-width :${data.bottomFlange.borderWidth}`
    });
}

const saveModel = (isNextStep = false) => {
    apiServise.callApi(props.links, constants.beam.saveBeam, beamDto).then((data) => {
        if (isNextStep) {
            unwatch();
            emit('nextStep');
        }
    });
}


</script>


<template>
    <div class="row">
        <div class="col col-md-9">
            <panel label="Web" style="margin-bottom: 10px;">
                <template v-slot:body>
                    <div class="row">
                        <div class="col col-md-6">
                            <input-number label="Span (m)" v-model="beamDto.span" :labelWidth="7" />
                        </div>
                        <div class="col col-md-6">
                            <check-box label="Uniform depth" v-model="beamDto.isUniformDepth" name="isUniformDepth" />
                        </div>
                    </div>
                    <div class="row">
                        <div class="col col-md-6">
                            <input-number v-if="beamDto.isUniformDepth" label="Web depth (mm)" :labelWidth="7"
                                v-model="beamDto.webDepthLeft" />
                            <input-number v-else label="Web depth, left (mm)" :labelWidth="7"
                                v-model="beamDto.webDepthLeft" />
                        </div>
                        <div class="col col-md-6" v-if="!beamDto.isUniformDepth">
                            <input-number label="Web depth, right (mm)" v-model="beamDto.webDepthRight" :labelWidth="7" />
                        </div>
                    </div>

                    <div class="row">
                        <div class="col col-md-6">
                            <single-select :items="webThicknessCollection" v-model="beamDto.webThickness"
                                label="Web thickness" :labelWidth="7" />

                        </div>
                        <div class="col col-md-6">
                            <fieldset class="border rounded-3 px-3">
                                <legend class="float-none w-auto px-3" style="line-height: 0px; font-size: 16px;">
                                    Web Steel
                                </legend>
                                <radio-group-button name="center" :items="listRadioBotton" :isInline="true" />
                            </fieldset>
                        </div>
                    </div>
                </template>
            </panel>
            <panel label="Top Flange"  style="margin-bottom: 10px;">
                <template v-slot:body>
                    <div class="row">
                        <div class="col col-md-6">
                            <single-select :items="flangeThicknessCollection" v-model="beamDto.topFlangeThickness"
                                label="Top flange thickness" :labelWidth="7" />
                            <single-select :items="flangeWidthCollection" v-model="beamDto.topFlangeWidth"
                                label="Top flange width" :labelWidth="7" />
                        </div>
                        <div class="col col-md-6">
                            <fieldset class="border rounded-3 p-3">
                                <legend class="float-none w-auto px-3" style="line-height: 0px; font-size: 16px;">
                                    Top flange
                                </legend>
                                <radio-group-button name="top" :items="listRadioBotton" :isInline="true" />
                            </fieldset>
                        </div>
                    </div>
                </template>
            </panel>
            <panel label="Bottom Flange"  style="margin-bottom: 10px;">
                <template v-slot:body>
                    <div class="row">
                        <div class="col col-md-6">
                            <single-select :items="flangeThicknessCollection" v-model="beamDto.bottomFlangeThickness"
                                label="Bottom flange thickness" :labelWidth="7" />
                            <single-select :items="flangeWidthCollection" v-model="beamDto.bottomFlangeWidth"
                                label="Bottom flange width" :labelWidth="7" />
                        </div>
                        <div class="col col-md-6">
                            <fieldset class="border rounded-3 p-3">
                                <legend class="float-none w-auto px-3" style="line-height: 0px; font-size: 16px;">
                                    Bottom flange
                                </legend>
                                <radio-group-button name="bottom" :items="listRadioBotton" :isInline="true" />
                            </fieldset>
                        </div>
                    </div>
                </template>
            </panel>
        </div>
        <div class="col col-md-3">
            <div style="box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;border-radius: 15px;padding: 15px;">
                <div :style="topFlange"></div>
                <div :style="webFlange"></div>
                <div :style="bottomFlange"></div>
            </div>
        </div>
    </div>

    <div class="row" style="position: absolute;bottom: 70px;right: 75px; justify-content: end; display: flex;width: 100%;">
        <button class="btn btn-primary col col-md-2 mx-2" @click="saveModel()">save</button>
        <button class="btn btn-success col col-md-2 mx-2" @click="saveModel(true)">save and next</button>
    </div>
</template>