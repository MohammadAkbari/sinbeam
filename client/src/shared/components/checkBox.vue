<script setup lang="ts">

import { computed } from '@vue/reactivity';

export interface Props {
  modelValue: any;
  label?: string;
  name: string;
  labelWidth:number;
  disabled:boolean;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: null,
  labelWidth:3,
  disabled : false
});

const emit = defineEmits(['changed', 'update:modelValue']);

const selected = computed({
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
    <div class="form-check">

      <label v-if="label" :class="`col-sm-${props.labelWidth} form-check-label`" :for="name">
        {{ label }}
      </label>
      <input class="form-check-input" type="checkbox" :value="selected" :id="name" v-model="selected" :disabled="disabled">
    </div>
</template>

<style scoped></style>
