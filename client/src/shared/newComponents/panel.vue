
<script setup lang="ts">
export interface Props {
    label?: string;
    icon?: string;
    size?: string;
}

const props = withDefaults(defineProps<Props>(), {
    label: 'پنل',
    icon: '',
    size: 'col-lg-5'
});
</script>

<template>
    <div :class="`${props.size} bg-box-secondary sin-rounded px-2 my-4`" style="padding-bottom: 20px;">
        <span class="bg-box-primary sin-rounded d-flex my-2 justify-content-center d-flex" style="height: 66px;">
            <span class="w-100 h-100 d-flex align-items-center px-4 fs-16 fw-600 panel-header-text">
                <img class="panel-icon mx-2" :src="props.icon" alt="">{{ props.label }}</span>
        </span>
        <slot name="body"></slot>
    </div>
</template>

<style scoped></style>
