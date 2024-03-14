<script setup lang="ts">
import { DesignType } from '@/enums/designType';
import type Link from '@/models/link';
import { inject, onMounted, ref } from 'vue';
import type ApiServise from '@/core/services/api.service';
import constants from '@/shared/globals/newConstants';
import type AnalysisResultDto from '@/models/analysisResultDto';
import type LineChartDto from '@/shared/components/models/lineChartDto';
import type Design from '@/models/design';
import lineChart from '@/shared/components/lineChart.vue';
import type LoadingDto from '@/dtos/loadingDto';
import helper from '@/shared/common/helper';
import { CombinationType } from '@/enums/combinationType';
import designImg from "@/assets/img/design.png"
import type RequestDto from "@/models/requestDto"
import type Country from "@/models/country"
import Swal from "sweetalert2";
import {useCounterStore} from '@/stores/counter';

const store = useCounterStore();



const emit = defineEmits(['nextStep', 'clearForm', 'saveLinks']);
const apiServise = inject('apiServise') as ApiServise;


export interface Props {
    links: Link[]
}

const props = withDefaults(defineProps<Props>(), {
    //hasCreated: false
});

// const design = ref({bottomFlange:{isValid:true,utilization:12.23},web:{isValid:true,utilization:12.23},topFlange:{isValid:false,utilization:12.23}} as Design);
const design = ref({} as Design);

const countries= ref([] as Country[])


onMounted(async () => {
    store.isShowBusyIndicator = true;
    const data = await apiServise.callApi(props.links, constants.design.getDesign);

    design.value = data;
    emit('saveLinks', data._links);

    console.log(data._links);
    

    countries.value = await apiServise.callApi(props.links, constants.countries.getCountries);
    
    requestDto.value.countryId = countries.value[0].id;
    store.isShowBusyIndicator = false;

});

const clearForm = () => {
    emit("clearForm");
}

const showModal = ref(false)
const requestDto = ref({} as RequestDto);


const saveRequeste = async () => {
    if (!requestDto.value.countryId) {
        Swal.fire('Please Enter The Country')
        return;
    }
    if (!requestDto.value.email) {
        Swal.fire('Please Enter The Email')
        return;
    }
    if (!requestDto.value.phoneNumber) {
        Swal.fire('Please Enter The PhoneNumber')
        return;
    }
    
    requestDto.value.phoneNumber=requestDto.value.phoneNumber+'';
    const data = await apiServise.callApi(props.links, constants.order.createRequest,requestDto.value);
    showModal.value = false
    //
}


</script>



<template>
    <div class="col-11">
        <panel label="Design" :icon="designImg" size="col-lg-12">
            <template v-slot:body>
                <sub-panel label="Verification Summary">
                    <template v-slot:body>
                        <div class="d-flex justify-content-around">
                            <div>
                                <span class="fs-14 fw-500" style="opacity: 87%;">Top Flange Max Utilization </span>
                                <span class="py-2 px-3 mx-2 fs-14 fw-500"
                                    :style="`border-radius: 4px;${design?.topFlange?.isValid ? 'background-color:#F0FAF2;color:#005212' : 'background-color:#FFEDED;color:#800000;opacity: 87%;'}`">{{
            design?.topFlange?.utilization }}</span>
                            </div>
                            <div>
                                <span class="fs-14 fw-500" style="opacity: 87%;">Bottom Flange Max Utilization </span>
                                <span class="py-2 px-3 mx-2 fs-14 fw-500"
                                    :style="`border-radius: 4px;${design?.bottomFlange?.isValid ? 'background-color:#F0FAF2;color:#005212' : 'background-color:#FFEDED;color:#800000;opacity: 87%;'}`">{{
            design?.bottomFlange?.utilization }}</span>
                            </div>
                            <div>
                                <span class="fs-14 fw-500" style="opacity: 87%;">Web Max Utilization </span>
                                <span class="py-2 px-3 mx-2 fs-14 fw-500"
                                    :style="`border-radius: 4px;${design?.web?.isValid ? 'background-color:#F0FAF2;color:#005212' : 'background-color:#FFEDED;color:#800000;opacity: 87%;'}`">{{
            design?.web?.utilization }}</span>
                            </div>
                        </div>

                    </template>
                </sub-panel>
            </template>
        </panel>



        <div class="row d-flex justify-content-end py-5">
            <button type="button" class="btn px-2 fs-16 fw-500 mx-2" @click="clearForm"
                style="background-color: #F4F4F4; width: 196px; height: 42px; color: #125CCB;">Clear All</button>
            <button type="button" class="btn btn-primary px-2 fs-16 fw-500  mx-2" @click="showModal = true"
                style="background-color: #125CCB; width: 196px; height: 42px;">Next</button>
        </div>
        <vue-modal btnClassList="btn btn-success" :isShowModal="showModal" headerTitle="contact Us"
            @closeModal="showModal = !showModal" width="500px">
            <hr class="mt-0">
            <div class="row">
                <div class="col-12" style="padding:0px 40px;">
                    <div class="">
                        <label for="countryId" class="form-label mb-1 input-label">countryId</label>
                        <dropdown class="col-12 fs-16" :options="countries" v-model="requestDto.countryId" text="name" ></dropdown>
                    </div>
                </div>
                <div class="col-12" style="padding:0px 40px;">
                    <div class="mb-1 py-2 ">
                        <label for="email" class="form-label mb-1 input-label">Email</label>
                        <input type="email" class="form-control fs-16" id="email" v-model="requestDto.email">
                    </div>
                </div>
                <div class="col-12" style="padding:0px 40px;">
                    <div class="mb-1 py-2 ">
                        <label for="phoneNumber" class="form-label mb-1 input-label">phoneNumber</label>
                        <input type="text" class="form-control fs-16" id="phoneNumber"
                            v-model.trim="requestDto.phoneNumber">
                    </div>
                </div>
                <div class="col-12 mt-5" style="padding:0px 40px;">
                    <div class="mb-1 py-2 ">
                        <button type="button" class="col-6 btn btn-secondary px-4 fs-14 fw-400"
                            @click="showModal = false">Cancel</button>
                        <button type="button" class="col-6 btn btn-success px-2 fs-14 fw-400"
                            @click="saveRequeste">Save</button>
                    </div>
                </div>
            </div>
        </vue-modal>
    </div>
</template>

<style scoped></style>