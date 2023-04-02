<script setup lang="ts">


// import singleSelect from '@/shared/components/singleSelect.vue';
// import persianDatePicker from '@/shared/components/persianDatePicker.vue';
// import radioGroupButton from '@/shared/components/radioGroupButton.vue';
// import checkBox from '@/shared/components/checkBox.vue';
// import inputText from '@/shared/components/inputText.vue';
// import inputNumber from '@/shared/components/inputNumber.vue';
import { TabItems } from '@/enums/tabItems';
import tabs from '@/shared/components/tabs.vue';
import { computed } from '@vue/reactivity';
// import TabItems from '@/enums/tabItems.ts';
import { defineAsyncComponent, ref } from 'vue';

// const items = [
//   { state: 'Florida', abbr: 'FL' },
//   { state: 'Georgia', abbr: 'GA' },
//   { state: 'Nebraska', abbr: 'NE' },
//   { state: 'California', abbr: 'CA' },
//   { state: 'New York', abbr: 'NY' },
// ];
// const item = ref({ state: 'California', abbr: 'CA' });
// const date = ref('1402/01/06' as string);
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

const seletedTab = ref(1 as TabItems);

const tabComponent = computed(()=>{  
  switch (+seletedTab.value) {
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
})




</script>



<template>
  <div class="row">
    <div class="col col-12">
      <tabs v-model="seletedTab" />  
      <component :is="tabComponent" />
    </div>
    <!-- <div class="col col-6">
        <single-select label="انتخاب کنید" :items="items" v-model="item" value="abbr" title="state"
          @changed="changeDropDown($event)" />
      
        <persian-date-picker label="تاریخ" v-model="date" @changed="changedate" />

        <radio-group-button v-model="selected" :items="items" value="abbr" title="state"/>

        <check-box v-model="isActive"/>
        <input-text v-model="text"/>

        <input-number v-model="number"/>

      

      </div> -->
  </div>
</template>