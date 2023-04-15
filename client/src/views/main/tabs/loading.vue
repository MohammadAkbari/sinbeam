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





export interface Props {
    links: Link[]
}

const props = withDefaults(defineProps<Props>(), {});
const emit = defineEmits(['nextStep', 'saveLinks']);

const apiServise = inject('apiServise') as ApiServise;

const loadingDto = ref({ permanentLoads: {}, variableLoads: {} } as LoadingDto);


const loadType = helper.convertEnumToListItem(LoadType)

const loadTypeCharacteristicLoads = LoadType.CharacteristicLoads;


apiServise.callApi(props.links, constants.loading.getLoading).then((data: LoadingDto) => {
    loadingDto.value = data;
    emit('saveLinks', data._links)
})


</script>


<template>
    <!-- <radio-group-button /> -->
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
                <label class="col col-md-2">Permanent</label>
                <label class="col col-md-2">Variable</label>
                <hr>
                <div class="row">
                    <div class="col col-md-4"> <span> UDL (kN/m)</span></div>
                    <div class="col col-md-2"> <input-number v-model="loadingDto.permanentLoads.udl" :labelWidth="0" />
                    </div>
                    <div class="col col-md-2"> <input-number v-model="loadingDto.variableLoads.udl" :labelWidth="0" />
                    </div>
                    <div class="col col-md-2">Start</div>
                    <div class="col col-md-2">End</div>
                </div>
                <div class="row">
                    <div class="col col-md-4"><span> Partial UDL (kN/m)</span></div>
                    <div class="col col-md-2"><input-number v-model="loadingDto.permanentLoads.partialUdl"
                            :labelWidth="0" /></div>
                    <div class="col col-md-2"><input-number v-model="loadingDto.variableLoads.partialUdl" :labelWidth="0" />
                    </div>
                    <div class="col col-md-2"> <input-number v-model="loadingDto.permanentLoads.partialUdlStart"
                            :labelWidth="0" /></div>
                    <div class="col col-md-2"> <input-number v-model="loadingDto.permanentLoads.partialUdlEnd"
                            :labelWidth="0" /></div>
                </div>
                <hr>
                <div class="row">
                    <div class="col col-md-8">
                        <div class="row">
                            <div class="col col-md-6"><span> End Moment left (kNm)</span></div>
                            <div class="col col-md-3"><input-number v-model="loadingDto.permanentLoads.endMomentLeft"
                                    :labelWidth="0" /></div>
                            <div class="col col-md-3"><input-number v-model="loadingDto.variableLoads.endMomentLeft"
                                    :labelWidth="0" /></div>
                        </div>
                        <div class="row">
                            <div class="col col-md-6"><span> End Moment right (kNm)</span></div>
                            <div class="col col-md-3"><input-number v-model="loadingDto.permanentLoads.endMomentRight"
                                    :labelWidth="0" /></div>
                            <div class="col col-md-3"><input-number v-model="loadingDto.variableLoads.endMomentRight"
                                    :labelWidth="0" /></div>
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
                    <div class="col col-md-2"> <input-number v-model="loadingDto.permanentLoads.axialForce"
                            :labelWidth="0" /></div>
                    <div class="col col-md-2"> <input-number v-model="loadingDto.variableLoads.axialForce"
                            :labelWidth="0" /></div>
                </div>
                <hr>
            </div>
            <div class="col col-md-2"></div>
        </div>

        <div class="row">

        </div>


    </div>
    









    </template>
<style scoped>/* p{
    margin: 0px;
}
hr{
    margin: 12px 0;
} */</style>
