<script setup lang="ts">
import GeneralDetails from '@/models/generalDetails';
import inputText from '@/shared/components/inputText.vue';
import { reactive } from 'vue';


const generalDetails = reactive({} as GeneralDetails)

</script>

<template>
    <div class="row justify-content-center">
        <div class="col-md-6 col-lg-4">
            <div class="form-group">
                <inputText label="Company" v-model="generalDetails.company" />
            </div>
            <div class="form-group">
                <inputText label="Project" v-model="generalDetails.project" />
            </div>
            <div class="form-group">
                <inputText label="Beam" v-model="generalDetails.beam" />
            </div>
            <div class="form-group">
                <inputText label="Designer" v-model="generalDetails.designer" />
            </div>
            <div class="form-group">
                <inputText label="Notes" v-model="generalDetails.notes" />
            </div>
        </div>

    </div>
</template>
