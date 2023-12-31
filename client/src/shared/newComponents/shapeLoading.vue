
<script setup lang="ts">
import type LoadingDto from '@/dtos/loadingDto';
import { LoadType } from '@/enums/loadType';
import { computed, onMounted, ref } from 'vue';

const isNullOrUndefinedOrEmpty = (val) => val == null || val == undefined || val === ' ' || val === '';

export interface Props {
    loadingDto?: LoadingDto;
    // bottom?: Part;
    // center?: Part;
}
const x = 30;

const loadTypeCharacteristicLoads = LoadType.CharacteristicLoads;

const props = withDefaults(defineProps<Props>(), {});

const leftWidth = computed(() => {
    if (props.loadingDto.loadType == loadTypeCharacteristicLoads) {
        return props.loadingDto.permanentLoads.partialUdlStart * 100 / props.loadingDto.span;
    } else {
        return props.loadingDto.ultimateLoads.partialUdlStart * 100 / props.loadingDto.span;
    }
});

const centerWidth = computed(() => {
    if (props.loadingDto.loadType == loadTypeCharacteristicLoads) {
        return (props.loadingDto.permanentLoads.partialUdlEnd - props.loadingDto.permanentLoads.partialUdlStart) * 100 / props.loadingDto.span;
    } else {
        return (props.loadingDto.ultimateLoads.partialUdlEnd - props.loadingDto.ultimateLoads.partialUdlStart) * 100 / props.loadingDto.span;
    }
});

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

</script>

<template>
    <div v-if="true">
       


        <div class="mx-5">
            <div
                :style="`margin-left: ${leftWidth}%; width :${centerWidth}%;background-color: #B7CFF3;height:15px;display: inline-block`">
            </div><!-- udl-->
            <div v-if="props.loadingDto.loadType == loadTypeCharacteristicLoads ? props.loadingDto.permanentLoads.udl : props.loadingDto.ultimateLoads.udl"
                class="my-1" style="height: 15px; background-color: #DEEBFF; opacity: 78%;"></div> <!-- udl-->
        </div>
        <div class="mx-5 position-relative"> <!-- arrow-->
            <div v-for="(item, index) in ultimatePoints" :key="index" class="position-absolute"
                :style="`left: ${item}%;top:-39px;padding-right:10px`">
                <img src="@/assets/img/arrow-bottom.png" class="position-absolute" style="left: -8px;">
            </div>

        </div>
        <div class="mx-5" style="margin:0 auto;border: 1px solid black; height: 100px;">
            <div> <!-- row line -->
                <div class="position-relative" style="margin: 0 auto;">
                    <span style="top: -8px; left: -36px; color: #9C9C9C;" class="position-absolute fs-12 fw-500">%80</span>
                    <hr style="margin-top: 19px !important; margin-bottom:0 !important">
                </div>
                <div class="position-relative">
                    <span style="top: -8px; left: -36px; color: #9C9C9C;" class="position-absolute fs-12 fw-500">%60</span>
                    <hr style="margin-top: 19px !important; margin-bottom:0 !important">
                </div>
                <div class="position-relative">
                    <span style="top: -8px; left: -36px; color: #9C9C9C;" class="position-absolute fs-12 fw-500">%40</span>
                    <hr style="margin-top: 19px !important; margin-bottom:0 !important">
                </div>
                <div class="position-relative">
                    <span style="top: -8px; left: -36px; color: #9C9C9C;" class="position-absolute fs-12 fw-500">%20</span>
                    <hr style="margin-top: 19px !important; margin-bottom:0 !important">
                </div>
                <div class="position-relative">
                    <span style="top: -88px; left: -40px; color: #9C9C9C;"
                        class="position-absolute fs-12 fw-500">%100</span>
                </div>
                <div class="position-relative">
                    <span style="top: 10px; left: -33px; color: #9C9C9C;" class="position-absolute fs-12 fw-500">%0</span>
                </div>
            </div>

            <div class="position-relative"> <!-- close icons -->
                <span class="fa fa-2x fa-close position-absolute" style="color: #125CCB; top:0.56rem;left:-0.8rem"></span>
                <span class="fa fa-2x fa-close position-absolute" style="color: #125CCB; top:0.56rem;right:-0.8rem"></span>
                <span class="fa fa-2x fa-close position-absolute" style="color: #125CCB; bottom:5.68rem;left:-0.8rem"></span>
                <span class="fa fa-2x fa-close position-absolute" style="color: #125CCB; bottom:5.68rem;right:-0.8rem"></span>
            </div>


           


        </div>

        <div class="mx-5 py-4">
                <h2><i class="arrow left"></i><span class="fs-16 fw-400">{{ props.loadingDto.span }} mm</span><i class="arrow right"></i></h2>
        </div>



    </div>
</template>
<style scoped>
h2 {
    width: 100%;
    text-align: center;
    border-bottom: 4px solid #000;
    line-height: 3px;
    margin: 10px 0 20px;
    position: relative;
}

h2 span {
    background: #fff;
    padding: 0 10px;
}

.arrow {
    border: solid black;
    border-width: 0 4px 4px 0;
    display: inline-block;
    padding: 4px;
    position: absolute;
    top: 0.16rem;

}

.right {
    transform: rotate(-45deg);
    -webkit-transform: rotate(-45deg);
    right: 0;
}

.left {
    transform: rotate(135deg);
    -webkit-transform: rotate(135deg);
    left: 0;
}

.top {
    transform: rotate(45deg);
    -webkit-transform: rotate(45deg);
    left: 0;
}

.bottom {
    transform: rotate(225deg);
    -webkit-transform: rotate(225deg);
    left: 0;
}

.centerDiv {
    margin: 0 auto;
    background: linear-gradient(to left, #b4b4b4, #b4b4b4 50%, #eee 75%, #b4b4b4 50%);
    border-left: 1px solid #000000;
    border-right: 1px solid #000000;
}
</style>

