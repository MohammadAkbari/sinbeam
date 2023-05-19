<script setup lang="ts">

const emit = defineEmits(['nextStep']);

const next = () => {
    emit('nextStep');
}
</script>
<template>
    <div style="text-align:center;margin-top:20%">
        <h1 class="blinking">WELCOME</h1>
    </div>


    <div class="row" style="position: absolute;bottom: 70px;right: 75px; justify-content: end; display: flex;width: 100%;">
        <button class="btn btn-primary col col-md-2 mx-2" @click="next()">next</button>
    </div>
<!-- 
        <div class="card-body" style="position: absolute;bottom: 70px;right: 75px;">
            
            <button class="btn btn-primary col col-md-2 mx-2"  @click="next()">
                next</button>
    </div> -->
</template>
<style scoped>
.blinking {
    animation: blinkingText 30s infinite;
}

@keyframes blinkingText {
    0% {
        color: #39b54a;
    }

    49% {
        color: #0054a6;
    }

    50% {
        color: #f7941d;
    }

    99% {
        color: #605ca8;
    }

    100% {
        color: #39b54a;
    }

}

h1 {
    font-size: 70px
}
</style>