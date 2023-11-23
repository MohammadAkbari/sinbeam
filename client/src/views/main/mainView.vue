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
            <a href="#" class="d-flex justify-content-center" style="height: 60px;">
              <div class="bg-box-primary sin-rounded w-100 h-100 fs-12 d-flex align-items-center px-2 shadow-sm"
                style="margin: 0 auto;">
                <img src="@/assets/img/home-text.png" alt="" style="margin: 0 auto;">
                </div>
              </a>
            </div>
            <div class="col-lg-10 ps-0">
              <div class="d-flex justify-content-start" style="height: 60px;">
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
        <div class="row ps-1 h-100" style="padding: 10px 0;">
          <component :is="tabComponent" :hasCreated="topSeletedTab == seletedTab" :links='links'
            @saveLinks="saveLinks($event)" @nextStep="nextStep">
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
          <div class="col-lg-5 shadow-sm bg-box-secondary sin-rounded mx-2">
              <a class="bg-box-primary sin-rounded d-flex my-2 justify-content-center d-flex" style="height: 40px;">
                <span class="w-100 h-100 d-flex align-items-center px-2 fs-12">General Information</span>
              </a>
              <div class="mb-3 pt-3">
                <label for="exampleFormControlInput1" class="form-label mb-1">Project Name</label>
                <input type="text" class="form-control fs-10" id="exampleFormControlInput1">
              </div>
              <div class="pt-2">
                <label class="form-label mb-2">Element Item</label>
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1">
                  <label class="form-check-label" for="flexRadioDefault1">
                    column
                  </label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked>
                  <label class="form-check-label" for="flexRadioDefault2">
                    rafter
                  </label>
                </div>
                <div class="mb-1 pt-1">
                  <label for="exampleFormControlInput1" class="form-label mb-1">Column Height/Rater Span (m)</label>
                  <input type="text" class="form-control fs-10" id="exampleFormControlInput1">
                </div>
                <div class="mb-1 pt-1">
                  <label for="exampleFormControlInput1" class="form-label mb-1">Designer</label>
                  <input type="text" class="form-control fs-10" id="exampleFormControlInput1">
                </div>
                <div class="mb-1 pt-1">
                  <label for="exampleFormControlTextarea1" class="form-label mb-1">Note</label>
                  <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                </div>
              </div>
            </div>
            <div class="col-lg-5 p-0">
              <div class="col-lg-12 p-2  shadow-sm bg-box-secondary sin-rounded mx-2 h-auto"
                style="margin:0 4px !important;">
                <a class="bg-box-primary sin-rounded d-flex my-2 justify-content-center d-flex" style="height: 40px;">
                  <span class="w-100 h-100 d-flex align-items-center px-2 fs-12">Location</span>
                </a>
                <div class="hadow-sm bg-box-secondary sin-rounded my-1" style="width: 18rem;">
                  <a class="bg-box-primary d-flex justify-content-center d-flex" style="height: 25px;">
                    <span class="w-100 h-100 d-flex align-items-center fs-10 ps-2">Design to</span>
                  </a>
                  <div class="card-body d-flex pt-2 pb-3 px-2">
                    <select class="form-select fs-10" aria-label="Default select example fs-10 px-2 ">
                      <option selected>Open this select menu</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </select>
                    <span class="mx-3">OR</span>
                    <button type="button" class="btn btn-primary px-2 fs-10">Primary</button>
                  </div>
                </div>
                <div class="hadow-sm bg-box-secondary sin-rounded my-1" style="width: 18rem;">
                  <a class="bg-box-primary d-flex justify-content-center d-flex" style="height: 25px;">
                    <span class="w-100 h-100 d-flex align-items-center fs-10 ps-2">Location</span>
                  </a>
                  <div class="card-body px-2 py-2">
                    <div class="form-check">
                      <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked>
                      <label class="form-check-label" for="flexRadioDefault2">
                        rafter
                      </label>
                    </div>
                    <div class="form-check">
                      <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1">
                      <label class="form-check-label" for="flexRadioDefault1">
                        column
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-12 py-2" style="margin:0 4px !important;">
                <div class="shadow-sm bg-box-secondary sin-rounded px-2" style="width: 18rem;">
                  <a class="bg-box-primary sin-rounded d-flex my-2 justify-content-center d-flex" style="height: 40px;">
                    <span class="w-100 h-100 d-flex align-items-center px-2 fs-12">Deflection Limits( span / limit)</span>
                  </a>
                  <div class="card-body px-2 py-2">
                    <div class="row mb-1 pt-1 d-flex">
                      <div class="col-lg-4 p-0 py-1">
                        <label for="exampleFormControlInput1"
                          class="form-label mb-0 d-flex align-self-center fs-12">Variable Loads</label>
                      </div>
                      <div class="col-lg-8 py-1">
                        <input type="text" class="form-control fs-12 mx-2" id="exampleFormControlInput1"
                          style="width: 150px;">
                      </div>
                      <div class="col-lg-4 p-0 py-1">
                        <label for="exampleFormControlInput1" class="form-label mb-0 d-flex align-self-center fs-12">Total
                          Loads</label>
                      </div>
                      <div class="col-lg-8 py-1">
                        <input type="text" class="form-control fs-12 mx-2" id="exampleFormControlInput1"
                          style="width: 150px;">
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
* {
  font-size: 12px;
}

a {
  text-decoration: none;
}

.fs-8 {
  font-size: 8px !important;
}

.fs-10 {
  font-size: 10px !important;
}

.fs-12 {
  font-size: 12px !important;
}

.fs-14 {
  font-size: 14px !important;
}

.fs-16 {
  font-size: 16px !important;
}

.fs-18 {
  font-size: 18px !important;
}

.sin-rounded {
  border-radius: 3px;
}

img.sin-logo {
  width: 45px;
}

.bg-basic {
  STROKE: white;
}

.bg-box-primary {
  background-color: #F4F4F4;
}

.bg-box-secondary {
  border: 1px solid #F4F4F4;
  STROKE: #FEFEFE;
}

.sin-nav-item {
  color: #888888;
  border-left: 3px solid #E0E0E0;
  text-decoration: none;
  display: block;
  height: 33px;
  font-size: 15px;
  margin: 3px auto;
  padding: 3px 20px;
  margin-left: 1.5rem;
}

span.sin-nav-item.active {
  color: #000000DE !important;

  border-left: 3px solid #125CCB !important;
}

span.sin-nav-item.done {
  color: #000000DE !important;
  font-weight: 400;
  border-left: 3px solid #69C179 !important;
}</style>