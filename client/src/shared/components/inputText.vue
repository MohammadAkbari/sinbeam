<script setup lang="ts">

import { computed } from '@vue/reactivity';

export interface Props {
  modelValue: any;
  label?: string;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: null,
  label: ''
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
  <div class="mb-3 row">
    <label class="col-sm-3 col-form-label">{{ label }} : </label>
    <div class="col-sm-9">
      <input type="text" v-model="text" class="form-control" />
    </div>
  </div>
</template>

<style scoped></style>
