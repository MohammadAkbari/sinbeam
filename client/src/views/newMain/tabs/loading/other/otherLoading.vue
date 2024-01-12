<script setup lang="ts">
import { inject, ref, onMounted } from 'vue';
import type ApiServise from '@/core/services/api.service';
import constants from '@/shared/globals/newConstants';
import type LoadingDto from '@/dtos/loadingDto';
import { LoadType } from '@/enums/loadType';
import type UltimatePointLoadDto from '@/dtos/ultimatePointLoadDto';
import type CharacteristicPointLoadDto from '@/dtos/characteristicPointLoadDto';

const emit = defineEmits(['nextStep', 'clearForm', 'saveLinks']);
const apiServise = inject('apiServise') as ApiServise;

export interface Props {
    loadingDto?: LoadingDto;
}
const props = withDefaults(defineProps<Props>(), {
    //hasCreated: false
});

const loadingDto = ref({ permanentLoads: {}, variableLoads: {}, ultimateLoads: {} } as LoadingDto);

onMounted(() => {
    loadingDto.value = props.loadingDto;
})

const loadType = LoadType;

const characteristicPointLoadDto = ref({} as CharacteristicPointLoadDto);
const ultimatePointLoad = ref({} as UltimatePointLoadDto);



const addCharacteristicPointLoadDto = () => {
    loadingDto.value.characteristicPointLoads.unshift({ ...characteristicPointLoadDto.value });
    characteristicPointLoadDto.value = {} as CharacteristicPointLoadDto;
}

const removeCharacteristicPointLoadDto = (index) => {
    loadingDto.value.characteristicPointLoads.splice(index, 1);
}

const addUltimatePointLoad = () => {
    loadingDto.value.ultimatePointLoads.unshift({ ...ultimatePointLoad.value });
    ultimatePointLoad.value = {} as UltimatePointLoadDto;
}

const removeUltimatePointLoad = (index) => {
    loadingDto.value.ultimatePointLoads.splice(index, 1);
}

</script>

<template>
    <panel label="Loading" icon="/src/assets/img/Loading-icon.png" size="col-lg-12">
        <template v-slot:body>
            <div class="row px-2 py-3">
                <div class="d-flex justify-content-start ">
                    <span class="fs-14 fw-500 mx-3" style="opacity: 78%;">Load Input</span>
                    <div class="form-check mx-3">
                        <input class="form-check-input fs-16" type="radio" name="Element"
                            :value="loadType.CharacteristicLoads" v-model="loadingDto.loadType" id="Characteristic">
                        <label class="form-check-label fs-16 fw-400" style="opacity: 78%;" for="Characteristic">
                            Characteristic Loads
                        </label>
                    </div>
                    <div class="form-check mx-3 ">
                        <input class="form-check-input fs-16" type="radio" name="Element" :value="loadType.UltimateLoads"
                            v-model="loadingDto.loadType" id="Ultimate">
                        <label class="form-check-label fs-16 fw-400" style="opacity: 78%;" for="Ultimate">
                            Ultimate Loads
                        </label>
                    </div>
                </div>
            </div>
            <template v-if="loadingDto.loadType == loadType.CharacteristicLoads">
                <div class="row px-4 py-3">
                    <table class="table table-bordered text-center">
                        <thead>
                            <tr
                                style="text-align:left;background-color:#FBFBFB; height: 36px;vertical-align: middle; opacity: 78%;">
                                <td class="px-4 fs-14 fw-500" colspan="5">ULS Loads</td>
                            </tr>
                            <tr class="fs-14 fw-500"
                                style="background-color:#F6F6F6;height: 48px; color: #5C5C5C;vertical-align: middle;">
                                <td></td>
                                <td>Parament</td>
                                <td>Variable</td>
                                <td>Start</td>
                                <td>End</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="fs-14 fw-500 py-0" style="height: 48px;color: #5C5C5C;vertical-align: middle;">
                                <td class="px-4" style="width: 25%; text-align: left;">UDL (kN/m)</td>
                                <td style="width: 20%;"><input type="number" v-model="loadingDto.permanentLoads.udl">
                                </td>
                                <td style="width: 20%;"><input type="number" v-model="loadingDto.variableLoads.udl">
                                </td>
                                <td>-</td>
                                <td>-</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="row px-4 py-3">
                    <table class="table table-bordered text-center">
                        <thead>
                            <tr
                                style="text-align:left;background-color:#FBFBFB; height: 36px;vertical-align: middle; opacity: 78%;">
                                <td class="px-4 fs-14 fw-500" colspan="5">Partial UDL (kN/m)</td>
                            </tr>
                            <tr class="fs-14 fw-500"
                                style="background-color:#F6F6F6;height: 48px; color: #5C5C5C;vertical-align: middle;">
                                <td>Parament</td>
                                <td>Variable</td>
                                <td>Start</td>
                                <td>End</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="fs-14 fw-500 py-0" style="height: 48px;color: #5C5C5C;vertical-align: middle;">
                                <td style="width: 25%;"><input type="number" v-model="loadingDto.permanentLoads.partialUdl">
                                </td>
                                <td style="width: 25%;"><input type="number" v-model="loadingDto.variableLoads.partialUdl">
                                </td>
                                <td style="width: 25%;"><input type="number"
                                        v-model="loadingDto.permanentLoads.partialUdlStart"></td>
                                <td style="width: 25%;"><input type="number"
                                        v-model="loadingDto.permanentLoads.partialUdlEnd"></td>
                                <!-- <td style="width: 20%;">
                                        <button type="button" class="col-6 btn btn-primary px-2 fs-14 fw-500"
                                            style="color: #125CCB; background-color: rgba(18, 92, 203, 0.04); border: 0px;">
                                            Add
                                        </button>
                                    </td> -->
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="row px-4 py-3">
                    <table class="table table-bordered text-center">
                        <thead>
                            <tr class="fs-14 fw-500"
                                style="background-color:#F6F6F6;height: 48px; color: #5C5C5C;vertical-align: middle;">
                                <td></td>
                                <td>Parament</td>
                                <td>Variable</td>
                                <td>Compression +ve</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="fs-14 fw-500 py-0" style="height: 48px;color: #5C5C5C;vertical-align: middle;">
                                <td style="width: 25%;">End Moment left (kNm)</td>
                                <td><input type="number" v-model="loadingDto.permanentLoads.endMomentLeft"></td>
                                <td><input type="number" v-model="loadingDto.variableLoads.endMomentLeft"></td>
                                <td style="width: 35%;" rowspan="2">
                                    <img src="/src/assets/img/compression.png" alt="">
                                </td>

                            </tr>
                            <tr class="fs-14 fw-500 py-0" style="height: 48px;color: #5C5C5C;vertical-align: middle;">
                                <td>End Moment right (kNm)</td>
                                <td><input type="number" v-model="loadingDto.permanentLoads.endMomentRight"></td>
                                <td><input type="number" v-model="loadingDto.variableLoads.endMomentRight"></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="row px-4 py-3">
                    <table class="table table-bordered text-center">
                        <tbody>
                            <tr class="fs-14 fw-500 py-0" style="height: 48px;color: #5C5C5C;vertical-align: middle;">
                                <td style="width: 25%;background-color:#F6F6F6;">Axial force (kN)</td>
                                <td style="background-color:#F6F6F6;">Parament</td>
                                <td style="background-color:#F6F6F6;">Variable</td>
                                <td style="width: 35%;" rowspan="2">
                                    <img src="/src/assets/img/compression-2.png" alt="">
                                </td>

                            </tr>
                            <tr class="fs-14 fw-500 py-0" style="height: 48px;color: #5C5C5C;vertical-align: middle;">
                                <td></td>
                                <td><input type="number" v-model="loadingDto.permanentLoads.axialForce"></td>
                                <td><input type="number" v-model="loadingDto.variableLoads.axialForce"></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="row px-4 py-3">
                    <table class="table table-bordered text-center">
                        <tbody>
                            <tr class="fs-14 fw-500 py-0" style="height: 48px;color: #5C5C5C;vertical-align: middle;">
                                <td style="width: 25%;background-color:#F6F6F6;">Point Loads (kN)</td>
                                <td style="background-color:#F6F6F6;">Position (m)</td>
                                <td style="background-color:#F6F6F6;">Parament</td>
                                <td style="background-color:#F6F6F6;">Variable</td>
                                <td style="background-color:#F6F6F6;">Add / Remove</td>
                            </tr>
                            <tr class="fs-14 fw-500 py-0" style="height: 48px;color: #5C5C5C;vertical-align: middle;">
                                <td></td>
                                <td><input type="number" v-model="characteristicPointLoadDto.position"></td>
                                <td><input type="number" v-model="characteristicPointLoadDto.permanentAction"></td>
                                <td><input type="number" v-model="characteristicPointLoadDto.variableAction"></td>
                                <td style="width: 20%;">
                                    <button type="button" class="col-6 btn btn-primary px-2 fs-14 fw-500"
                                        @click="addCharacteristicPointLoadDto()"
                                        :disabled="!(characteristicPointLoadDto.position?.toString() && (characteristicPointLoadDto.permanentAction?.toString() ||  characteristicPointLoadDto.variableAction?.toString()))"
                                        style="color: #125CCB; background-color: rgba(18, 92, 203, 0.04); border: 0px;">
                                        Add
                                    </button>
                                </td>
                            </tr>

                            <tr v-for="(item, index) in loadingDto.characteristicPointLoads" :key="index"
                                class="fs-14 fw-500 py-0" style="height: 48px;color: #5C5C5C;vertical-align: middle;">
                                <td></td>
                                <td>{{ item.position }}</td>
                                <td>{{ item.permanentAction }}</td>
                                <td>{{ item.variableAction }}</td>
                                <td style="width: 20%;">
                                    <button type="button" class="col-6 btn btn-primary px-2 fs-14 fw-500"
                                        @click="removeCharacteristicPointLoadDto(index)"
                                        style="color: #B61C1C; background-color: rgba(203, 18, 18, 0.02); border: 0px;">
                                        Remove
                                    </button>
                                </td>
                            </tr>


                        </tbody>
                    </table>
                </div>
            </template>
            <template v-else>
                <div class="row px-4 py-3">
                    <table class="table table-bordered text-center">
                        <thead>
                            <tr
                                style="text-align:left;background-color:#FBFBFB; height: 36px;vertical-align: middle; opacity: 78%;">
                                <td class="px-4 fs-14 fw-500" colspan="5">ULS Loads</td>
                            </tr>
                            <tr class="fs-14 fw-500"
                                style="background-color:#F6F6F6;height: 48px; color: #5C5C5C;vertical-align: middle;">
                                <td></td>
                                <td>Ultimate Load</td>
                                <td>Start</td>
                                <td>End</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="fs-14 fw-500 py-0" style="height: 48px;color: #5C5C5C;vertical-align: middle;">
                                <td class="px-4" style="width: 25%; text-align: left;">UDL (kN/m)</td>
                                <td style="width: 25%;"><input type="number" v-model="loadingDto.ultimateLoads.udl">
                                </td>
                                <td style="width: 25%;">-</td>
                                <td style="width: 25%;">-</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="row px-4 py-3">
                    <table class="table table-bordered text-center">
                        <thead>
                            <tr
                                style="text-align:left;background-color:#FBFBFB; height: 36px;vertical-align: middle; opacity: 78%;">
                                <td class="px-4 fs-14 fw-500" colspan="5">Partial ULS Loads</td>
                            </tr>
                            <tr class="fs-14 fw-500"
                                style="background-color:#F6F6F6;height: 48px; color: #5C5C5C;vertical-align: middle;">
                                <td></td>
                                <td>Ultimate Load</td>
                                <td>Start</td>
                                <td>End</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="fs-14 fw-500 py-0" style="height: 48px;color: #5C5C5C;vertical-align: middle;">
                                <td class="px-4" style="width: 25%;">UDL (kN/m)</td>
                                <td><input type="number" v-model="loadingDto.ultimateLoads.partialUdl"></td>
                                <td><input type="number" v-model="loadingDto.ultimateLoads.partialUdlStart"></td>
                                <td><input type="number" v-model="loadingDto.ultimateLoads.partialUdlEnd"></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="row px-4 py-3">
                    <table class="table table-bordered text-center">
                        <thead>
                            <tr class="fs-14 fw-500"
                                style="background-color:#F6F6F6;height: 48px; color: #5C5C5C;vertical-align: middle;">
                                <td></td>
                                <td>Ultimate Load</td>
                                <td>Compression +ve</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="fs-14 fw-500 py-0" style="height: 48px;color: #5C5C5C;vertical-align: middle;">
                                <td style="width: 25%;">End Moment left (kNm)</td>
                                <td><input type="number" v-model="loadingDto.ultimateLoads.endMomentLeft"></td>
                                <td style="width: 35%;" rowspan="2">
                                    <img src="/src/assets/img/compression.png" alt="">
                                </td>

                            </tr>
                            <tr class="fs-14 fw-500 py-0" style="height: 48px;color: #5C5C5C;vertical-align: middle;">
                                <td>End Moment right (kNm)</td>
                                <td><input type="number" v-model="loadingDto.ultimateLoads.endMomentRight"></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="row px-4 py-3">
                    <table class="table table-bordered text-center">
                        <tbody>
                            <tr class="fs-14 fw-500 py-0" style="height: 48px;color: #5C5C5C;vertical-align: middle;">
                                <td style="width: 25%;background-color:#F6F6F6;">Axial force (kN)</td>
                                <td style="background-color:#F6F6F6;">Ultimate Load</td>
                                <td style="width: 35%;" rowspan="2">
                                    <img src="/src/assets/img/compression-2.png" alt="">
                                </td>

                            </tr>
                            <tr class="fs-14 fw-500 py-0" style="height: 48px;color: #5C5C5C;vertical-align: middle;">
                                <td></td>
                                <td><input type="number" v-model="loadingDto.ultimateLoads.axialForce"></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="row px-4 py-3">
                    <table class="table table-bordered text-center">
                        <thead>
                            <tr
                                style="text-align:left;background-color:#FBFBFB; height: 36px;vertical-align: middle; opacity: 78%;">
                                <td class="px-4 fs-14 fw-500" colspan="5">ULS Loads</td>
                            </tr>
                            <tr class="fs-14 fw-500"
                                style="background-color:#F6F6F6;height: 48px; color: #5C5C5C;vertical-align: middle;">
                                <td>Point loads (kN)</td>
                                <td>Position (m)</td>
                                <td>Load</td>
                                <td style="width: 20%;">Add / Remove</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="fs-14 fw-500 py-0" style="height: 48px;color: #5C5C5C;vertical-align: middle;">
                                <td style="width: 25%;"></td>
                                <td><input type="number" v-model="ultimatePointLoad.position"></td>
                                <td><input type="number" v-model="ultimatePointLoad.load"></td>
                                <td>
                                    <button type="button" class="col-6 btn btn-primary px-2 fs-14 fw-500"
                                        @click="addUltimatePointLoad()"
                                        :disabled="!(ultimatePointLoad.load?.toString() && ultimatePointLoad.position?.toString())"
                                        style="color: #125CCB; background-color: rgba(18, 92, 203, 0.04); border: 0px;">
                                        Add
                                    </button>
                                </td>
                            </tr>
                            <tr v-for="(item, index) in loadingDto.ultimatePointLoads" :key="index"
                                class="fs-14 fw-500 py-0" style="height: 48px;color: #5C5C5C;vertical-align: middle;">
                                <td></td>
                                <td>{{ item.position }}</td>
                                <td>{{ item.load }}</td>
                                <td>
                                    <button type="button" class="col-6 btn btn-primary px-2 fs-14 fw-500"
                                        @click="removeUltimatePointLoad(index)"
                                        style="color: #B61C1C; background-color: rgba(203, 18, 18, 0.02); border: 0px;">
                                        Remove
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </template>
        </template>
    </panel>
</template>

<style scoped>
.table tr td input {
    padding: 0px;
    margin: 0px;
    height: 48px;
    width: 100%;
    background-color: #FEFEFE;
    text-align: center;
    border: 0px;
    font-size: 14px;
    font-weight: 500;
    color: #000000;
    opacity: 87%;
}

.table tr td input:focus {
    border: 1px;
    outline-color: #125CCB;
    opacity: 78%;
    color: #B8B8B8;
}

table tr td {
    padding: 0px;
    font-size: 14px;
    font-weight: 500;
}


input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {

    position: absolute;
    top: 5px;
    right: 5px;
    height: 80%;
    color-scheme: light !important;

}
</style>