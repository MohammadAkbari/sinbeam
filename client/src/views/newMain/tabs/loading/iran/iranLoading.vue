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
import { Unit } from '@/enums/unit';
import Swal from "sweetalert2";
import loadingicon from "@/assets/img/Loading-icon.png";


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
const unitList =  helper.convertEnumToListItem(Unit);

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

const iranLoadingItemDto = ref({unit:Unit.KN} as IranLoadingItemDto); 

const addItem = () => {

    if(zTypeItem.value != ZType.PointLoad){
        var item = loadingDto.value.loadingItems.find(e=>e.xType == xTypeItem.value && e.zType == zTypeItem.value);

        if(item){
            Swal.fire("Duplicate Row!!!");
            return;
        }           
    }

    iranLoadingItemDto.value.xType = xTypeItem.value;
    iranLoadingItemDto.value.zType = zTypeItem.value;

    loadingDto.value.loadingItems.push({ ...iranLoadingItemDto.value });
    reRender.value++;
    iranLoadingItemDto.value = {unit:Unit.KN} as IranLoadingItemDto;
}

const removeItem = (index:number) => {  
    loadingDto.value.loadingItems.splice(index, 1);
    reRender.value++;
}

const isActiveApply = computed(()=>{
    
    if([zType.Distribute, zType.AxialForce].includes(zTypeItem.value)){
        return !!iranLoadingItemDto.value.value
    }

    else if(zType.EndMoment == zTypeItem.value){
        return !!iranLoadingItemDto.value.leftValue && !! iranLoadingItemDto.value.rightValue
    }

    else if(zType.PointLoad == zTypeItem.value){
        return !!iranLoadingItemDto.value.point && !! iranLoadingItemDto.value.value
    }
    else{
        return false;
    }   
})

</script>

<template>
    <panel label="Loading" :icon="loadingicon" size="col-lg-12">
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
                <div class="row">
                    <div class="col-3" v-if="[zType.Distribute, zType.AxialForce,zType.PointLoad].includes(zTypeItem)">
                        <div class="mb-3 py-2">
                            <label for="value" class="form-label mb-1 input-label">Value</label>
                            <input type="number" class="form-control fs-16" id="value" v-model="iranLoadingItemDto.value">
                        </div>
                    </div>
                    <div class="col-3" v-if="[zType.PointLoad].includes(zTypeItem)"> 
                        <div class="mb-3 py-2">
                            <label for="point" class="form-label mb-1 input-label">Point</label>
                            <input type="number" class="form-control fs-16" id="point" v-model="iranLoadingItemDto.point">
                        </div>
                    </div>
                    <div class="col-3" v-if="[zType.EndMoment].includes(zTypeItem)">
                        <div class="mb-3 py-2">
                            <label for="leftValue" class="form-label mb-1 input-label">Left Value</label>
                            <input type="number" class="form-control fs-16" id="leftValue" v-model="iranLoadingItemDto.leftValue">
                        </div>
                    </div>
                    <div class="col-3" v-if="[zType.EndMoment].includes(zTypeItem)"> 
                        <div class="mb-3 py-2">
                            <label for="rightValue" class="form-label mb-1 input-label">Right Value</label>
                            <input type="number" class="form-control fs-16" id="rightValue" v-model="iranLoadingItemDto.rightValue">
                        </div>
                    </div>
                    <div class="col-3">
                        <div class="mb-3 py-2">
                            <label for="unit" class="form-label mb-1 input-label">Unit</label>
                            <dropdown :options="unitList" class="fs-12 col-12" id="unit" v-model="iranLoadingItemDto.unit"></dropdown>                            
                        </div>
                    </div>

                    <div class="col-3 position-relative">
                        <div class="mb-3 py-2">
                            <button type="button" class="col-11 btn btn-primary my-4 py-2 fs-14 fw-400 position-absolute" @click="addItem" :disabled="!isActiveApply"
                                    style="background-color: #125CCB; bottom: 0px;">Apply</button>                          
                        </div>
                    </div>
                </div>
                <div class="row px-4 py-3" :key="reRender">
                    <template v-for="xTypeIndex in xTypeList.length">
                        <template v-for="zTypeIndex in zTypeList.length">
                            <table class="table table-bordered text-center" v-if="hasTable(xTypeIndex, zTypeIndex)">
                                <thead>
                                    <tr
                                        style="text-align:left;background-color: #EFEFEF;color:#125CCB; height: 36px;vertical-align: middle; opacity: 78%;">
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
                                            <td>{{ Unit[item.unit] }}</td>
                                            <td>{{ item.value }}</td>
                                            <td style="width: 20%;">
                                                <button type="button" class="col-6 btn btn-primary px-2 fs-14 fw-500"
                                                    @click="removeItem(index)"
                                                    style="color: #B61C1C; background-color: rgba(203, 18, 18, 0.02); border: 0px;">
                                                    Remove
                                                </button>
                                            </td>
                                        </tr>
                                        <tr class="fs-14 fw-500 py-0" v-if="[zType.EndMoment].includes(zTypeIndex)"
                                            style="height: 48px;color: #5C5C5C;vertical-align: middle;">
                                            <td>{{  Unit[item.unit] }}</td>
                                            <td>{{ item.leftValue }}</td>
                                            <td>{{ item.rightValue }}</td>
                                            <td style="width: 20%;">
                                                <button type="button" class="col-6 btn btn-primary px-2 fs-14 fw-500"
                                                    @click="removeItem(index)"
                                                    style="color: #B61C1C; background-color: rgba(203, 18, 18, 0.02); border: 0px;">
                                                    Remove
                                                </button>
                                            </td>
                                        </tr>
                                        <tr class="fs-14 fw-500 py-0" v-if="[zType.PointLoad].includes(zTypeIndex)"
                                            style="height: 48px;color: #5C5C5C;vertical-align: middle;">
                                            <td>{{  Unit[item.unit] }}</td>
                                            <td>{{ item.value }}</td>
                                            <td>{{ item.point }}</td>
                                            <td style="width: 20%;">
                                                <button type="button" class="col-6 btn btn-primary px-2 fs-14 fw-500"
                                                    @click="removeItem(index)"
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