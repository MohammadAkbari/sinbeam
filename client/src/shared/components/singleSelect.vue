<script setup lang="ts">

export interface Props {
  modelValue:any;
  label?: string;
  value?: string;
  title?: string;
  items: any[];
}

const props = withDefaults(defineProps<Props>(), {
  msg: 'انتخاب کنید',
  label:'انتخاب کنید',
  value:'id',
  title:'title',
});

const emit = defineEmits(['changed','update:modelValue']);

const changeRoute =function(event:any){
  emit('changed',event);
  emit('update:modelValue',props.items.find(e=>e[props.value] == event));
}
</script>

<template>
  <div style="width:100%">

    <!-- <q-select
      :dense="true"
      filled 
      emit-value
      v-model="props.modelValue"
      :options="props.items"     
      :option-value="props.value"
      :option-label="props.title"
      @update:modelValue="changeRoute"
      
      clearable/> -->

    <!-- <v-select
      v-model="props.modelValue"   
      :items="props.items"
      :item-title="props.title"
      :item-value="props.value"
      :label="props.label"
      variant="solo"
      @update:modelValue="changeRoute"
      clearable
  ></v-select>   -->
  </div>
</template>

<style scoped>

</style>
