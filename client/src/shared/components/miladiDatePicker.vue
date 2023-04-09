<script setup lang="ts">
import { computed, ref } from '@vue/reactivity';
import datepicker from 'vue3-datepicker';

export interface Props {
  modelValue: Date;
  isDisabled?: boolean;
  isClearable?: boolean;
  label: string;
}

const props = withDefaults(defineProps<Props>(), {
  isDisabled: false,
  isClearable: false,
  label: 'تاریخ'
});

const emit = defineEmits(['changed', 'update:modelValue']);

const date = ref({
  get: () => {
    return props.modelValue;
  },
  set: (val) => {
    emit('update:modelValue', val);
    emit('changed', val);
  },
});

</script>

<template>
 <datepicker v-model="date" @update:modelValue="" />
</template>
