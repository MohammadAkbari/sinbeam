<script setup lang="ts">


import singleSelect from '@/shared/components/singleSelect.vue';
import persianDatePicker from '@/shared/components/persianDatePicker.vue';
import miladiDatePicker from '@/shared/components/miladiDatePicker.vue';
import radioGroupButton from '@/shared/components/radioGroupButton.vue';
import checkBox from '@/shared/components/checkBox.vue';
import inputText from '@/shared/components/inputText.vue';
import inputNumber from '@/shared/components/inputNumber.vue';
import { TabItems } from '@/enums/tabItems';
import { computed } from '@vue/reactivity';
// import TabItems from '@/enums/tabItems.ts';
import { defineAsyncComponent, provide, reactive, ref } from 'vue';
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
  links.value.push(...(newLinks.filter(e=>!links.value.some(q=>q.rel == e.rel))));
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
  <div class="d-flex align-items-start">
    <div class="nav flex-column nav-pills me-3" id="v-pills-tab" role="tablist" aria-orientation="vertical">
      <template v-for="(item, index) in list" :key="index">
        <button @click="changeTab(item.value)" :disabled="topSeletedTab < item.value"
          :class="`nav-link ${item.value == seletedTab ? 'active' : ''}`" :id="`v-pills-tab-${item.value}`"
          :data-bs-target="`#v-pills-${item.value}`" type="button" role="tab" :aria-controls="`v-pills-${item.value}`"
          :aria-selected="item.value == seletedTab">{{ item.title }}</button>
      </template>
    </div>
    <div class="tab-content" id="v-pills-tabContent" style="width: 100%;">  
      <div class="tab-pane fade show active" :id="`v-pills-${seletedTab}`" role="tabpanel"
        :aria-labelledby="`v-pills-tab-${seletedTab}`">
        <component :is="tabComponent" :hasCreated="topSeletedTab == seletedTab" :links='links' @saveLinks="saveLinks($event)" @nextStep="nextStep" />
        <div class="row">
          <div class="col col-md-3"> 
           
            <!-- <button class="btn btn-success" @click="nextStep()">next</button> -->
          </div>
         
        </div>
      </div>
    </div>
  </div>
</template>