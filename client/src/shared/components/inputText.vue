<script setup lang="ts">

import { computed } from '@vue/reactivity';

export interface Props {
  modelValue: any;
  label?: string;
  labelWidth? : number
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: null,
  label: '',
  labelWidth:3
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
  <div class="mb-3 row " style="margin-bottom: 1px!important">
    <label :class="`col-sm-${props.labelWidth} col-form-label`" style="padding-right: 0px;">{{ label }} :</label>
    <div :class="`col-sm-${12-props.labelWidth}`">
      <input type="text" v-model="text" class="form-control form-control-sm" />
    </div>
  </div>
</template>

<style scoped></style>
