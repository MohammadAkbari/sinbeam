
<script setup lang="ts">
export interface Props {
  label?: string;
}

const props = withDefaults(defineProps<Props>(), {
  label: 'انتخاب کنید',
});

</script>

<template>
  <div class="card w-100">
    <div class="card-header">
      {{ props.label }}
    </div>
    <div class="card-body">
      <slot name="body"></slot>
    </div>
  </div>
</template>

<style scoped></style>
