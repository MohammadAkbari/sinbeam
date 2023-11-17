<script setup lang="ts">

import { TabItems } from '@/enums/tabItems';
import { computed } from '@vue/reactivity';
// import TabItems from '@/enums/tabItems.ts';
import { defineAsyncComponent, provide, ref } from 'vue';
import ApiService from '@/core/services/api.service';
import type Link from '@/models/link';

// const items = [
//   { state: 'Florida', abbr: 'FL' },
//   { state: 'Georgia', abbr: 'GA' },
//   { state: 'Nebraska', abbr: 'NE' },
//   { state: 'California', abbr: 'CA' },
//   { state: 'New York', abbr: 'NY' },
// ];
// const item = ref({ state: 'California', abbr: 'CA' });
// const date = ref('1402/01/06' as string);
// const datemiladi = ref('2023/01/06' as string);
// const selected = ref(undefined);
// const isActive = ref(undefined);
// const text = ref('' as string);
// const number = ref(undefined);
// const changeDropDown = (event: any) => {
//   console.log(event)
// }

// const changedate = (event: any) => {
//   console.log(event)
// }


const list = [
  {
    value: 0,
    title: "Welcome"
  },
  {
    value: 1,
    title: "General Details"
  },
  {
    value: 2,
    title: "Localisation"
  },
  {
    value: 3,
    title: "Beam"
  },
  {
    value: 4,
    title: "Properties"
  },
  {
    value: 5,
    title: "Loading"
  },
  {
    value: 6,
    title: "Analysis results"
  },
  {
    value: 7,
    title: "Restraints"
  },
  {
    value: 8,
    title: "Top flange verification"
  },
  {
    value: 9,
    title: "Bottom flange verification"
  },
  {
    value: 10,
    title: "Web verification"
  },
  {
    value: 11,
    title: "Design"
  },
  {
    value: 12,
    title: "Output"
  },

];

const changeTab = (value: number) => {
  seletedTab.value = value;
}

const seletedTab = ref(0 as TabItems);
const topSeletedTab = ref(0 as TabItems);

const links = ref([] as Link[]);

const nextStep = () => {
  seletedTab.value++;

  if (seletedTab.value > topSeletedTab.value)
    topSeletedTab.value = seletedTab.value;
}

const saveLinks = (newLinks) => {
  links.value.push(...(newLinks.filter(e => !links.value.some(q => q.rel == e.rel))));

  console.log(links.value)
}


provide('apiServise', new ApiService)

const tabComponent = computed(() => {
  switch (+seletedTab.value) {
    case +TabItems.Welcome:
      return defineAsyncComponent(() => import('./tabs/welcome.vue'));
    case +TabItems.GeneralDetails:
      return defineAsyncComponent(() => import('./tabs/generalDetails.vue'));
    case +TabItems.Localisation:
      return defineAsyncComponent(() => import('./tabs/localisation.vue'));
    case TabItems.Beam:
      return defineAsyncComponent(() => import('./tabs/beam.vue'));
    case TabItems.Properties:
      return defineAsyncComponent(() => import('./tabs/properties.vue'));
    case TabItems.Loading:
      return defineAsyncComponent(() => import('./tabs/loading.vue'));
    case TabItems.AnalysisResults:
      return defineAsyncComponent(() => import('./tabs/analysisResults.vue'));
    case TabItems.Restraints:
      return defineAsyncComponent(() => import('./tabs/restraints.vue'));
    case TabItems.TopFlangeVerification:
      return defineAsyncComponent(() => import('./tabs/topFlangeVerification.vue'));
    case TabItems.BottomFlangeVerification:
      return defineAsyncComponent(() => import('./tabs/bottomFlangeVerification.vue'));
    case TabItems.WebVerification:
      return defineAsyncComponent(() => import('./tabs/webVerification.vue'));
    case TabItems.Design:
      return defineAsyncComponent(() => import('./tabs/design.vue'));
    case TabItems.Output:
      return defineAsyncComponent(() => import('./tabs/output.vue'));
    default: return '';
  }
});

</script>



<template>

  <div class="container">
    <div class="row">
      <div class="col col-3" style="border-radius: 4px; margin-left: 12px;  margin-top: 12px; background-color: #F4F4F4;">
      <div style=" margin-left:24px; margin-top: 34px;">
           <div style="width: 242px;">
        <img src="@/assets/img/Logo-text.png" />
      </div>
      </div>
   
    </div>
    </div>
    
  </div>
  <div class="row" style="background-color: #FFFFFF;">
    <!-- Sidebar -->
   

    <!-- <ul class="sidebar-nav">
       
           <li>
            <template v-for="(item, index) in list" :key="index">
              <button @click="changeTab(item.value)" :disabled="topSeletedTab < item.value" style="padding-left: 8px;"
                :class="`nav-link ${item.value == seletedTab ? 'active' : ''}  pl-5`" :id="`v-pills-tab-${item.value}`"
                :data-bs-target="`#v-pills-${item.value}`" type="button" role="tab" :aria-controls="`v-pills-${item.value}`"
                :aria-selected="item.value == seletedTab">{{ item.title }}</button>
            </template>
          </li> 
        </ul>-->


    <!--  Content -->
    <!-- <div id="page-content-wrapper" class="col-md-9">
        <div class="container-fluid">
          <div class="row">
            <div class="col-lg-12">
              <div style="float: left; flex-direction: column;width: 100%;height: 100vh; position: relative;">
                <header class="mb-3">
                  <nav class="navbar navbar-expand-lg navbar-dark" style="background-color: #282a2c;">
                    <div class="container-fluid">
                      <a class="navbar-brand" href="#">Beam</a>
                      <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                      </button>
                      <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0 ">
                          <li class="nav-item" style="padding-left: 5px;">
                            <a class="nav-link active" aria-current="page" href="#">Home</a>
                          </li>
                          <li class="nav-item">
                            <a class="nav-link" href="#">Link</a>
                          </li>
                        </ul>
                        <form class="d-flex">
                          <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                          <button class="btn btn-outline-success" type="submit">Search</button>
                        </form>
                      </div>
                    </div>
                  </nav>
                </header>

                <div class="p-3" :id="`v-pills-${seletedTab}`" :aria-labelledby="`v-pills-tab-${seletedTab}`"
                  style="width: 100%;">               
                  <component :is="tabComponent" :hasCreated="topSeletedTab == seletedTab" :links='links'
                    @saveLinks="saveLinks($event)" @nextStep="nextStep" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> -->
  </div>
</template>



  