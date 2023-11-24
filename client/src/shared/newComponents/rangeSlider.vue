<script setup lang="ts">
import type { array } from '@amcharts/amcharts5';
import { computed } from '@vue/reactivity';
import { reactive } from 'vue';

export interface Props {
  modelValue?: [];
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: [10, 100]
});

const emit = defineEmits(['update:modelValue']);


const state = computed({
  get: () => props.modelValue,
  set: (val) => {console.log(val);
   emit('update:modelValue', val);},
});



// const state = reactive({
//   value: [10, 100],
//   value2: 40,
// });
</script>

<template>
  <div class="row">
    <vue-simple-range-slider v-model="state" exponential active-bar-color="#125CCB"
      bar-color="#E4E4E4" :max="1000000000">
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
