
<script setup lang="ts">
import type Part from '@/models/Part';
import { onMounted, ref } from 'vue';


export interface Props {
    top?: Part;
    bottom?: Part;
    center?: Part;
}
const x = 30;

const props = withDefaults(defineProps<Props>(), {
    // top : Part =>({borderWidth:'',height:50,width:150}),
    // bottom :Part =>({borderWidth:'',height:50,width:150}),
    // center :Part =>({borderWidth:'',height:500,width:50}),
});

</script>

<template>
    <div v-if="props.top && props.center && props.bottom" class="row" style="display: block;">

        <div :style="`width: ${props.top.width}px;margin:0 auto;padding: 0px;`">
            <h2><i class="arrow left"></i><span class="fs-16 fw-400">{{props.top.width}} mm</span><i class="arrow right"></i></h2>
            <div class="position-relative" :style="`height:${props.top.scaledHeight}px; background-color: #b4b5b5; border: 1px solid #000000;`">
                <div class="position-absolute" :style="`width: 10px; border-top: 1px solid black; top: -1px; height: 1px;right: -26px;transform: rotate(45deg)`"></div>     
                <div class="position-absolute" :style="`width: 10px; border-top: 1px solid black; top: ${props.top.scaledHeight-2}px; height: 1px;right: -26px;transform: rotate(45deg)`"></div>  
                <div class="position-absolute" :style="`width: 10px; border-left: 1px solid black; top: -5px; height: ${props.top.scaledHeight+9}px;right: -31px;`"></div>     
                
                <div class="position-absolute" :style="`width: ${x-10}px; border-top: 1px solid black; border-bottom: 1px solid black; top: -1px; height: ${props.top.scaledHeight}px;right: -${x-5}px;`"></div>     
                <span class="position-absolute fs-12" :style="`right: -60px; top: ${(props.bottom.scaledHeight/2)-10}px; transform: rotate(90deg);`">{{ props.top.scaledHeight }} mm</span>
            </div>
          
            
        </div>
        
        <div :style="`width: ${50}px;margin:0 auto;padding: 0px;position:relative;`">             
            <div class="centerDiv" :style="`height:${props.center.scaledHeight}px`"></div>
            <div :style="`width:${props.center.scaledHeight}px;transform: rotate(90deg); position:absolute; right: -60px; top:${(props.center.scaledHeight/2)-20}px`">
                <h2><i class="arrow left"></i><span class="fs-16 fw-400">{{props.center.height}} mm</span><i class="arrow right"></i></h2>
            </div>
    
        </div>
        <div class="position-relative" :style="`width: ${props.bottom.width}px;margin:0 auto;padding: 0px;`" >
            <div :style="`height:${props.bottom.scaledHeight}px;background-color: #b4b4b4; border: 1px solid #000000;`">
                <div class="position-absolute" :style="`width: 10px; border-top: 1px solid black; top: -1px; height: 1px;right: -26px;transform: rotate(45deg)`"></div>     
                <div class="position-absolute" :style="`width: 10px; border-top: 1px solid black; top: ${props.top.scaledHeight-2}px; height: 1px;right: -26px;transform: rotate(45deg)`"></div>  
                <div class="position-absolute" :style="`width: 10px; border-left: 1px solid black; top: -5px; height: ${props.bottom.scaledHeight+9}px;right: -31px;`"></div>     
                
                <div class="position-absolute" :style="`width: ${x-10}px; border-top: 1px solid black; border-bottom: 1px solid black; top: -1px; height: ${props.bottom.scaledHeight}px;right: -${x-5}px;`"></div>     
                <span class="position-absolute fs-12" :style="`right: -60px; top: ${(props.bottom.scaledHeight/2)-10}px; transform: rotate(90deg);`">{{ props.bottom.scaledHeight }} mm</span>
            </div>
            <h2><i class="arrow left"></i><span class="fs-16 fw-400">{{props.bottom.width}} mm</span><i class="arrow right"></i></h2>
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

.centerDiv{
    margin:0 auto;
    background: linear-gradient(to left, #b4b4b4, #b4b4b4 50%, #eee 75%, #b4b4b4 50%);
    border-left: 1px solid #000000;
    border-right: 1px solid #000000;
}
</style>

