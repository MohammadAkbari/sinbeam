<script setup lang="ts">
import { inject, ref, onMounted } from 'vue';
import type ApiServise from '@/core/services/api.service';
import Link from '@/models/link';
import constants from '@/shared/globals/newConstants';
import type LoadingDto from '@/dtos/loadingDto';
import type IranLoadingDto from '@/dtos/iranLoadingDto';
import { LoadType } from '@/enums/loadType';
import LoadParameters from '@/models/loadParameters';
import type UltimatePointLoadDto from '@/dtos/ultimatePointLoadDto';
import type CharacteristicPointLoadDto from '@/dtos/characteristicPointLoadDto';
import iranLoading from './iran/iranLoading.vue';
import otherLoading from './other/otherLoading.vue';
import { DesignType } from '@/enums/designType';
import { ZType } from '@/enums/zType';
import { XType } from '@/enums/xType';
import type IranLoadingItemDto from '@/dtos/iranLoadingItemDto';

const emit = defineEmits(['nextStep', 'clearForm','saveLinks']);
const apiServise = inject('apiServise') as ApiServise;

export interface Props {
    links: Link[]
}

const props = withDefaults(defineProps<Props>(), {
    //hasCreated: false
});

const loadingDto = ref({ permanentLoads: {}, variableLoads: {}, ultimateLoads: {} } as LoadingDto);
const iranLoadingDto = ref({ loadingItems: [] } as IranLoadingDto);

const designType = DesignType;

onMounted(() => {
    apiServise.callApi(props.links, constants.loading.getLoading).then((data: LoadingDto) => {
        emit('saveLinks', data._links);

        loadingDto.value.loadType = data.loadType;
        loadingDto.value.designType = data.designType;
        loadingDto.value.selfWeight = data.selfWeight;
        loadingDto.value.span = data.span;
        loadingDto.value.permanentLoads = data.permanentLoads ?? {} as LoadParameters;
        loadingDto.value.ultimateLoads = data.ultimateLoads ?? {} as LoadParameters;
        loadingDto.value.variableLoads = data.variableLoads ?? {} as LoadParameters;
        loadingDto.value.ultimatePointLoads = data.ultimatePointLoads ?? [] as UltimatePointLoadDto[];
        loadingDto.value.characteristicPointLoads = data.characteristicPointLoads ?? [] as CharacteristicPointLoadDto[];
        loadingDto.value.combinationType = data.combinationType;
    });
})

const nextStep = async () => {
  const data = await apiServise.callApi(props.links, constants.loading.saveLoading,loadingDto.value );
  emit("nextStep");
}

const clearForm = () => {
    emit("clearForm");
}

</script>

<template>
    <div class="col-11">
        <trmplate v-if="loadingDto.designType == designType.Iran">
            <iran-loading :loadingDto="iranLoadingDto" ></iran-loading>
        </trmplate>
        <trmplate v-else>
            <other-loading :loadingDto="loadingDto"></other-loading>
        </trmplate>

        <sub-panel label="view">
            <template v-slot:body>
                <div class="row">
                    <shape-loading :loadingDto="loadingDto"></shape-loading>
                    <!-- <img src="/src/assets/img/view-2.png" alt=""> -->
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

}</style>