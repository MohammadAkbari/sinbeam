
<script setup lang="ts">

import { reactive, ref } from 'vue';


export interface Props {
    options?: Array<any>;
}

const props = withDefaults(defineProps<Props>(), {
    options: []
});

let isDropdownOpen = ref(false as boolean);

let selectedOption = props.options[0];

const selectOption = (option) => {
    selectedOption = option;
    isDropdownOpen.value = false;
};

const state = reactive({
    value: [10, 100],
    value2: 40,
});

const reRender = ref(0);

</script>

<template>
    <div class="dropdown">
        <div class="dropdown-toggle-local" @click="isDropdownOpen = !isDropdownOpen" style="background-color: #EFEFEF;">
            <img :src="selectedOption?.image" class="dropdown-option-image">
            <span class="dropdown-option-label fs-14 fw-500">{{ selectedOption?.label }}</span>
            <span class="dropdown-caret-icon"></span>
        </div>
        <div class="dropdown-menu-body" v-if="isDropdownOpen">
            <range-slider v-model="state.value" :key="reRender" />
            <div class="row px-3">
                <div class="col-6">
                    <div class="mb-3 py-2">
                        <label for="exampleFormControlInput1" class="form-label mb-1 input-label">Min</label>
                        <input type="text" class="form-control fs-16" id="exampleFormControlInput1" v-model="state.value[0]"
                            @change="reRender++">
                    </div>
                </div>
                <div class="col-6">
                    <div class="mb-3 py-2">
                        <label for="exampleFormControlInput1" class="form-label mb-1 input-label">Max</label>
                        <input type="text" class="form-control fs-16" id="exampleFormControlInput1" v-model="state.value[1]"
                            @change="reRender++">
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-12 px-4">
                    <button type="button" class="col-12 btn btn-primary px-2 fs-14 fw-400" @click="showNoteModal = true"
                        style="background-color: #125CCB;">
                        Apply
                    </button>
                </div>

            </div>
        </div>
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
    width: 200px;
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
    /* top: 100%; */
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
