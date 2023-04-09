<script setup lang="ts">



export interface Props {
  modelValue: any;
  label?: string;
  value?: string;
  title?: string;
  items: any[];
  name: string;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: null,
  label: 'انتخاب کنید',
  value: 'id',
  title: 'title',
  items: Array<any>
});

const emit = defineEmits(['changed', 'update:modelValue']);





const changed = (val) => {
  emit('update:modelValue', val);
  emit('changed', val);
}


</script>

<template>
  <div class="card w-50">
    <div class="card-header">
    {{ label }}
  </div>
  <div class="card-body">
      <div class="form-check" v-for="(item, index) in props.items" :key="index">
        <input class="form-check-input" type="radio" :name="`Radiot-${name}`" :id="name + '-' + index"
          :checked="item[props.value] == props.modelValue" @click="changed(item[props.value])">

        <label class="form-check-label" :for="name + '-' + index">
          {{ item[props.title] }}
        </label>
      </div>
    </div>
  </div>







  <!--    
          <q-radio v-for="(item,index ) in props.items"  
          style="display: flex"
          :key="index" 
          v-model="selected"
          :dense="false"
          :label="item[props.title]"
          :val="item[props.value]"
         >
        </q-radio> -->




  <!-- 
        <v-radio-group v-model="selected" :label="label" density="compact">
          <v-radio v-for="(item,index ) in props.items" :key="index" :label="item[props.title]" :value="item[props.value]" ></v-radio>
        </v-radio-group> -->
</template>

<style scoped></style>
