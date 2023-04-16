<script setup lang="ts">
import type Link from '@/models/link';
import type ApiServise from '@/core/services/api.service';

import { inject, reactive, ref, watch } from 'vue';
import constants from '@/shared/globals/constants';
import type BeamDto from '@/models/beamDto';
import type ListItem from '@/models/listItem';
import type LoadingDto from '@/models/loadingDto';

import panel from '@/shared/components/panel.vue';
import inputNumber from '@/shared/components/inputNumber.vue';
import checkBox from '@/shared/components/checkBox.vue';
import singleSelect from '@/shared/components/singleSelect.vue';
import radioGroupButton from '@/shared/components/radioGroupButton.vue';
import { LoadType } from '@/enums/loadType';
import helper from '@/shared/common/helper';
import type CharacteristicPointLoadDto from '@/models/characteristicPointLoadDto';
import type UltimatePointLoadDto from '@/models/ultimatePointLoadDto';





export interface Props {
    links: Link[]
}

const props = withDefaults(defineProps<Props>(), {});
const emit = defineEmits(['nextStep', 'saveLinks']);

const apiServise = inject('apiServise') as ApiServise;

const loadingDto = ref({ permanentLoads: {}, variableLoads: {}, ultimateLoads: {} } as LoadingDto);


const loadType = helper.convertEnumToListItem(LoadType)

const loadTypeCharacteristicLoads = LoadType.CharacteristicLoads;


apiServise.callApi(props.links, constants.loading.getLoading).then((data: LoadingDto) => {

    console.log(data)
    loadingDto.value.loadType = data.loadType;
    loadingDto.value.selfWeight = data.selfWeight;
    loadingDto.value.span = data.span;
    // loadingDto.value.loadType = loadTypeCharacteristicLoads;
    emit('saveLinks', data._links)
})


const addCharacteristicPointLoads = () => {

    if (!loadingDto.value.CharacteristicPointLoads)
        loadingDto.value.CharacteristicPointLoads = [] as CharacteristicPointLoadDto[];

    loadingDto.value.CharacteristicPointLoads.push({} as CharacteristicPointLoadDto)
};

const removeCharacteristicPointLoads = (index) => loadingDto.value.CharacteristicPointLoads.splice(index, 1);

const addUltimatePointLoads = () => {

    if (!loadingDto.value.ultimatePointLoads)
        loadingDto.value.ultimatePointLoads = [] as UltimatePointLoadDto[];

    loadingDto.value.ultimatePointLoads.push({} as UltimatePointLoadDto);

};

const removeUltimatePointLoads = (index) => loadingDto.value.ultimatePointLoads.splice(index, 1)

const leftWidth = ref(0 as number);
const centerWidth = ref(0 as number);

const updateShape = () => {

    if (loadingDto.value.permanentLoads.partialUdlStart >= 0
        && loadingDto.value.permanentLoads.partialUdlStart <= loadingDto.value.span
        && loadingDto.value.permanentLoads.partialUdlEnd >= 0
        && loadingDto.value.permanentLoads.partialUdlEnd <= loadingDto.value.span
        && loadingDto.value.permanentLoads.partialUdlStart < loadingDto.value.permanentLoads.partialUdlEnd) {
        if (loadingDto.value.loadType == loadTypeCharacteristicLoads) {
            if (loadingDto.value.permanentLoads.partialUdl) {
                leftWidth.value = loadingDto.value.permanentLoads.partialUdlStart * 100 / loadingDto.value.span;
                centerWidth.value = (loadingDto.value.permanentLoads.partialUdlEnd - loadingDto.value.permanentLoads.partialUdlStart) * 100 / loadingDto.value.span;
            }
        } else {
            if (loadingDto.value.ultimateLoads.partialUdl) {
                leftWidth.value = loadingDto.value.permanentLoads.partialUdlStart * 100 / loadingDto.value.span;
                centerWidth.value = (loadingDto.value.permanentLoads.partialUdlEnd - loadingDto.value.permanentLoads.partialUdlStart) * 100 / loadingDto.value.span;
            }
        }
    }
    else {
        leftWidth.value = 0
        centerWidth.value = 0
    }
}

</script>


<template>
    <div style="font-size: 13px;">
        <div class="row">
            <div class="col col-md-3">
                <fieldset class="border rounded-3 p-3">
                    <legend class="float-none w-auto px-3" style="line-height: 0px; font-size: 16px;">
                        Load Input
                    </legend>
                    <radio-group-button name="top" :items="loadType" v-model="loadingDto.loadType" />
                </fieldset>
            </div>
            <div class="col col-md-6">

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
                        <input-number v-model="loadingDto.permanentLoads.partialUdlStart" :labelWidth="0"
                            @changed="updateShape" />
                    </div>
                    <div class="col col-md-2">
                        <input-number v-model="loadingDto.permanentLoads.partialUdlEnd" :labelWidth="0"
                            @changed="updateShape" />
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
                            <div class="col col-md-3">
                                <span @click="addCharacteristicPointLoads" class="fa fa-plus-circle"></span>
                            </div>
                        </div>

                    </div>

                </div>
                <div class="row">
                    <div class="col col-md-2"></div>
                    <div class="col col-md-6" style="max-height: 140px; overflow-y: scroll;">
                        <div class="row" v-for="(item, index) in loadingDto.CharacteristicPointLoads" :key="index">
                            <div class="col col-md-3"> <input-number v-model="item.position" :labelWidth="0" /></div>
                            <div class="col col-md-3"> <input-number v-model="item.permanentAction" :labelWidth="0" /></div>
                            <div class="col col-md-3"> <input-number v-model="item.variableAction" :labelWidth="0" /></div>
                            <div class="col col-md-3">
                                <span @click="removeCharacteristicPointLoads(index)" class="fa fa-minus-circle"></span>
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
                            <div class="col col-md-2">
                                <span @click="addUltimatePointLoads" class="fa fa-plus-circle"></span>
                            </div>
                        </div>

                    </div>

                </div>
                <div class="row">
                    <div class="col col-md-2"></div>
                    <div class="col col-md-6" style="max-height: 140px; overflow-y: scroll;">
                        <div class="row" v-for="(item, index) in loadingDto.ultimatePointLoads" :key="index">
                            <div class="col col-md-5"> <input-number v-model="item.load" :labelWidth="0" /></div>
                            <div class="col col-md-5"> <input-number v-model="item.position" :labelWidth="0" /></div>
                            <div class="col col-md-2">
                                <span @click="removeUltimatePointLoads(index)" class="fa fa-minus-circle"></span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        <hr>

        <div class="row">





            <div
                style="box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;border-radius: 15px;padding: 15px; position: relative; height: 150px;">

                <div style="margin: 5px 50px; height: 15px">
                    <div :style="`width :${leftWidth}%;height:100%;display: inline-block`"></div>
                    <div :style="`width :${centerWidth}%;background-color: black;height:100%;display: inline-block`"></div>
                    <!-- <div :style="`width :${rightWidth}%;height:100%;display: inline`"></div> -->
                </div>



                <div v-if="loadingDto.loadType == loadTypeCharacteristicLoads ? loadingDto.permanentLoads.udl : loadingDto.ultimateLoads.udl"
                    style="background-color: black; margin: 5px 50px; height: 15px"></div>
                <div v-else style="margin: 5px 50px; height: 15px"></div>

              
                    <span v-if="loadingDto.loadType == loadTypeCharacteristicLoads ? loadingDto.permanentLoads.endMomentLeft : loadingDto.ultimateLoads.endMomentLeft"
                        style="color: red; position: absolute; top: 70px; left: 50px;">
                        <img src="@/assets/img/ss.png" style="height: 40px;">
                    </span>
                    <span v-if="loadingDto.loadType == loadTypeCharacteristicLoads ? loadingDto.permanentLoads.endMomentRight : loadingDto.ultimateLoads.endMomentRight"
                        style="color: red; position: absolute; top: 70px; right: 50px;">
                        <img src="@/assets/img/ss.png" style="height: 40px;">
                    </span>

                    <span v-if="loadingDto.loadType == loadTypeCharacteristicLoads ? loadingDto.permanentLoads.axialForce : loadingDto.ultimateLoads.axialForce"
                        style="color: red; position: absolute; top: 77px; right: 35px;">
                        <img src="@/assets/img/left.png" style="height: 22px;">
                    </span>

                    <span v-if="loadingDto.loadType == loadTypeCharacteristicLoads ? loadingDto.permanentLoads.axialForce : loadingDto.ultimateLoads.axialForce"
                        style="color: red; position: absolute; top: 77px; left: 35px;">
                        <img src="@/assets/img/right.png" style="height: 22px;">
                    </span>
         

                <span class="fa fa-close" style="color: red; position: absolute; top: 55px; left: 60px;"></span>
                <span class="fa fa-close" style="color: red; position: absolute; top: 112px; left: 60px;"></span>
                <span class="fa fa-close" style="color: red; position: absolute; top: 55px; right: 61px;"></span>
                <span class="fa fa-close" style="color: red; position: absolute; top: 112px; right: 61px;"></span>

                <div style="border: solid; margin: auto auto; height: 60px; margin: 0 50px; border-width: 2px ">


                </div>

                <div class="row" style="padding: 0 50px;">
                    <div style="width: 48%;">
                        <hr class="arrow left">
                    </div>
                    <div style="width: 4%; padding: 0 5px;">{{ loadingDto.span }}</div>
                    <div style="width: 48%;">
                        <hr class="arrow">
                    </div>
                </div>



            </div>
        </div>




    </div>
</template>
<style scoped lang="scss">
$page-color: #eee;
$arrow-color: #0af;
$arrow-size: 6px;


.left {
    transform: rotate(180deg);
}

// Where the magic happens
.arrow {

    max-width: 100%;
    height: $arrow-size * 2;
    margin: 1em auto;
    border: 0;
    position: relative;
    overflow: hidden;
    background-image: linear-gradient($page-color $arrow-size - $arrow-size / 3,
            $arrow-color $arrow-size - $arrow-size / 3,
            $arrow-color $arrow-size + $arrow-size / 3,
            $page-color $arrow-size + $arrow-size / 3);
}

.arrow:before,
.arrow:after {
    content: "";
    position: absolute;
}

.arrow:after {
    right: -$arrow-size;
    border: $arrow-size solid;
    border-color: $page-color $page-color $page-color $arrow-color;
}



// Base stuff; pay no mind
html {
    background-color: $page-color;
}

p {
    text-align: center;
}</style>
