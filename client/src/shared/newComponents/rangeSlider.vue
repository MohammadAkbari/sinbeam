<script setup lang="ts">
import MultiRangeSlider from "multi-range-slider-vue";
import "multi-range-slider-vue/MultiRangeSliderBlack.css";
import "multi-range-slider-vue/MultiRangeSliderBarOnly.css";


export interface Props {
  min?:number;
  max?:number;
}

const maxValue = defineModel('maxValue')
const minValue = defineModel('minValue')



const props = withDefaults(defineProps<Props>(), {

  min:0,
  max:0
});

// const state = computed({
//   get: () => props.modelValue,
//   set: (val) => {
//    emit('update:modelValue', val);},
// });


const UpdateValues = (value)=>{
  maxValue.value = +value.maxValue
  minValue.value = +value.minValue 

}

</script>

<template>  
  <div class="row">
    <div class="col-12" style="margin: auto;">
      <MultiRangeSlider
      baseClassName="multi-range-slider-bar-only"
      :minValue="minValue"
      :maxValue="maxValue"
      :max="props.max"
      :min="props.min"
      :step="0.5"
      :rangeMargin="0"  
      active-bar-color="#125CCB"    
      bar-color="#E4E4E4" 
      @input="UpdateValues"
    />
    </div>
    

    <!-- <vue-simple-range-slider v-model="state" active-bar-color="#125CCB" significant-figures="1"
      bar-color="#E4E4E4" :min="props.min" :max="props.max">
    </vue-simple-range-slider> -->
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
  background: #3d0e00 !important;
  box-shadow: 0 0 4px 3px #0003;
  border-radius: 8px;
}
.simple-range-slider 
.simple-range-slider-bg-bar{
margin-bottom: 3px !important;
}

.multi-range-slider-bar-only .bar-inner{
  background-color: #0505ff;
    display: flex;
    flex-grow: 1;
    flex-shrink: 1;
    justify-content: space-between;
    position: relative;
    /* border: solid 1px black; */
    justify-content: space-between;
    box-shadow:none
}
.multi-range-slider-bar-only.zero-ranage-margin .thumb-left {
    right: 0px;
}
.multi-range-slider-bar-only.zero-ranage-margin .thumb-right {
    left: 0px;
}
</style>
