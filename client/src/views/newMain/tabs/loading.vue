<script setup lang="ts">
import { inject, ref,onMounted } from 'vue';
import type ApiServise from '@/core/services/api.service';
import Link from '@/models/link';
import constants from '@/shared/globals/newConstants';
import type LoadingDto from '@/dtos/loadingDto';

const emit = defineEmits(['nextStep', 'clearForm']);
const loadInput = ref(true as boolean);
const apiServise = inject('apiServise') as ApiServise;

export interface Props {
  links: Link[]
}

const props = withDefaults(defineProps<Props>(), {
  //hasCreated: false
});

const loadingDto = ref({} as LoadingDto);


onMounted(()=>{
    apiServise.callApi(props.links,constants.loading.getLoading).then((data)=>{
        loadingDto.value = data;

    });
})

const nextStep = () => {
    emit("nextStep");
}

const clearForm = () => {
    emit("clearForm");
}


</script>



<template>
    <div class="col-11">
        {{loadingDto}}
        <panel label="Loading" icon="/src/assets/img/Loading-icon.png" size="col-lg-12">
            <template v-slot:body>
                <div class="row px-2 py-3">
                    <div class="d-flex justify-content-start ">
                        <span class="fs-14 fw-500 mx-3" style="opacity: 78%;">Load Input</span>
                        <div class="form-check mx-3">
                            <input class="form-check-input fs-16" type="radio" name="Element" :value="true"
                                v-model="loadInput" id="Characteristic">
                            <label class="form-check-label fs-16 fw-400" style="opacity: 78%;" for="Characteristic">
                                Characteristic Loads
                            </label>
                        </div>
                        <div class="form-check mx-3 ">
                            <input class="form-check-input fs-16" type="radio" name="Element" :value="false"
                                v-model="loadInput" id="Ultimate">
                            <label class="form-check-label fs-16 fw-400" style="opacity: 78%;" for="Ultimate">
                                Ultimate Loads
                            </label>
                        </div>
                    </div>
                </div>
                <template v-if="loadInput">
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
                                    <td><input type="number" name="Parament" id="Parament"></td>
                                    <td><input type="number" name="Variable" id="Variable"></td>
                                    <td><input type="number" name="Start" id="Start"></td>
                                    <td><input type="number" name="End" id="End"></td>
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
                                    <td>Add / Remove</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="fs-14 fw-500 py-0" style="height: 48px;color: #5C5C5C;vertical-align: middle;">
                                    <td style="width: 20%;"><input type="number" name="Parament1" id="Parament1"></td>
                                    <td style="width: 20%;"><input type="number" name="Parament2" id="Parament2"></td>
                                    <td style="width: 20%;"><input type="number" name="Parament3" id="Parament3"></td>
                                    <td style="width: 20%;"><input type="number" name="Parament4" id="Parament4"></td>
                                    <td style="width: 20%;">
                                        <button type="button" class="col-6 btn btn-primary px-2 fs-14 fw-500"
                                            style="color: #125CCB; background-color: rgba(18, 92, 203, 0.04); border: 0px;">
                                            Add
                                        </button>
                                    </td>
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
                                    <td><input type="number" name="Parament6" id="Parament6"></td>
                                    <td><input type="number" name="Parament7" id="Parament7"></td>
                                    <td style="width: 35%;" rowspan="2">
                                        <img src="/src/assets/img/compression.png" alt="">
                                    </td>

                                </tr>
                                <tr class="fs-14 fw-500 py-0" style="height: 48px;color: #5C5C5C;vertical-align: middle;">
                                    <td>End Moment right (kNm)</td>
                                    <td><input type="number" name="Parament6" id="Parament6"></td>
                                    <td><input type="number" name="Parament7" id="Parament7"></td>
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
                                    <td><input type="number" name="Parament6" id="Parament6"></td>
                                    <td><input type="number" name="Parament7" id="Parament7"></td>
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
                                    <td class="px-4" style="width: 25%;">UDL (kN/m)</td>
                                    <td style="width: 35%;"><input type="number" name="Ultimate" id="Ultimate"></td>
                                    <td>-</td>
                                    <td>-</td>
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
                                    <td><input type="number" name="Parament6" id="Parament6"></td>
                                    <td><input type="number" name="Parament7" id="Parament7"></td>
                                    <td style="width: 35%;" rowspan="2">
                                        <img src="/src/assets/img/compression.png" alt="">
                                    </td>

                                </tr>
                                <tr class="fs-14 fw-500 py-0" style="height: 48px;color: #5C5C5C;vertical-align: middle;">
                                    <td>End Moment right (kNm)</td>
                                    <td><input type="number" name="Parament6" id="Parament6"></td>
                                    <td><input type="number" name="Parament7" id="Parament7"></td>
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
                                    <td><input type="number" name="Parament6" id="Parament6"></td>
                                    <td><input type="number" name="Parament7" id="Parament7"></td>
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
                                    <td>Parament</td>
                                    <td>Variable</td>
                                    <td style="width: 20%;">Add / Remove</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="fs-14 fw-500 py-0" style="height: 48px;color: #5C5C5C;vertical-align: middle;">
                                    <td><input type="number" name="Point" id="Point"></td>
                                    <td><input type="number" name="Position3" id="Position3"></td>
                                    <td><input type="number" name="Parament3" id="Parament3"></td>
                                    <td><input type="number" name="Variable3" id="Variable3"></td>
                                    <td>
                                        <button type="button" class="col-6 btn btn-primary px-2 fs-14 fw-500"
                                            style="color: #125CCB; background-color: rgba(18, 92, 203, 0.04); border: 0px;">
                                            Add
                                        </button>
                                    </td>
                                </tr>
                                <tr class="fs-14 fw-500 py-0" style="height: 48px;color: #5C5C5C;vertical-align: middle;">
                                    <td><input type="number" name="Point" id="Point"></td>
                                    <td><input type="number" name="Position3" id="Position3"></td>
                                    <td><input type="number" name="Parament3" id="Parament3"></td>
                                    <td><input type="number" name="Variable3" id="Variable3"></td>
                                    <td>
                                        <button type="button" class="col-6 btn btn-primary px-2 fs-14 fw-500"
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
        <sub-panel label="view" v-if="loadInput">
            <template v-slot:body>
                <div class="row">
                    <img src="/src/assets/img/view.png" alt="">
                </div>
            </template>
        </sub-panel>
        <sub-panel label="view" v-else>
            <template v-slot:body>
                <div class="row">
                    <img src="/src/assets/img/view-2.png" alt="">
                </div>
            </template>
        </sub-panel>

        <div class="row d-flex justify-content-end py-5">
            <button type="button" class="btn px-2 fs-16 fw-500 mx-2" @click="clearForm"
                style="background-color: #F4F4F4; width: 196px; height: 42px; color: #125CCB;">Clear All</button>
            <button type="button" class="btn btn-primary px-2 fs-16 fw-500  mx-2" @click="nextStep"
                style="background-color: #125CCB; width: 196px; height: 42px;">Next</button>
        </div>
    </div>
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