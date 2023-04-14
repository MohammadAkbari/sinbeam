<script setup lang="ts">

export interface Props {
  modelValue: any;
  label?: string;
  value?: string;
  title?: string;
  items: any[];
  labelWidth?:number
}

const props = withDefaults(defineProps<Props>(), {
  msg: 'انتخاب کنید',
  label: 'انتخاب کنید',
  value: 'id',
  title: 'title',
  labelWidth:3
});

const emit = defineEmits(['changed', 'update:modelValue']);

const changeRoute = function (event: any) {
  emit('changed',props.items.find(e=>e[props.value] == event.target.value));
  emit('update:modelValue', event.target.value);
}
</script>

<template>
  <div class="mb-3 row " style="margin-bottom: 1px!important">
  <label :class="`col-sm-${props.labelWidth} col-form-label`" style="padding-right: 0px;">{{ label }} : </label>
  <div :class="`col-sm-${12 - props.labelWidth}`">
    <select class="form-select form-select-sm" aria-label=".form-select-sm example" @change="changeRoute($event)">
        <option v-for="(item, index) in props.items" :key="index" :value="item[props.value]"
          :selected="item[props.value] == props.modelValue">{{ item[props.title] }}</option>

    </select>
  </div>
</div>



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

<style scoped></style>
