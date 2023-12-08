
<script setup lang="ts">
import { onMounted, ref } from 'vue';


export interface Props {
    options?: Array<any>;
}

const props = withDefaults(defineProps<Props>(), {
    options: Array<any>
});

let isDropdownOpen = ref(false as boolean);

let selectedOption = props.options[0];

const selectOption = (option) => {
    selectedOption = option;
    isDropdownOpen.value = false;
};


const topStyle = ref('' as string);
const centerStyle = ref('' as string);
const bottomStyle = ref('' as string);

const topWidth =ref(450 as number);
const bottomWidth =ref(300 as number);



onMounted(() => {
    topStyle.value = `'width:${topWidth.value}px; height:35px'`
    centerStyle.value = 'width:50px; height:600px;'
    bottomStyle.value = `'width:${bottomWidth.value}px; height:35px'`
})

</script>

<template>
    <div class="row" style="display: block;">

        <div class="row" :style="`width: ${topWidth}px;margin:0 auto;`">
            <h2><i class="arrow left"></i><span class="fs-16 fw-400">{{topWidth}} mm</span><i class="arrow right"></i></h2>
            <div :style="`height:35px; background-color: #b4b5b5; border: 1px solid #000000;`"></div>
        </div>
        
        <div class="row">
            <div class="centerDiv" :style=" `${centerStyle}`"></div>
        </div>
        <div class="row" :style="`width: ${bottomWidth}px;margin:0 auto;`" >
            <div :style="`height:35px;background-color: #b4b4b4; border: 1px solid #000000;`"></div>
            <h2><i class="arrow left"></i><span class="fs-16 fw-400">{{bottomWidth}} mm</span><i class="arrow right"></i></h2>
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

.centerDiv{
    margin:0 auto;
    background: linear-gradient(to left, #b4b4b4, #b4b4b4 50%, #eee 75%, #b4b4b4 50%);
    border-left: 1px solid #000000;
    border-right: 1px solid #000000;
}
</style>

