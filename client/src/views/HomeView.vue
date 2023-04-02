
<script setup lang="ts">

import singleSelect from '@/shared/components/singleSelect.vue';
import persianDatePicker from '@/shared/components/persianDatePicker.vue';
import radioGroupButton from '@/shared/components/radioGroupButton.vue';
import checkBox from '@/shared/components/checkBox.vue';
import inputText from '@/shared/components/inputText.vue';
import inputNumber from '@/shared/components/inputNumber.vue';
import { ref } from 'vue';

const items = [
  { state: 'Florida', abbr: 'FL' },
  { state: 'Georgia', abbr: 'GA' },
  { state: 'Nebraska', abbr: 'NE' },
  { state: 'California', abbr: 'CA' },
  { state: 'New York', abbr: 'NY' },
];

const item = ref({ state: 'California', abbr: 'CA' });
const date = ref('1402/01/06' as string);
const selected = ref(undefined);
const isActive = ref(undefined);
const text = ref('' as string);
const number = ref(undefined);



const changeDropDown = (event: any) => {
  console.log(event)
}

const changedate = (event: any) => {
  console.log(event)
}


</script>

<template>
  <div class="row">
    <div class="col col-6">
      <single-select label="انتخاب کنید" :items="items" v-model="item" value="abbr" title="state"
        @changed="changeDropDown($event)" />
      
      <persian-date-picker label="تاریخ" v-model="date" @changed="changedate" />

      <radio-group-button v-model="selected" :items="items" value="abbr" title="state"/>

      <check-box v-model="isActive"/>
      <input-text v-model="text"/>

      {{  number}}
      <input-number v-model="number"/>

    </div>
  </div>
</template>
