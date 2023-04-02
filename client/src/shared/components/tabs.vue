<script setup lang="ts">
import { TabItems } from '@/enums/tabItems';
import { computed } from '@vue/reactivity';

export interface Props {
  modelValue:number;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue : TabItems.GeneralDetails
});
const emit = defineEmits(['changed','update:modelValue']);

const selected = computed({
      get: () => {
        const val = props.modelValue;       
        return val;
      },
      set: (val) => { 
        emit('update:modelValue', val);
        emit('changed',val);
      },
    });
</script>
<template>
    <v-card>
        <v-tabs bg-color="grey-lighten-1" v-model="selected" center-active>
            <v-tab value="1">General Details</v-tab>
            <v-tab value="2">Localisation</v-tab>
            <v-tab value="3">Beam</v-tab>
            <v-tab value="4">Properties</v-tab>
            <v-tab value="5">Loading</v-tab>
            <v-tab value="6">Analysis results</v-tab>
            <v-tab value="7">Restraints</v-tab>
            <v-tab value="8">Top flange verification</v-tab>
            <v-tab value="9">Bottom flange verification</v-tab>
            <v-tab value="10">Web verification</v-tab>
            <v-tab value="11">Design</v-tab>
            <v-tab value="12">Output</v-tab>
        </v-tabs>
    </v-card>
</template>
<style scoped></style>