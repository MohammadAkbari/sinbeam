<script setup lang="ts">

import { LoadType } from '@/enums/loadType';
import type LoadingDto from '@/models/loadingDto';
import { computed, ref } from '@vue/reactivity';
import { onMounted, watch } from 'vue';

export interface Props {
  loadingDto: LoadingDto;
  reRenderShape: Number;
}

const props = withDefaults(defineProps<Props>(), {
});

onMounted(() => {
  watch(() => props.reRenderShape, () => {
    updateShape();
  }, { deep: true, immediate: true })
})

const loadTypeCharacteristicLoads = LoadType.CharacteristicLoads;

const leftWidth = ref(0 as number);
const centerWidth = ref(0 as number);

const isNullOrUndefinedOrEmpty = (val) => val == null || val == undefined || val === ' ' || val === '';

const updateShape = () => {

  if (props.loadingDto.loadType == loadTypeCharacteristicLoads) {
    if (props.loadingDto.permanentLoads.partialUdl
      && props.loadingDto.permanentLoads.partialUdlStart >= 0
      && props.loadingDto.permanentLoads.partialUdlStart <= props.loadingDto.span
      && props.loadingDto.permanentLoads.partialUdlEnd >= 0
      && props.loadingDto.permanentLoads.partialUdlEnd <= props.loadingDto.span
      && props.loadingDto.permanentLoads.partialUdlStart < props.loadingDto.permanentLoads.partialUdlEnd) {


      leftWidth.value = props.loadingDto.permanentLoads.partialUdlStart * 100 / props.loadingDto.span;
      centerWidth.value = (props.loadingDto.permanentLoads.partialUdlEnd - props.loadingDto.permanentLoads.partialUdlStart) * 100 / props.loadingDto.span;
    } else {
      leftWidth.value = 0
      centerWidth.value = 0
    }
  } else {
    if (props.loadingDto.ultimateLoads.partialUdl
      && props.loadingDto.ultimateLoads.partialUdlStart >= 0
      && props.loadingDto.ultimateLoads.partialUdlStart <= props.loadingDto.span
      && props.loadingDto.ultimateLoads.partialUdlEnd >= 0
      && props.loadingDto.ultimateLoads.partialUdlEnd <= props.loadingDto.span
      && props.loadingDto.ultimateLoads.partialUdlStart < props.loadingDto.ultimateLoads.partialUdlEnd) {

      leftWidth.value = props.loadingDto.ultimateLoads.partialUdlStart * 100 / props.loadingDto.span;
      centerWidth.value = (props.loadingDto.ultimateLoads.partialUdlEnd - props.loadingDto.ultimateLoads.partialUdlStart) * 100 / props.loadingDto.span;
    } else {
      leftWidth.value = 0
      centerWidth.value = 0
    }
  }
}

const ultimatePoints = computed(() => {

  if (props.loadingDto.loadType == loadTypeCharacteristicLoads) {
    if (props.loadingDto.characteristicPointLoads)
      return props.loadingDto.characteristicPointLoads
        .filter(e => e.position >= 0 && e.position <= props.loadingDto.span)
        .filter(e => !isNullOrUndefinedOrEmpty(e.position))
        .filter(e => !isNullOrUndefinedOrEmpty(e.permanentAction) || !isNullOrUndefinedOrEmpty(e.variableAction))
        .map(e => e.position * 100 / props.loadingDto.span);

  } else {
    if (props.loadingDto.ultimatePointLoads)
      return props.loadingDto.ultimatePointLoads
        .filter(e => e.position >= 0 && e.position <= props.loadingDto.span)
        .filter(e => !isNullOrUndefinedOrEmpty(e.position))
        .filter(e => !isNullOrUndefinedOrEmpty(e.load))
        .map(e => e.position * 100 / props.loadingDto.span)


    return [];
  }
});

const closeValue = (point) : number=>{
  return point * 100 / props.loadingDto.span;
}

</script>

<template>
  <div
    style="box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;border-radius: 15px;padding: 15px; position: relative; height: 150px;">

    <div style="margin: 5px 50px; height: 15px">
      <div :style="`width :${leftWidth}%;height:100%;display: inline-block`"></div>
      <div :style="`width :${centerWidth}%;background-color: #fdc3c3;height:100%;display: inline-block`"></div>
      <!-- <div :style="`width :${rightWidth}%;height:100%;display: inline`"></div> -->
    </div>

    <div style="margin: 5px 50px; position: relative;">
      <div v-for="(item, index) in ultimatePoints" :key="index"
        :style="`position:absolute; bottom:-20px;left: ${item}%;`">
        <img src="@/assets/img/bottom.png" style="margin: -2px; height: 55px;">
      </div>
    </div>

    <div
      v-if="loadingDto.loadType == loadTypeCharacteristicLoads ? loadingDto.permanentLoads.udl : loadingDto.ultimateLoads.udl"
      style="background-color: #94fdd6; margin: 5px 50px; height: 15px"></div>
    <div v-else style="margin: 5px 50px; height: 15px"></div>

    <span
      v-if="loadingDto.loadType == loadTypeCharacteristicLoads ? loadingDto.permanentLoads.endMomentLeft : loadingDto.ultimateLoads.endMomentLeft"
      style="color: red; position: absolute; top: 70px; left: 50px;">
      <img src="@/assets/img/ss.png" style="height: 40px;">
    </span>
    <span
      v-if="loadingDto.loadType == loadTypeCharacteristicLoads ? loadingDto.permanentLoads.endMomentRight : loadingDto.ultimateLoads.endMomentRight"
      style="color: red; position: absolute; top: 70px; right: 50px;">
      <img src="@/assets/img/ss.png" style="height: 40px;">
    </span>

    <span
      v-if="loadingDto.loadType == loadTypeCharacteristicLoads ? loadingDto.permanentLoads.axialForce : loadingDto.ultimateLoads.axialForce"
      style="color: red; position: absolute; top: 77px; right: 35px;">
      <img src="@/assets/img/left.png" style="height: 22px;">
    </span>

    <span
      v-if="loadingDto.loadType == loadTypeCharacteristicLoads ? loadingDto.permanentLoads.axialForce : loadingDto.ultimateLoads.axialForce"
      style="color: red; position: absolute; top: 77px; left: 35px;">
      <img src="@/assets/img/right.png" style="height: 22px;">
    </span>

    <div style="margin:5px 50px; position: relative; " v-if="!loadingDto.fullRestraintTopFlange">
      <div v-for="(item, index) in loadingDto.topFlangeRestraints" :key="index"
        :style="`position:absolute; top:-11px; left: ${closeValue(item)}%;`">
        <span class="fa fa-close" :style="`color: red; margin-left: ${(((closeValue(item)/100) * 2)+5)*-1}px;`"></span>
      </div>
    </div>
     <div style="margin:5px 50px; position: relative; top:58px " v-if="!loadingDto.fullRestraintBottomFlange">
      <div v-for="(item, index) in loadingDto.bottomFlangeRestraints" :key="index"
        :style="`position:absolute; top:-11px; left: ${closeValue(item)}%;`">
        <span class="fa fa-close" :style="`color: red; margin-left: ${(((closeValue(item)/100) * 2)+5)*-1}px;`"></span>
      </div>
    </div>

   <!-- <span class="fa fa-close" style="color: red; position: absolute; top: 55px; right: 61px;"></span> -->

    <!-- <span class="fa fa-close" style="color: red; position: absolute; top: 112px; left: 60px;"></span>
    <span class="fa fa-close" style="color: red; position: absolute; top: 112px; right: 61px;"></span> -->

    <div style="border: solid; margin: auto auto; height: 60px; margin: 0 50px; border-width: 2px ">


    </div>

    <div class="row" style="padding: 0 50px;">
      <div style="width: 48%;">
        <hr class="arrow left">
      </div>
      <div style="width: 4%; padding: 5px 5px; text-align: center; font-size: 14px;">{{ loadingDto.span }}</div>
      <div style="width: 48%;">
        <hr class="arrow">
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
$page-color: #eee;
$arrow-color: #0af;
$arrow-size: 6px;


.left {
    transform: rotate(180deg);
}

// Where the magic happens
.arrow {

    max-width: 100%;
    height: $arrow-size * 2;
    margin: 1em auto;
    border: 0;
    position: relative;
    overflow: hidden;
    background-image: linear-gradient($page-color $arrow-size - $arrow-size / 3,
            $arrow-color $arrow-size - $arrow-size / 3,
            $arrow-color $arrow-size + $arrow-size / 3,
            $page-color $arrow-size + $arrow-size / 3);
}

.arrow:before,
.arrow:after {
    content: "";
    position: absolute;
}

.arrow:after {
    right: -$arrow-size;
    border: $arrow-size solid;
    border-color: $page-color $page-color $page-color $arrow-color;
}



// Base stuff; pay no mind
html {
    background-color: $page-color;
}

p {
    text-align: center;
}
</style>

