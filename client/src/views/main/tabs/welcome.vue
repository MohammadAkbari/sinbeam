<template>
    <div style="text-align:center;margin-top:20%">
        <h1 class="blinking">WELCOME</h1>
    </div>
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