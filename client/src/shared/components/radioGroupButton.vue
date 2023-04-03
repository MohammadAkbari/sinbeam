<script setup lang="ts">

import { computed } from '@vue/reactivity';
import { ref } from 'vue';


export interface Props {
  modelValue:any;
  label?: string;
  value?: string;
  title?: string;
  items: any[];
}

const props = withDefaults(defineProps<Props>(), { 
  modelValue:null,
  label:'انتخاب کنید',
  value:'id',
  title:'title',
  items:Array<any>
});

 const emit = defineEmits(['changed','update:modelValue']);

 const selected = computed({
      get: () => {
        debugger
        const val = props.modelValue;       
        return val;
      },
      set: (val) => {       
        debugger
        emit('update:modelValue', val);
        emit('changed',val);
      },
    });


</script>

<template>
  <div style="width:100%">    
    <v-radio-group v-model="selected" :label="label" density="compact">
      <v-radio v-for="(item,index ) in props.items" :key="index" :label="item[props.title]" :value="item[props.value]" ></v-radio>
    </v-radio-group>
  </div>
</template>

<style scoped>

</style>
