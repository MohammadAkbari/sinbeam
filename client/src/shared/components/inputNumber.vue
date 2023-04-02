<script setup lang="ts">

import { computed } from '@vue/reactivity';

export interface Props {
  modelValue: any;
  label?: string;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: null,
  label: 'مقدار'
});

const emit = defineEmits(['changed', 'update:modelValue']);

const text = computed({
  get: () => {
    const val = props.modelValue;
    return val;
  },
  set: (val) => {
    emit('update:modelValue', val);
    emit('changed', val);
  },
});

</script>

<template>
  <div style="width:100%">
    <v-text-field
      v-model="text"
      clearable
      :label="label"
      type="number"
    ></v-text-field>
  </div>
</template>

<style scoped></style>
