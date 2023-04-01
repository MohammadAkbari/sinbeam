
<script setup lang="ts">

import singleSelect from '@/shared/components/singleSelect.vue';
import persianDatePicker from '@/shared/components/persianDatePicker.vue';
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

    </div>
  </div>
</template>
