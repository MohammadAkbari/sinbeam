<script setup lang="ts">

import { Step } from '@/enums/step';
import { computed } from '@vue/reactivity';
// import TabItems from '@/enums/tabItems.ts';
import { defineAsyncComponent, inject, onMounted, provide, ref } from 'vue';
import ApiService from '@/core/services/api.service';
import type Link from '@/models/link';
import config from '@/shared/globals/config';
import Swal from "sweetalert2";
import type ApiServise from '@/core/services/api.service';
import { RouterView, useRoute, useRouter } from 'vue-router';



const apiServise = inject('apiServise') as ApiServise;

const list = [
  {
    value: Step.GeneralDetails,
    title: "General Details",
    route: 'generalDetails'

  },
  {
    value: Step.DefineSection,
    title: "Define Section",
    route: 'defineSection'
  },
  {
    value: Step.Loading,
    title: "Loading",
    route: 'loading'
  },
  {
    value: Step.Analysis,
    title: "Analysis",
    route: 'analysis'
  },
  {
    value: Step.Verification,
    title: "Verifications",
    route: 'verifications'
  },
  {
    value: Step.Design,
    title: "Design",
    route: 'design'
  }
];

const changeTab = (tab) => {

  if(topSeletedTab.value.value>= tab.value){
    router.push({ name: tab.route })
  }else{
    Swal.fire('not accessible')
  }

}

const seletedTab =  computed(()=>{ 
  const currentRouteName = router.currentRoute.value.name;
  return list.find(e=>e.route == currentRouteName);
});

const topSeletedTab =ref(list[0]);
const reRenderTab = ref(1 as Step);



const links = ref([] as Link[]);

const id = computed(()=>useRoute().params.id);


onMounted(async () => {

  const data = await apiServise.get(config + (id.value ? `?id=${id.value}` : ''));
  saveLinks(data._links);
})

const router = useRouter()

const nextStep = (currentId) => {

  debugger

  const step = +seletedTab.value.value; 
  const tab = list.find(e => e.value == step+1);

  if (tab){
    if(topSeletedTab.value.value < tab.value){
      topSeletedTab.value = tab;
    }
  }

  router.push({ name: tab.route,params:{id: +id.value == 0 ? currentId : id.value} });
}


const clearForm = () => {
  reRenderTab.value++;
}

const saveLinks = (newLinks) => {
  if (newLinks) {
    let newList = links.value.filter(e => !newLinks.some(q => q.rel == e.rel));
    links.value = [...newList, ...newLinks];
    console.log(links.value)
  }
  // links.value.push(...(newLinks.filter(e => !links.value.some(q => q.rel == e.rel))));
}


provide('apiServise', new ApiService)

const tabComponent = computed(() => {
  switch (+seletedTab.value.value) {
    case +Step.GeneralDetails:
      return defineAsyncComponent(() => import('./tabs/generalDetails.vue'));
    case +Step.DefineSection:
      return defineAsyncComponent(() => import('./tabs/defineSection.vue'));
    case +Step.Loading:
      return defineAsyncComponent(() => import('./tabs/loading/loading.vue'));
    case Step.Analysis:
      return defineAsyncComponent(() => import('./tabs/analysis.vue'));
    case Step.Verification:
      return defineAsyncComponent(() => import('./tabs/verifications.vue'));
    case Step.Design:
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
              <span class="pt-1 text-black fs-18" style="font-weight: 500; opacity: 0.87;">SinDesigner</span>
            </div>
            <!-- <span class="fs-16" style="color: #9B9B9B;font-weight: 400;">version 1.0.0</span> -->
          </a>
          <ul class="nav nav-pills flex-column mb-auto ">
            <li v-for="(item, index) in list" :key="index" @click="changeTab(item)">
              <span
                :class="`sin-nav-item ${item.value == seletedTab.value ? 'active' : ''} ${item.value < seletedTab.value ? 'done' : ''}`">
                <span class="fs-16" :style="`font-weight: ${item.value == seletedTab.value ? '600' : '400'}`">{{ item.title
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
                      <span class="fs-10"> 25% is completed</span>
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
          <transition>
            <component :is="tabComponent"              
              :id="id"
              :links='links' :key="reRenderTab"
              @saveLinks="saveLinks" @nextStep="nextStep" @clearForm="clearForm">
            </component>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>