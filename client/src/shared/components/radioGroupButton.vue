<script setup lang="ts">



export interface Props {
  modelValue: any;
  value?: string;
  title?: string;
  items: any[];
  name: string;
  isInline?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: null,
  value: 'id',
  title: 'title',
  items: Array<any>,
  isInline: false,
});

const emit = defineEmits(['changed', 'update:modelValue']);





const changed = (val) => {
  emit('update:modelValue', val);
  emit('changed', val);
}


</script>

<template>
  <div class="form-check" v-for="(item, index) in props.items" :key="index" :style="`display: ${props.isInline ? 'inline-block;margin-right:10px' : 'block'} ;`">
    <input class="form-check-input" type="radio" :name="`Radiot-${name}`" :id="name + '-' + index"
      :checked="item[props.value] == props.modelValue" @click="changed(item[props.value])">

    <label class="form-check-label" :for="name + '-' + index">
      {{ item[props.title] }}
    </label>
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
