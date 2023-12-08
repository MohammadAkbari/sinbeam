<script setup lang="ts">
import type { array } from '@amcharts/amcharts5';
import { computed } from '@vue/reactivity';
import { reactive } from 'vue';

export interface Props {
  modelValue?: [];
  min?:number;
  max?:number;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: [10, 100],
  min:0,
  max:0
});

const emit = defineEmits(['update:modelValue']);


const state = computed({
  get: () => props.modelValue,
  set: (val) => {
   emit('update:modelValue', val);},
});

</script>

<template>
  <div class="row">
    <vue-simple-range-slider v-model="state" active-bar-color="#125CCB" significant-figures="1"
      bar-color="#E4E4E4" :min="props.min" :max="props.max">
    </vue-simple-range-slider>
  </div>
  <div class="row">
    <div class="d-flex justify-content-between">
      <span class="fs-12 fw-500 px-3" style="color: #3F3F3F;">Min</span>
      <span class="fs-12 fw-500 px-3" style="color: #3F3F3F;">Max</span>
    </div>
  </div>
</template>

<style>
.simple-range-slider .simple-range-slider-bg-bar .simple-range-slider-anchor {
  width: 15px;
  height: 15px;
  position: absolute;
  top: -6.5px;
  background: #125CCB !important;
  box-shadow: 0 0 4px 3px #0003;
  border-radius: 8px;
}
.simple-range-slider 
.simple-range-slider-bg-bar{
margin-bottom: 3px !important;
}
</style>
