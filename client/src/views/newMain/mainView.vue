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
import { useRoute, useRouter } from 'vue-router';
import newConstants from '@/shared/globals/newConstants';
import type QuestionDto from '@/models/questionDto';



provide('apiServise', new ApiService)


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

  if (topSeletedTab.value.value >= tab.value) {
    router.push({ name: tab.route, params: { id: +route?.params?.id } });
    seletedTab.value = tab;
  } else {
    Swal.fire('not accessible')
  }

}

const seletedTab = ref(list[0]);

const topSeletedTab = ref(list[0]);
const reRenderTab = ref(1 as Step);

const links = ref([] as Link[]);


const flag = ref(false);

const showAskMe = ref(false);

const questionDto = ref({} as QuestionDto);

onMounted(async () => {
  flag.value = false;

  debugger

  const data = await apiServise.get(config + (route?.params?.id ? `?id=${route?.params?.id}` : ''));

  if (route?.params?.id) {
    topSeletedTab.value = list.find(e => e.value == data.step);

    const currentRouteName = router.currentRoute.value.name;
    const tab = list.find(e => e.route == currentRouteName);

    seletedTab.value = tab;

    console.log(123);

    if (tab.value > topSeletedTab.value.value) {
      router.push({ name: topSeletedTab.value.route, params: { id: route?.params?.id } });
      seletedTab.value = topSeletedTab.value;
    }

    flag.value = true;

  }

  saveLinks(data._links);
})



const router = useRouter()

const route=useRoute()

const nextStep = (currentId = null) => {
  const step = +seletedTab.value.value;
  const tab = list.find(e => e.value == step + 1);

  if (tab) {
    if (topSeletedTab.value.value < tab.value) {
      topSeletedTab.value = tab;
    }
  }

  router.push({ name: tab.route, params: { id: (currentId ?? route?.params?.id) } });
  seletedTab.value = tab;
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


const isSaveAskmeClick = ref(false);
const saveAskMe = async () =>{
  isSaveAskmeClick.value = true;
  
  if(isValidEmail.value && isValidMessage.value){
    const data = await apiServise.callApi(links.value ,newConstants.question.askQuestion,questionDto.value);
    showAskMe.value = false;
  }  
}


const isValidEmail = computed(()=>{
  if(isSaveAskmeClick.value){
    return /^[^@]+@\w+(\.\w+)+\w$/.test(questionDto.value.email)
  }
  return true;
})

const isValidMessage = computed(()=>{
  if(isSaveAskmeClick.value){
    return !!questionDto.value.message
  }
  return true;
})


const tabComponent = computed(() => {

  if (!flag)
    return '';

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
          <a href="/" class="d-flex flex-column pt-5 pb-4 me-md-auto text-decoration-none"
            style="padding-left: 1.5rem;">
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
                <span class="fs-16" :style="`font-weight: ${item.value == seletedTab.value ? '600' : '400'}`">{{
              item.title
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
                      style="height: 35px; background-color: #f4f4f4;">
                      <img class="py-1" src="@/assets/img/help-text.png" style="width: 95%;" alt="">
                    </a>
                    <span
                      class="fs-14 fw-600 px-2 py-2 mx-2 py-1 bg-basic shadow-sm sin-rounded justify-content-center cursor-pointer"
                      style="height: 35px;color: #20AF4F;cursor: pointer" @click="showAskMe = true">
                      Ask Me
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row ps-1 h-100">
          <transition>
            <component :is="tabComponent" :links='links' :key="reRenderTab" @saveLinks="saveLinks"
              @nextStep="nextStep" @clearForm="clearForm">
            </component>
          </transition>
        </div>
        <vue-modal btnClassList="btn btn-success" :isShowModal="showAskMe" headerTitle="Ask Me"
          @closeModal="showAskMe = !showAskMe" width="500px">
          <hr class="mt-0">
          <div class="row">
            <div class="col-12" style="padding:0px 40px;">
              <div class="mb-1 py-2 ">
                <label for="email" class="form-label mb-1 input-label">Email</label>
                <input type="email" :class="`form-control fs-16 ${isValidEmail ? '' :'border-danger'}`" id="email" placeholder="sample@yahoo.com" required  v-model="questionDto.email">
              </div>
            </div>
            <div class="col-12" style="padding:0px 40px;">
              <div class="mb-1 py-2 ">
                <label for="message" class="form-label mb-1 input-label">Message</label>
                <textarea type="message" :class="`form-control fs-16 ${isValidMessage ? '' :'border-danger'}`" id="message" placeholder="message" rows="3" required  v-model="questionDto.message"></textarea>
              </div>
            </div>
            <div class="col-12 mt-5" style="padding:0px 40px;">
              <div class="mb-1 py-2 ">
                <button type="button" class="col-6 btn btn-secondary px-4 fs-14 fw-400" @click="showAskMe = false">Cancel</button>
                <button type="button" class="col-6 btn btn-success px-2 fs-14 fw-400"  @click="saveAskMe">Save</button>                
              </div>
            </div>
          </div>
        </vue-modal>
      </div>
    </div>
  </div>
</template>

<style scoped></style>