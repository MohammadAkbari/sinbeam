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


onMounted(() => {
    apiServise.callApi(props.links, constants.design.getDesign).then((data: Design) => {
        design.value = data;
    });
});

const clearForm = () => {
    emit("clearForm");
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
                                <span class="py-2 px-3 mx-2 fs-14 fw-500" :style="`border-radius: 4px;${design?.topFlange?.isValid ? 'background-color:#F0FAF2;color:#005212':'background-color:#FFEDED;color:#800000;opacity: 87%;'}`">{{ design?.topFlange?.utilization }}</span>
                            </div>
                            <div>
                                <span class="fs-14 fw-500" style="opacity: 87%;">Bottom Flange Max Utilization </span>
                                <span class="py-2 px-3 mx-2 fs-14 fw-500" :style="`border-radius: 4px;${design?.bottomFlange?.isValid ? 'background-color:#F0FAF2;color:#005212':'background-color:#FFEDED;color:#800000;opacity: 87%;'}`">{{ design?.bottomFlange?.utilization }}</span>
                            </div>
                            <div>
                                <span class="fs-14 fw-500" style="opacity: 87%;">Web Max Utilization </span>
                                <span class="py-2 px-3 mx-2 fs-14 fw-500" :style="`border-radius: 4px;${design?.web?.isValid ? 'background-color:#F0FAF2;color:#005212':'background-color:#FFEDED;color:#800000;opacity: 87%;'}`">{{ design?.web?.utilization }}</span>
                            </div>
                        </div>

                    </template>
                </sub-panel>
            </template>
        </panel>



        <div class="row d-flex justify-content-end py-5">
            <button type="button" class="btn px-2 fs-16 fw-500 mx-2" @click="clearForm"
                style="background-color: #F4F4F4; width: 196px; height: 42px; color: #125CCB;">Clear All</button>
        </div>
    </div>
</template>

<style scoped>
</style>