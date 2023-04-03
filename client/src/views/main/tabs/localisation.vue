<script setup lang="ts">
import { ref } from 'vue';
import radioGroupButton from '@/shared/components/radioGroupButton.vue';

const desigenItems = [
  { state: 'UK NA', abbr: 'FL' },
  { state: 'Irish NA', abbr: 'GA' },
  { state: 'User defined valued', abbr: 'NE' }
];

const ULDItems = [
  { state: 'Expression 6.10', abbr: 'FL' },
  { state: 'Expression 6.10a and 6.10b', abbr: 'GA' }
];

const desigenItem = ref(undefined);
const uldItem = ref(undefined);

</script>


<template>    
    <radio-group-button v-model="desigenItem" :items="desigenItems" value="abbr" title="state" label="Desigen To"/>
    <radio-group-button v-model="uldItem" :items="ULDItems" value="abbr" title="state" label="ULS Loads calculated to EN 1990"/>
</template>
