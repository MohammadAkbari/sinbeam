<script setup lang="ts">
import { inject, ref, onMounted, watch, computed } from 'vue';
import type ApiServise from '@/core/services/api.service';
import Link from '@/models/link';
import constants from '@/shared/globals/newConstants';
import type LoadingDto from '@/dtos/loadingDto';
import { ZType } from '@/enums/zType';
import { XType } from '@/enums/xType';
import LoadParameters from '@/models/loadParameters';
import type UltimatePointLoadDto from '@/dtos/ultimatePointLoadDto';
import type CharacteristicPointLoadDto from '@/dtos/characteristicPointLoadDto';
import type IranLoadingDto from '@/dtos/iranLoadingDto';
import type IranLoadingItemDto from '@/dtos/iranLoadingItemDto';
import helper from '@/shared/common/helper';


const emit = defineEmits(['nextStep', 'clearForm', 'saveLinks']);
const apiServise = inject('apiServise') as ApiServise;

export interface Props {
    loadingDto?: IranLoadingDto;
}
const props = withDefaults(defineProps<Props>(), {
    //hasCreated: false
});


onMounted(() => {
    loadingDto.value = props.loadingDto;
    reRender.value++;
})

const reRender = ref(0 as number);


const zTypeList = helper.convertEnumToListItem(ZType);
const xTypeList = helper.convertEnumToListItem(XType);

const zType = ZType;
const xType = XType;

const zTypeItem = ref(ZType.Distribute as number);
const xTypeItem = ref(XType.Dead as number);

const loadingDto = ref({ loadingItems: [] } as IranLoadingDto);

const hasTable = (x, z) => {
    return loadingDto.value.loadingItems?.some(e => e.xType == (x) && e.zType == (z))
}

const getTitle = (x, z) => {
    return zTypeList.find(e => e.id == z)?.title + ' - ' + xTypeList.find(e => e.id == x)?.title;
}

const iranLoadingItemDto = ref({} as IranLoadingItemDto);

const addItem = () => {
    loadingDto.value.loadingItems.push({ ...iranLoadingItemDto.value });
}

const removeItem = (item :IranLoadingItemDto) => {
    // loadingDto.value.loadingItems.(item);
}

</script>

<template>
    {{ loadingDto }}
    <panel label="Loading" icon="/src/assets/img/Loading-icon.png" size="col-lg-12">
        <template v-slot:body>
            <div class="px-4 py-2">
                <div class="row my-2"><span class="fs-14 fw-50" style="color: #3F3F3F;">Type</span></div>
                <div class="row">
                    <div class="col-3">
                        <dropdown :options="zTypeList" class="fs-12 col-7" v-model="zTypeItem"></dropdown>
                    </div>
                    <div class="col-3 d-flex">
                        <div class="form-check mx-3 d-flex justify-content-start" v-for="(item, index) in xTypeList"
                            :key="index">
                            <input class="form-check-input fs-16" type="radio" name="xTypeItem" :value="item.id"
                                v-model="xTypeItem" :id="item.title">
                            <label class="form-check-label fs-16 fw-400 mx-1" style="opacity: 78%;" :for="item.title">
                                {{ item.title }}
                            </label>
                        </div>
                    </div>
                </div>
                <div class="row px-4 py-3" :key="reRender">
                    <template v-for="xTypeIndex in xTypeList.length">
                        <template v-for="zTypeIndex in zTypeList.length">
                            <table class="table table-bordered text-center" v-if="hasTable(xTypeIndex, zTypeIndex)">
                                <thead>
                                    <tr
                                        style="text-align:left;background-color:#125CCB; height: 36px;vertical-align: middle; opacity: 78%;">
                                        <td class="px-4 fs-14 fw-500" colspan="5">{{ getTitle(xTypeIndex, zTypeIndex) }}
                                        </td>
                                    </tr>
                                    <tr class="fs-14 fw-600"
                                        v-if="[zType.Distribute, zType.AxialForce].includes(zTypeIndex)"
                                        style="background-color:#F6F6F6;height: 48px; color: #5C5C5C;vertical-align: middle;">
                                        <td>Unit</td>
                                        <td>Value</td>
                                        <td>Remove</td>
                                    </tr>
                                    <tr class="fs-14 fw-500" v-if="[zType.EndMoment].includes(zTypeIndex)"
                                        style="background-color:#F6F6F6;height: 48px; color: #5C5C5C;vertical-align: middle;">
                                        <td>Unit</td>
                                        <td>Left Value</td>
                                        <td>Right Value</td>
                                        <td>Remove</td>
                                    </tr>
                                    <tr class="fs-14 fw-500" v-if="[zType.PointLoad].includes(zTypeIndex)"
                                        style="background-color:#F6F6F6;height: 48px; color: #5C5C5C;vertical-align: middle;">
                                        <td>Unit</td>
                                        <td>Point</td>
                                        <td>Value</td>
                                        <td>Remove</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <template
                                        v-for="(item, index) in loadingDto.loadingItems?.filter(e => e.xType == (xTypeIndex) && e.zType == (zTypeIndex))">
                                        <tr class="fs-14 fw-500 py-0"
                                            v-if="[zType.Distribute, zType.AxialForce].includes(zTypeIndex)"
                                            style="height: 48px;color: #5C5C5C;vertical-align: middle;">
                                            <td>{{ item.unit }}</td>
                                            <td>{{ item.value }}</td>
                                            <td style="width: 20%;">
                                                <button type="button" class="col-6 btn btn-primary px-2 fs-14 fw-500"
                                                    @click="removeItem(item)"
                                                    style="color: #B61C1C; background-color: rgba(203, 18, 18, 0.02); border: 0px;">
                                                    Remove
                                                </button>
                                            </td>
                                        </tr>
                                        <tr class="fs-14 fw-500 py-0" v-if="[zType.EndMoment].includes(zTypeIndex)"
                                            style="height: 48px;color: #5C5C5C;vertical-align: middle;">
                                            <td>{{ item.unit }}</td>
                                            <td>{{ item.leftValue }}</td>
                                            <td>{{ item.rightValue }}</td>
                                            <td style="width: 20%;">
                                                <button type="button" class="col-6 btn btn-primary px-2 fs-14 fw-500"
                                                    @click="removeItem(item)"
                                                    style="color: #B61C1C; background-color: rgba(203, 18, 18, 0.02); border: 0px;">
                                                    Remove
                                                </button>
                                            </td>
                                        </tr>
                                        <tr class="fs-14 fw-500 py-0" v-if="[zType.PointLoad].includes(zTypeIndex)"
                                            style="height: 48px;color: #5C5C5C;vertical-align: middle;">
                                            <td>{{ item.unit }}</td>
                                            <td>{{ item.value }}</td>
                                            <td>{{ item.point }}</td>
                                            <td style="width: 20%;">
                                                <button type="button" class="col-6 btn btn-primary px-2 fs-14 fw-500"
                                                    @click="removeItem(item)"
                                                    style="color: #B61C1C; background-color: rgba(203, 18, 18, 0.02); border: 0px;">
                                                    Remove
                                                </button>
                                            </td>
                                        </tr>
                                    </template>

                                </tbody>
                            </table>
                        </template>
                    </template>

                </div>


            </div>
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

}</style>