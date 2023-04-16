<script setup lang="ts">
import type Link from '@/models/link';
import constants from '@/shared/globals/constants';
import type Properties from '@/models/properties';
import type ApiServise from '@/core/services/api.service';
import { inject, ref } from 'vue';
import Panel from '@/shared/components/panel.vue';



export interface Props {
    links: Link[]
}

const props = withDefaults(defineProps<Props>(), {});
const emit = defineEmits(['nextStep']);

const apiServise = inject('apiServise') as ApiServise;


const properties = ref({} as Properties);

apiServise.callApi(props.links, constants.properties.getProperties).then((data: Properties) => {

debugger


    properties.value = data;
});

const nextStep = ()=>{
    emit('nextStep');
}

</script>

<template>
    <div class="row">
        <div class="col col-md-6" v-if="properties.left">
            <panel label="left">
                <template v-slot:body>
                    <label>Bean has uniform depth</label>
                    <hr>
                    <div class="row" v-for="(item, index) in properties.left" :key="index">
                        <label> {{ item }}</label>
                    </div>
                </template>
            </panel>
        </div>
        <div class="col col-md-6" v-if="properties.right">
            <panel label="right">
                <template v-slot:body>
                    <label>WTA1000 / 200x12</label>
                    <hr>
                    <div class="row" v-for="(item, index) in properties.right" :key="index">
                        <label> {{ item }}</label>
                    </div>
                </template>
            </panel>
        </div>
    </div>


    <div class="row" style="position: absolute;bottom: 30px;right: 75px; justify-content: end; display: flex;width: 100%;">

        <button class="btn btn-success col col-md-2 mx-2" @click="nextStep()">next</button>
    </div>
</template>
