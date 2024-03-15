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
import { RouterView ,RouterLink} from 'vue-router';

const apiServise = new ApiService;
provide('apiServise', apiServise);

const list = [
  {    
    title: "Questions",
    routeName: 'questions'
  },
  {
    title: "Requests",
    routeName: 'requests'
  }
];


const seletedTab = ref(list[0]);

const links = ref([] as Link[]);


onMounted(async () => {
  const data = await apiServise.get(import.meta.env.VITE_APP_BASE_URL_ADMIN );
  console.log(data);
  
  saveLinks(data._links);
})



const router = useRouter()

const route = useRoute()

const currentRout = computed(()=>router.currentRoute.value.name)


const saveLinks = (newLinks) => {
  if (newLinks) {
    let newList = links.value.filter(e => !newLinks.some(q => q.rel == e.rel));
    links.value = [...newList, ...newLinks];
    console.log(links.value)
  }
}

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
            <li v-for="(item, index) in list" :key="index" >
              <router-link :to="{name:item.routeName}" >
                <span :class="`sin-nav-item ${item.routeName == currentRout ? 'active' : ''}`">
                    <span class="fs-16" :style="`font-weight: ${item.routeName == currentRout ? '600' : '400'}`">{{ item.title }}</span>
                </span>               
              </router-link >
            </li>
          </ul>
        </div>
      </div>
      <div class="d-flex flex-column overflow-auto ps-0" style="height: 100vh;width: 80%;">
        <div class="w-100 py-2">
          <div class="row">
            <div class="col-lg-2">
              <router-link :to="{name:'home'}" class="d-flex justify-content-center" style="height: 72px;">
                <div class="bg-box-primary sin-rounded w-100 h-100 fs-12 d-flex align-items-center px-2 shadow-sm"
                  style="margin: 0 auto;">
                  <img src="@/assets/img/home-text.png" alt="" style="margin: 0 auto;">
                </div>
              </router-link>
            </div>
            <div class="col-lg-10 ps-0">
              <div class="d-flex justify-content-start" style="height: 72px;">
                <div
                  class="bg-box-primary sin-rounded w-100 h-100 d-flex align-items-center px-2 justify-content-between shadow-sm">
                  <div class="d-flex fs-12">
                    <!-- <img class="mt-2" style="width: 42px; height: 42px;" src="@/assets/img/user.png" />
                    <div class="d-flex flex-column px-2 justify-content-center">
                      <span class="fs-14" style="font-weight: 500;">profile panel</span>
                      <span class="fs-10"> 25% is completed</span>
                    </div> -->
                  </div>
                  <div class="d-flex fs-10">
                    <!-- <a href="#" class="px-2 mx-2 py-1 bg-box-primary sin-rounded justify-content-center"
                      style="height: 35px; background-color: #f4f4f4;">
                      <img class="py-1" src="@/assets/img/help-text.png" style="width: 95%;" alt="">
                    </a> -->
                   
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row ps-1 h-100">
            <RouterView v-if="links.length >0" :links="links"/>
        </div>        
      </div>
    </div>
  </div>
</template>

<style scoped></style>