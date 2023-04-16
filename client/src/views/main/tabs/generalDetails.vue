<script setup lang="ts">
import type GeneralDetails from '@/models/generalDetails';
import inputText from '@/shared/components/inputText.vue';
import textArea from '@/shared/components/textArea.vue';
import datepicker from 'vue3-datepicker';
import { inject, reactive, ref } from 'vue';
import baseUrl from '@/shared/globals/config';
import type ApiServise from '@/core/services/api.service';
import constants from '@/shared/globals/constants';
import type Link from '@/models/link';

export interface Props {
    hasCreated: boolean;
    links: Link[]
}

const props = withDefaults(defineProps<Props>(), {
    hasCreated: false
});

const emit = defineEmits(['nextStep', 'saveLinks']);

const apiServise = inject('apiServise') as ApiServise;
const generalDetails = reactive({} as GeneralDetails);



if (props.hasCreated) {
    apiServise.get(baseUrl).then((data: GeneralDetails) => {

        generalDetails.beam = data.beam;
        generalDetails._links = data._links;
        generalDetails.company = data.company;
        generalDetails.designer = data.designer;
        generalDetails.note = data.note;
        generalDetails.orderDate = data.orderDate;
        generalDetails.project = data.project;
        emit('saveLinks', data._links);
    })
} else {

}

const saveModel = (isNextStep = false) => {
    apiServise.callApi(props.links, constants.generalDetails.createOrder, generalDetails).then((data) => {
        emit('saveLinks', data._links);
        isNextStep && emit('nextStep');
    });
}

</script>

<template>
    <div class="form-horizontal">
        <div class="row">
            <div class="col col-12">
                <div class="col col-6">
                <input-text label="Company" v-model="generalDetails.company" />
                <input-text label="Project" v-model="generalDetails.project" />
                <input-text label="Beam" v-model="generalDetails.beam" />
                <input-text label="Designer" v-model="generalDetails.designer" />
                <text-area label="Note" v-model="generalDetails.note" />
            </div>
            </div>
            <div class="col col-12">
                <Div class="col col-sm-6">
                <div class="mb-1 row">
                    <label class="col-sm-3 col-form-label">Date : </label>
                    <div class="col-sm-9">
                        <datepicker v-model="generalDetails.orderDate" class="form-control" />
                    </div>
                </Div>
                </div>

                <!-- <miladi-date-picker label="date" v-model="generalDetails.date"/> -->
            </div>
        </div>
            <div class="row" style="position: absolute;bottom: 70px;right: 75px; justify-content: end; display: flex;width: 100%;">
                <button class="btn btn-primary col col-md-2 mx-2" @click="saveModel()">save</button>
                <button class="btn btn-success col col-md-2 mx-2" @click="saveModel(true)">save and next</button>
            </div>
    </div>
</template>
