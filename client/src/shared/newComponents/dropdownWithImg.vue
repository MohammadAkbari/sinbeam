
<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';

const emit = defineEmits(['changed', 'update:modelValue']);

export interface Props {
    options?: Array<any>;
    modelValue: number;
}

const props = withDefaults(defineProps<Props>(), {
    options: Array<any>
});


const el = ref();

let isDropdownOpen = ref(false as boolean);

let selectedOption = props.options.find(e=>e.id == props.modelValue)

onMounted(()=>{
    watch(()=>props.modelValue,()=>{
        selectedOption = props.options.find(e=>e.id == props.modelValue)
    })
    
})

const selectOption = (option) => {
    selectedOption = option;
    isDropdownOpen.value = false;
    emit('update:modelValue', option.id)
    emit('changed', option)
};

const outSideClickHandler = (e)=> {
    isDropdownOpen.value = false;
}

document.addEventListener('click', close)

</script>

<template>
    <div class="dropdown" v-click-outside="outSideClickHandler">
        <div class="dropdown-toggle-local" @click="isDropdownOpen = !isDropdownOpen" style="background-color: #EFEFEF;">
            <img :src="selectedOption?.image" class="dropdown-option-image">
            <span class="dropdown-option-label fs-14 fw-500">{{ selectedOption?.label }}</span>
            <span class="dropdown-caret-icon"></span>
        </div>
        <ul class="dropdown-menu-body" v-show="isDropdownOpen" style="width: 100%;">            
            <li v-for="(option, index) in props.options" :key="index" @click="selectOption(option)">
                <img :src="option?.image" class="dropdown-option-image">
                <span class="dropdown-option-label fs-14 fw-500">{{ option?.label }}</span>
            </li>
        </ul>
    </div>
</template>

<style scoped>
/* General styles */
/* * {
    box-sizing: border-box;
    font-family: sans-serif;
} */

/* Dropdown styles */
.dropdown {
    position: relative;
    display: inline-block;
}

.dropdown-toggle-local {
    display: flex;
    align-items: center;
    padding: 2px;
    height: 36px;
    background-color: #fff;
    border: 1px solid #ccc;
    cursor: pointer;
    user-select: none;
    transition: background-color 0.2s ease;
    border-radius: 5px;
    padding-left: 6px;
}

.dropdown-toggle-local:hover {
    background-color: #f8f8f8;
}

.dropdown-option-image {
    /* width: 20px; */
    height: 20px;
    margin-right: 12px;
    border-radius: 10%;
}

.dropdown-option-label {
    flex-grow: 1;
    color: #3F3F3F;
}

.dropdown-caret-icon {
    display: inline-block;
    margin-right: 5px;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 8px 8px 0 8px;
    border-color: #999 transparent transparent transparent;
}

.dropdown-menu-body {
    position: absolute;
    top: 100%;
    left: 0;
    margin: 0;
    padding: 12px 0;
    background-color: #fff;
    border: 1px solid #ccc;
    border-top: none;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    list-style: none;
    z-index: 1;
    transform: translateY(-1px);
    transition: opacity 0.2s ease, visibility 0.2s ease, transform 0.2s ease;
    max-height: 200px;
    overflow-y: auto;
}

.dropdown-menu-body li {
    display: flex;
    align-items: center;
    padding: 12px 15px;
    cursor: pointer;
    transition: background-color 0.2s ease;
}

.dropdown-menu-body li:hover {
    background-color: #f8f8f8;
}

.dropdown-menu-body li .dropdown-option-image {
    margin-right: 5px;
}

.dropdown-menu-body li .dropdown-option-label {
    flex-grow: 1;
}
</style>
