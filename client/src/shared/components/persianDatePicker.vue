<script setup lang="ts">
import { computed } from '@vue/reactivity';
// import Vue3PersianDatetimePicker from 'vue3-persian-datetime-picker';

export interface Props {  
  modelValue:string;
  isDisabled?: boolean;
  isClearable?: boolean;
  label:string;
}

const props = withDefaults(defineProps<Props>(), {
    isDisabled: false,
    isClearable:false,
    label:'تاریخ'
});

const emit = defineEmits(['changed','update:modelValue']);

const date = computed({
      get: () => {
        const val = props.modelValue.trim()== '-' ?'': props.modelValue.trim();       
        return val as string;
      },
      set: (val) => {       
        emit('update:modelValue', val);
        emit('changed',val);
      },
    }); 

</script>

<template>
  <div style="width:100%">
    <custom-date-picker    
        v-model="date"
        :disabled="props.isDisabled"
        :clearable="isClearable"        
        :label="label"   
        convertNumbers="true"
        input-class="form-control form-control-lg"
        auto-submit/>
  </div>
</template>
