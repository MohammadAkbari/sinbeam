<script setup lang="ts">

import { NewTabItems } from '@/enums/newTabItems';
import { computed } from '@vue/reactivity';
// import TabItems from '@/enums/tabItems.ts';
import { defineAsyncComponent, provide, ref } from 'vue';
import ApiService from '@/core/services/api.service';
import type Link from '@/models/link';

const list = [
  {
    value: 1,
    title: "General Details"
  },
  {
    value: 2,
    title: "Define Section"
  },
  {
    value: 3,
    title: "Loading"
  },
  {
    value: 4,
    title: "Analysis"
  },
  {
    value: 5,
    title: "Verifications"
  },
  {
    value: 6,
    title: "Design"
  }
];

const changeTab = (value: number) => {
  seletedTab.value = value;
}

const seletedTab = ref(1 as NewTabItems);
const topSeletedTab = ref(1 as NewTabItems);
const reRenderTab = ref(1 as NewTabItems);



const links = ref([] as Link[]);

const nextStep = () => {
  seletedTab.value++;

  if (seletedTab.value > topSeletedTab.value)
    topSeletedTab.value = seletedTab.value;
}


const clearForm = () => {
  reRenderTab.value++;
}




const saveLinks = (newLinks) => {
  links.value.push(...(newLinks.filter(e => !links.value.some(q => q.rel == e.rel))));

  console.log(links.value)
}


provide('apiServise', new ApiService)

const tabComponent = computed(() => {
  switch (+seletedTab.value) {
    case +NewTabItems.GeneralDetails:
      return defineAsyncComponent(() => import('./tabs/generalDetails.vue'));
    case +NewTabItems.DefineSection:
      return defineAsyncComponent(() => import('./tabs/defineSection.vue'));
    case +NewTabItems.Loading:
      return defineAsyncComponent(() => import('./tabs/loading.vue'));
    case NewTabItems.Analysis:
      return defineAsyncComponent(() => import('./tabs/analysis.vue'));  
    case NewTabItems.Verifications:
      return defineAsyncComponent(() => import('./tabs/verifications.vue'));  
    case NewTabItems.Design:
      return defineAsyncComponent(() => import('./tabs/design.vue'));    
    default: return '';
  }
});

</script>


<template>
  <div class="container-fluid overflow-auto " style="height: 100vh;">
  <div class="row bg-basic h-100">
    <div class="d-flex flex-column" style="width: 20%;">
      <div class="bg-box-primary sin-rounded  h-100 shadow-sm my-2">
        <a href="/" class="d-flex flex-column pt-5 pb-4 me-md-auto text-decoration-none" style="padding-left: 1.5rem;">
          <div class="d-flex align-items-center pb-2">
            <!-- <img class="sin-logo me-2" src="@/assets/img/Logo-text.png" alt=""> -->
            <img class="sin-logo me-2" src="@/assets/img/logo.png" />
            <span class="pt-1 text-black fs-18" style="font-weight: 500; opacity: 0.87;">SinDesigner LOGO</span>
          </div>
          <span class="fs-16" style="color: #9B9B9B;font-weight: 400;">SINdesigner version 1.0.0</span>
        </a>
        <ul class="nav nav-pills flex-column mb-auto ">
          <li v-for="(item, index) in list" :key="index" @click="changeTab(item.value)">
            <span
              :class="`sin-nav-item ${item.value == seletedTab ? 'active' : ''} ${item.value < seletedTab ? 'done' : ''}`">
              <span class="fs-16" :style="`font-weight: ${item.value == seletedTab ? '600' : '400'}`">{{ item.title
              }}</span>
            </span>
          </li>
        </ul>
      </div>
    </div>
    <div class="d-flex flex-column overflow-auto ps-0" style="height: 100vh;width: 80%;">
      <div class="w-100 py-2">
        <div class="row">
          <div class="col-lg-2">
            <a href="#" class="d-flex justify-content-center" style="height: 72px;">
              <div class="bg-box-primary sin-rounded w-100 h-100 fs-12 d-flex align-items-center px-2 shadow-sm"
                style="margin: 0 auto;">
                <img src="@/assets/img/home-text.png" alt="" style="margin: 0 auto;">
                </div>
              </a>
            </div>
            <div class="col-lg-10 ps-0">
              <div class="d-flex justify-content-start" style="height: 72px;">
                <div
                  class="bg-box-primary sin-rounded w-100 h-100 d-flex align-items-center px-2 justify-content-between shadow-sm">
                  <div class="d-flex fs-12">
                    <img class="mt-2" style="width: 42px; height: 42px;" src="@/assets/img/user.png" />
                    <div class="d-flex flex-column px-2 justify-content-center">
                      <span class="fs-14" style="font-weight: 500;">profile panel</span>
                      <span class="fs-10"> 25% is xompleted</span>
                    </div>
                  </div>
                  <div class="d-flex fs-10">
                    <a href="#" class="px-2 mx-2 py-1 bg-box-primary sin-rounded justify-content-center"
                      style="height: 35px; background-color: #f4f4f491;">
                      <img src="@/assets/img/help-text.png" style="width: 95%;" alt="">

                    </a>
                    <a hewf="#" class="px-2 mx-2 py-1 bg-basic shadow-sm sin-rounded justify-content-center"
                      style="height: 35px;">
                      <img src="@/assets/img/whatsApp-text.png" style="width: 95%;" alt="">
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row ps-1 h-100">
          <component :is="tabComponent" :hasCreated="topSeletedTab == seletedTab" :links='links' :key="reRenderTab"
            @saveLinks="saveLinks($event)" @nextStep="nextStep" @clearForm="clearForm">
            <!-- <div class="row">
              <div class="col-md-12">
                <div class="d-grid gap-2 d-md-flex justify-content-md-end mt-5 mb-3">
                  <button class="btn me-md-2 shadow-sm btn-light fs-12 sin-rounded bg-box-primary text-primary"
                    type="button" style="width: 120px;">Clear All</button>
                  <button class="btn btn-primary fs-12 sin-rounded" type="button" style="width: 120px;">Next</button>
                </div>
              </div>
            </div> -->
          </component>        
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>