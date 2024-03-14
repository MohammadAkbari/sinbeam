<template>
    <div v-if="isShow" class="loading-back">
        <div style="display: flex;justify-content: center;align-items: center;margin-top: 20%;position: relative;">
            <span class="loader"></span>
            <img class="loading-img" src="@/assets/img/loading.svg" alt="">
        </div>

    </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import {useCounterStore} from '@/stores/counter';


const store = useCounterStore();
const isShow = computed(() => store.isShowBusyIndicator );
</script>

<style scoped>
.loading-back {
    background-color: rgba(255, 255, 255, 0.69);
    display: flex;
    position: fixed;
    z-index: 1000000;
    top: -35%;
    right: 0;
    bottom: 0;
    left: 0;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 0.625em;
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
}
</style>
