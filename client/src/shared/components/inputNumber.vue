<script setup lang="ts">

import { computed } from '@vue/reactivity';

export interface Props {
  modelValue: any;
  label?: string;
  labelWidth:number
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: null,
  label: 'مقدار',
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
   <!-- <div class="mb-3 row">
    <label class="col-sm-3 col-form-label">{{ label }} : </label>
    <div class="col-sm-9">
      <input type="number" v-model.number="text" class="form-control" />
    </div>
  </div> -->


  <div class="mb-3 row " style="margin-bottom: 1px!important">
    <label :class="`col-sm-${props.labelWidth} col-form-label`" style="padding-right: 0px;">{{ label }} :</label>
    <div :class="`col-sm-${12-props.labelWidth}`">
      <input type="number" v-model.number="text" class="form-control form-control-sm" />
    </div>
  </div>


  <!-- <div style="width:100%">
    <div class="form-group">
      <div class="row">
        <label v-if="label!=''" for="colFormLabelSm" class="col-sm-3 col-form-label col-form-label-sm">{{ label }} : </label>
        <input type="number" v-model.number="text" style="max-width: 200px" :class= "`${label=='' ?'col-sm-12' : 'col-sm-9' }`" clearable />
      </div>
    </div>
  </div> -->
</template>

<style scoped></style>
