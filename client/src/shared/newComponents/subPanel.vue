
<script setup lang="ts">
export interface Props {
    label?: string;
    icon?: string;
}

const props = withDefaults(defineProps<Props>(), {
    label: 'پنل',
    icon: ''
});
</script>

<template>
    <div class="hadow-sm bg-box-secondary sin-rounded my-4">
        <span class="bg-box-primary d-flex justify-content-center d-flex" style="height: 36px; opacity: 87%;">
            <span class="w-100 h-100 d-flex align-items-center fs-14 ps-4 fw-500"> {{ props.label }}</span>
        </span>
        <div class="px-4 py-4">
            <slot name="body" ></slot>
        </div>
        
    </div>
</template>

<style scoped></style>
