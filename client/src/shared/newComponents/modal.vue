
<script setup lang="ts">
export interface Props {
    headerTitle?: string;
    isShowModal?: boolean;
    width?: string;
    height?:string
}

const props = withDefaults(defineProps<Props>(), {
    headerTitle: 'پنجره',
    isShowModal: false,
    width: '700',
    height: '100%'
});

const emit = defineEmits(['closeModal']);

const close = () => emit('closeModal');

const options = {
    transition: false,
    closeClickDimmed: false,
    closeKeyCode: false
};


</script>

<template>
    <div class="col-md-12">
        <Modal v-model="props.isShowModal" :close="close" :options="options">

            <div class="vueModal modal-content" :style="`width:${props.width}; `">

                <div class="w-100 h-100 d-flex justify-content-center">
                    <span @click="close()" class="fa-regular fa-xmark close-btn-modal"></span>
                    <div>
                        <h6 class="modal-header-title fs-20">{{ headerTitle }}</h6>
                    </div>
                </div>

                <hr style="color:  #F2F2F2">
                <div class="p-2 modal-body" :style="`height:${props.height}`">
                    <slot></slot>
                </div>

            </div>
        </Modal>
    </div>
</template>

<style scoped >
.vueModal {
    border-radius: 5px;
    box-sizing: border-box;
    background-color: white;
    overflow: hidden;
    padding: 25px;


}

.close-btn-modal {
    position: absolute;
    left: 25px;
    top: 25px;
    font-weight: 500;
    font-size: 20px;
}
</style>
