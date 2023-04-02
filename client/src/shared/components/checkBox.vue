<script setup lang="ts">

import { computed } from '@vue/reactivity';

export interface Props {
  modelValue: any;
  label?: string;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: null,
  label: 'انتخاب کنید'
});

const emit = defineEmits(['changed', 'update:modelValue']);

const selected = computed({
  get: () => {
    debugger
    const val = props.modelValue;
    return val;
  },
  set: (val) => {
    debugger
    emit('update:modelValue', val);
    emit('changed', val);
  },
});

</script>

<template>
  <div style="width:100%">
    <v-checkbox-btn v-model="selected" :label="label" class="pe-2" >
    </v-checkbox-btn>
  </div>
</template>

<style scoped></style>
