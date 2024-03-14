<script setup lang="ts">
import { RouterView } from 'vue-router';

import BusyIndicator from '@/shared/newComponents/busyIndicator.vue';
</script>

<template>  


  <BusyIndicator :isShow="true"/>
  <RouterView />
</template>


