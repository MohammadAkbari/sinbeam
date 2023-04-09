<script setup lang="ts">

import { computed, ref } from '@vue/reactivity';

export interface Props {
  modelValue: string;
  label?: string;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
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
    <label v-if="label!=''" class="col-sm-3 col-form-label">{{ label }} : </label>
    <div class="col-sm-9">
      {{ text }}
      <textarea v-model="text" :class="`form-control ${label=='' ?'col-sm-12' : 'col-sm-9' }`" rows="3"></textarea>
    </div>
  </div>

<!-- 
  <div class="mb-3">
    <label v-if="label!=''" class="form-label col-sm-3">{{ label }} : </label>
    <textarea :class="`form-control ${label=='' ?'col-sm-12' : 'col-sm-9' }`" rows="3"></textarea>
  </div> -->

<!-- 
  <div style="width:100%; padding-bottom: 7px;">
    <div class="form-group">
      <div class="row">
        <label v-if="label!=''" for="colFormLabelSm" class="col-sm-2 col-form-label col-form-label-sm">{{ label }} : </label>
        <input type="textarea" v-model="text" style="max-width: 300px" :class="`${label=='' ?'col-sm-12' : 'col-sm-10' }`"/>
      </div>
    </div>
  </div> -->
</template>

<style scoped></style>
