<script setup lang="ts">
import type Link from '@/models/link';
import type ApiServise from '@/core/services/api.service';

import { computed, inject, reactive, ref, watch } from 'vue';
import constants from '@/shared/globals/constants';
import type BeamDto from '@/models/beamDto';
import type ListItem from '@/models/listItem';
import type LoadingDto from '@/models/loadingDto';

import shape from '@/shared/components/shape.vue';
import inputNumber from '@/shared/components/inputNumber.vue';
import checkBox from '@/shared/components/checkBox.vue';
import singleSelect from '@/shared/components/singleSelect.vue';
import radioGroupButton from '@/shared/components/radioGroupButton.vue';
import { LoadType } from '@/enums/loadType';
import helper from '@/shared/common/helper';
import type CharacteristicPointLoadDto from '@/models/characteristicPointLoadDto';
import type UltimatePointLoadDto from '@/models/ultimatePointLoadDto';
import type LoadParameters from '@/models/loadParameters';
import type RestraintDto from '@/models/restraintDto';

export interface Props {
    links: Link[]
}

const props = withDefaults(defineProps<Props>(), {});
const emit = defineEmits(['nextStep', 'saveLinks']);

const apiServise = inject('apiServise') as ApiServise;

const loadingDto = ref({ permanentLoads: {}, variableLoads: {}, ultimateLoads: {} } as LoadingDto);


const loadType = helper.convertEnumToListItem(LoadType)

const loadTypeCharacteristicLoads = LoadType.CharacteristicLoads;

const reRenderShape = ref(0 as number);


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

apiServise.callApi(props.links, constants.restraints.getRestraint).then((data: RestraintDto) => {
    loadingDto.value.fullRestraintTopFlange = data.fullRestraintTopFlange;
    loadingDto.value.topFlangeRestraints = data.topFlangeRestraints ?? [];

    loadingDto.value.fullRestraintBottomFlange = data.fullRestraintBottomFlange;
    loadingDto.value.bottomFlangeRestraints = data.bottomFlangeRestraints ?? [];
   
    

    reRenderShape.value++;
});


const addCharacteristicPointLoads = () => {

    if (!loadingDto.value.characteristicPointLoads)
        loadingDto.value.characteristicPointLoads = [] as CharacteristicPointLoadDto[];

    loadingDto.value.characteristicPointLoads.push({} as CharacteristicPointLoadDto)
};

const removeCharacteristicPointLoads = (index) => loadingDto.value.characteristicPointLoads.splice(index, 1);

const addUltimatePointLoads = () => {

    if (!loadingDto.value.ultimatePointLoads)
        loadingDto.value.ultimatePointLoads = [] as UltimatePointLoadDto[];

    loadingDto.value.ultimatePointLoads.push({} as UltimatePointLoadDto);

};

const removeUltimatePointLoads = (index) => loadingDto.value.ultimatePointLoads.splice(index, 1)

const leftWidth = ref(0 as number);
const centerWidth = ref(0 as number);

const updateShape = () => {

    if (loadingDto.value.loadType == loadTypeCharacteristicLoads) {
        if (loadingDto.value.permanentLoads.partialUdl
            && loadingDto.value.permanentLoads.partialUdlStart >= 0
            && loadingDto.value.permanentLoads.partialUdlStart <= loadingDto.value.span
            && loadingDto.value.permanentLoads.partialUdlEnd >= 0
            && loadingDto.value.permanentLoads.partialUdlEnd <= loadingDto.value.span
            && loadingDto.value.permanentLoads.partialUdlStart < loadingDto.value.permanentLoads.partialUdlEnd) {


            leftWidth.value = loadingDto.value.permanentLoads.partialUdlStart * 100 / loadingDto.value.span;
            centerWidth.value = (loadingDto.value.permanentLoads.partialUdlEnd - loadingDto.value.permanentLoads.partialUdlStart) * 100 / loadingDto.value.span;
        } else {
            leftWidth.value = 0
            centerWidth.value = 0
        }
    } else {
        if (loadingDto.value.ultimateLoads.partialUdl
            && loadingDto.value.ultimateLoads.partialUdlStart >= 0
            && loadingDto.value.ultimateLoads.partialUdlStart <= loadingDto.value.span
            && loadingDto.value.ultimateLoads.partialUdlEnd >= 0
            && loadingDto.value.ultimateLoads.partialUdlEnd <= loadingDto.value.span
            && loadingDto.value.ultimateLoads.partialUdlStart < loadingDto.value.ultimateLoads.partialUdlEnd) {

            leftWidth.value = loadingDto.value.ultimateLoads.partialUdlStart * 100 / loadingDto.value.span;
            centerWidth.value = (loadingDto.value.ultimateLoads.partialUdlEnd - loadingDto.value.ultimateLoads.partialUdlStart) * 100 / loadingDto.value.span;
        } else {
            leftWidth.value = 0
            centerWidth.value = 0
        }
    }

    reRenderShape.value++;
}

const saveModel = (isNextStep = false) => {
    apiServise.callApi(props.links, constants.loading.saveLoading, loadingDto.value).then((data) => {
        if (isNextStep) {
            emit('nextStep');
        }
    });
}

</script>


<template>
    <div style="font-size: 13px;display: block">
        <div class="row">
            <div class="col col-md-3">
                <fieldset class="border rounded-3 p-3">
                    <legend class="float-none w-auto px-3" style="line-height: 0px; font-size: 16px;">
                        Load Input
                    </legend>
                    <radio-group-button name="top" :items="loadType" v-model="loadingDto.loadType" @changed="updateShape" />
                </fieldset>
            </div>
            <div class="col col-md-6">

                <div style="text-align: right; font-size: 14px; font-weight: 600;">Self Weight: {{ loadingDto.selfWeight }}
                </div>
                <hr />
                <label class="col col-md-4"></label>
                <template v-if="loadingDto.loadType == loadTypeCharacteristicLoads">
                    <label class="col col-md-2" style="margin: 0 7px;">Permanent</label>
                    <label class="col col-md-2" style="margin: 0 7px;">Variable</label>
                </template>
                <template v-if="loadingDto.loadType != loadTypeCharacteristicLoads">
                    <label class="col col-md-4" style="margin: 0 16px;">ULS Loads</label>

                </template>

                <hr>
                <div class="row">
                    <div class="col col-md-4"> <span> UDL (kN/m)</span></div>
                    <template v-if="loadingDto.loadType == loadTypeCharacteristicLoads">
                        <div class="col col-md-2">
                            <input-number v-model="loadingDto.permanentLoads.udl" :labelWidth="0" />
                        </div>
                        <div class="col col-md-2">
                            <input-number v-model="loadingDto.variableLoads.udl" :labelWidth="0" />
                        </div>
                    </template>
                    <template v-if="loadingDto.loadType != loadTypeCharacteristicLoads">
                        <div class="col col-md-4">
                            <input-number v-model="loadingDto.ultimateLoads.udl" :labelWidth="0" />
                        </div>
                    </template>

                    <div class="col col-md-2">Start</div>
                    <div class="col col-md-2">End</div>
                </div>
                <div class="row">
                    <div class="col col-md-4"><span> Partial UDL (kN/m)</span></div>
                    <template v-if="loadingDto.loadType == loadTypeCharacteristicLoads">
                        <div class="col col-md-2">
                            <input-number v-model="loadingDto.permanentLoads.partialUdl" :labelWidth="0"
                                @changed="updateShape" />
                        </div>
                        <div class="col col-md-2">
                            <input-number v-model="loadingDto.variableLoads.partialUdl" :labelWidth="0" />
                        </div>
                    </template>
                    <template v-if="loadingDto.loadType != loadTypeCharacteristicLoads">
                        <div class="col col-md-4">
                            <input-number v-model="loadingDto.ultimateLoads.partialUdl" :labelWidth="0"
                                @changed="updateShape" />
                        </div>
                    </template>

                    <div class="col col-md-2">

                        <template v-if="loadingDto.loadType == loadTypeCharacteristicLoads">
                            <input-number v-model="loadingDto.permanentLoads.partialUdlStart" :labelWidth="0"
                                @changed="updateShape" />
                        </template>
                        <template v-if="loadingDto.loadType != loadTypeCharacteristicLoads">
                            <input-number v-model="loadingDto.ultimateLoads.partialUdlStart" :labelWidth="0"
                                @changed="updateShape" />
                        </template>

                    </div>
                    <div class="col col-md-2">
                        <template v-if="loadingDto.loadType == loadTypeCharacteristicLoads">
                            <input-number v-model="loadingDto.permanentLoads.partialUdlEnd" :labelWidth="0"
                                @changed="updateShape" />
                        </template>
                        <template v-if="loadingDto.loadType != loadTypeCharacteristicLoads">
                            <input-number v-model="loadingDto.ultimateLoads.partialUdlEnd" :labelWidth="0"
                            @changed="updateShape" />
                    </template>

                    </div>
                </div>
                <hr>
                <div class="row">
                    <div class="col col-md-8">
                        <div class="row">
                            <div class="col col-md-6"><span> End Moment left (kNm)</span></div>
                            <template v-if="loadingDto.loadType == loadTypeCharacteristicLoads">
                                <div class="col col-md-3">
                                    <input-number v-model="loadingDto.permanentLoads.endMomentLeft" :labelWidth="0" />
                                </div>
                                <div class="col col-md-3">
                                    <input-number v-model="loadingDto.variableLoads.endMomentLeft" :labelWidth="0" />
                                </div>
                            </template>
                            <template v-if="loadingDto.loadType != loadTypeCharacteristicLoads">
                                <div class="col col-md-6">
                                    <input-number v-model="loadingDto.ultimateLoads.endMomentLeft" :labelWidth="0" />
                                </div>

                            </template>

                        </div>
                        <div class="row">
                            <div class="col col-md-6"><span> End Moment right (kNm)</span></div>
                            <template v-if="loadingDto.loadType == loadTypeCharacteristicLoads">
                                <div class="col col-md-3">
                                    <input-number v-model="loadingDto.permanentLoads.endMomentRight" :labelWidth="0" />
                                </div>
                                <div class="col col-md-3">
                                    <input-number v-model="loadingDto.variableLoads.endMomentRight" :labelWidth="0" />
                                </div>
                            </template>
                            <template v-if="loadingDto.loadType != loadTypeCharacteristicLoads">
                                <div class="col col-md-6">
                                    <input-number v-model="loadingDto.ultimateLoads.endMomentRight" :labelWidth="0" />
                                </div>

                            </template>

                        </div>
                    </div>
                    <div class="col col-md-4">
                        <img src="@/assets/img/loading.png" alt="loading">
                        <span>(compression +ve)</span>
                    </div>

                </div>
                <hr>
                <div class="row">
                    <div class="col col-md-4"> <span>Axial force (kN)</span></div>
                    <template v-if="loadingDto.loadType == loadTypeCharacteristicLoads">
                        <div class="col col-md-2">
                            <input-number v-model="loadingDto.permanentLoads.axialForce" :labelWidth="0" />
                        </div>
                        <div class="col col-md-2">
                            <input-number v-model="loadingDto.variableLoads.axialForce" :labelWidth="0" />
                        </div>
                    </template>
                    <template v-if="loadingDto.loadType != loadTypeCharacteristicLoads">
                        <div class="col col-md-4">
                            <input-number v-model="loadingDto.ultimateLoads.axialForce" :labelWidth="0" />
                        </div>
                    </template>

                </div>
                <hr>
            </div>
            <div class="col col-md-2"></div>
        </div>

        <div class="row">
            <div class="col col-md-3"></div>
            <div class="col col-md-9" v-if="loadingDto.loadType == loadTypeCharacteristicLoads">
                <div class="row">
                    <div class="col col-md-2">
                        <label>Point loads (kN)</label>
                        <hr>
                    </div>
                    <div class="col col-md-6">
                        <div class="row">
                            <div class="col col-md-3">
                                <label>Position (m)</label>
                            </div>
                            <div class="col col-md-3">
                                <label>Permanent</label>
                            </div>
                            <div class="col col-md-3">
                                <label>Variable</label>
                            </div>
                            <div class="col col-md-3" style="margin-left: -15px; color: #009d00;">
                                <span @click="addCharacteristicPointLoads" class="fa fa-plus-circle fa-2x"></span>
                            </div>
                        </div>

                    </div>

                </div>
                <div class="row">
                    <div class="col col-md-2"></div>
                    <div class="col col-md-6" style="max-height: 140px; overflow-y: scroll;">
                        <div class="row" v-for="(item, index) in loadingDto.characteristicPointLoads" :key="index">
                            <div class="col col-md-3"> <input-number v-model="item.position" :labelWidth="0" /></div>
                            <div class="col col-md-3"> <input-number v-model="item.permanentAction" :labelWidth="0" /></div>
                            <div class="col col-md-3"> <input-number v-model="item.variableAction" :labelWidth="0" /></div>
                            <div class="col col-md-3">
                                <span @click="removeCharacteristicPointLoads(index)" style="color: red;" class="fa fa-minus-circle fa-2x"></span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div class="col col-md-9" v-if="loadingDto.loadType != loadTypeCharacteristicLoads">
                <div class="row">
                    <div class="col col-md-2">
                        <label>Point loads (kN)</label>
                        <hr>
                    </div>
                    <div class="col col-md-6">
                        <div class="row">
                            <div class="col col-md-5">
                                <label>Position (m)</label>
                            </div>
                            <div class="col col-md-5">
                                <label>ULS Loads</label>
                            </div>
                            <div class="col col-md-2" style="margin-left: -15px; color: #009d00;">
                                <span @click="addUltimatePointLoads" class="fa fa-plus-circle fa-2x"></span>
                            </div>                           
                        </div>

                    </div>

                </div>
                <div class="row">
                    <div class="col col-md-2"></div>
                    <div class="col col-md-6" style="max-height: 140px; overflow-y: scroll;">
                        <div class="row" v-for="(item, index) in loadingDto.ultimatePointLoads" :key="index">
                            <div class="col col-md-5"> <input-number v-model="item.position" :labelWidth="0" /></div>
                            <div class="col col-md-5"> <input-number v-model="item.load" :labelWidth="0" /></div>
                            <div class="col col-md-2">
                                <span @click="removeUltimatePointLoads(index)" style="color: red;" class="fa fa-minus-circle fa-2x"></span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        <hr>

        <div class="row" >
            <shape :loadingDto="loadingDto" :reRenderShape="reRenderShape" />
        </div>      
    </div>
    <div class="row" style="justify-content: end; margin-top: 70px;width: 100%;">
        <button class="btn btn-primary col col-md-2 mx-2" @click="saveModel()">save</button>
        <button class="btn btn-success col col-md-2 mx-2" @click="saveModel(true)">save and next</button>
    </div>
</template>
