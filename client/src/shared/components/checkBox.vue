<script setup lang="ts">

import { computed } from '@vue/reactivity';

export interface Props {
  modelValue: any;
  label?: string;
  name: string;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: null,
  label: 'انتخاب کنید'
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
      <label class="form-check-label" :for="name">
        {{ label }}
      </label>
      <input class="form-check-input" type="checkbox" :value="selected" :id="name" v-model="selected">
    </div>
</template>

<style scoped></style>
