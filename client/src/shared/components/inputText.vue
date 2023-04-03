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
  <div style="width:100%">
    <div class="form-group">
      <div class="row">
        <label v-if="label!=''" for="colFormLabelSm" class="col-sm-3 col-form-label col-form-label-sm">{{ label }} : </label>
        <v-text-field :class= "`${label=='' ?'col-sm-12' : 'col-sm-9' }`" density="compact" v-model="text" clearable variant="solo"></v-text-field>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
