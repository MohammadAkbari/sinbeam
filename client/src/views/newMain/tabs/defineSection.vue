<script setup lang="ts">
import { reactive, ref } from 'vue';

const emit = defineEmits(['nextStep', 'clearForm']);

const showNoteModal = ref(false as boolean);

const state = reactive({
    value: [10, 100],
    value2: 40,
});

const nextStep = () => {
  emit("nextStep");
}

const clearForm = () => {
  emit("clearForm");
}

</script>


<template>
    <div class="col-11">
        <panel label="Profile Section" icon="/src/assets/img/profile-section.png" size="col-lg-12">
            <template v-slot:body>
                <div class="row">
                    <div class="col-6">
                        <button type="button" class="col-12 btn btn-primary px-2 fs-14 fw-400" @click="showNoteModal = true"
                            style="background-color: #125CCB;">
                            <img src="/src/assets/img/choose-from-library.png" alt="">
                            Choose from Library
                        </button>
                        <sub-panel label="Corrugated Web">
                            <template v-slot:body>
                                <div class="row px-5">
                                    <div class="col-lg-4 p-0 py-1">
                                        <label for="exampleFormControlInput1"
                                            style="background-color: #FBFBFB ;height: 36px; width: 200px;"
                                            class="form-label mb-0 d-flex justify-content-center input-label py-2">WT A 1000
                                            /
                                            300 X
                                            15</label>
                                    </div>
                                    <div class="col-lg-8 py-1">
                                        <div class="form-check d-flex justify-content-center py-2">
                                            <input class="form-check-input fs-16" type="checkbox" value=""
                                                id="flexCheckDefault">
                                            <label class="form-check-label input-label px-2  fs-16" for="flexCheckDefault">
                                                Default checkbox
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div class="row px-5">
                                    <div class="col-lg-4 p-0 py-1">
                                        <label for="exampleFormControlInput1" style="height: 36px; width: 200px;"
                                            class="form-label mb-0 d-flex input-label px-3 py-2">Web depth, right</label>
                                    </div>
                                    <div class="col-lg-8 py-1">
                                        <div class="form-check ">
                                            <div class="form-label mb-0 input-label d-flex justify-content-between px-3"
                                                style="background-color: #F5F5F5;height: 36px; width: 200px; padding-top: 8px;">
                                                <span class="justify-content-start">45000</span>
                                                <span class="justify-content-end">mm</span>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div class="row px-5">
                                    <div class="col-lg-4 p-0 py-1">
                                        <label for="exampleFormControlInput1" style="height: 36px; width: 200px;"
                                            class="form-label mb-0 d-flex input-label px-3 py-2">Web depth, left</label>
                                    </div>
                                    <div class="col-lg-8 py-1">
                                        <div class="form-check ">
                                            <div class="form-label mb-0 input-label d-flex justify-content-between px-3"
                                                style="background-color: #F5F5F5;height: 36px; width: 200px; padding-top: 8px;">
                                                <span class="justify-content-start">45000</span>
                                                <span class="justify-content-end">mm</span>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div class="row px-5">
                                    <div class="col-lg-4 p-0 py-1">
                                        <label for="exampleFormControlInput1" style="height: 36px; width: 200px;"
                                            class="form-label mb-0 d-flex input-label px-3 py-2">Web thickness</label>
                                    </div>
                                    <div class="col-lg-8 py-1">
                                        <div class="form-check ">
                                            <div class="form-label mb-0 input-label d-flex justify-content-between px-3"
                                                style="background-color: #F5F5F5;height: 36px; width: 200px; padding-top: 8px;">
                                                <span class="justify-content-start">100000000</span>
                                                <span class="justify-content-end">mm</span>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div class="row px-5">
                                    <div class="col-lg-4 p-0 py-1">
                                        <label for="exampleFormControlInput1" style="height: 36px; width: 200px;"
                                            class="form-label mb-0 d-flex input-label px-3 py-2">Web steel</label>
                                    </div>
                                    <div class="col-lg-8 py-1">
                                        <div class="form-check ">
                                            <div class="form-label mb-0 input-label d-flex justify-content-between px-3"
                                                style="background-color: #F5F5F5;height: 36px; width: 200px; padding-top: 8px;">
                                                <span class="justify-content-start">ST-37 (s 275)</span>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </template>
                        </sub-panel>
                        <sub-panel label="Top Flange">
                            <template v-slot:body>
                                <div class="row px-5">
                                    <div class="col-lg-4 p-0 py-1">
                                        <label for="exampleFormControlInput1" style="height: 36px; width: 200px;"
                                            class="form-label mb-0 d-flex input-label px-3 py-2">Top Flange
                                            thickness</label>
                                    </div>
                                    <div class="col-lg-8 py-1">
                                        <div class="form-check ">
                                            <div class="form-label mb-0 input-label d-flex justify-content-between px-3"
                                                style="background-color: #F5F5F5;height: 36px; width: 200px; padding-top: 8px;">
                                                <span class="justify-content-start">12300000</span>
                                                <span class="justify-content-end">mm</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row px-5">
                                    <div class="col-lg-4 p-0 py-1">
                                        <label for="exampleFormControlInput1" style="height: 36px; width: 200px;"
                                            class="form-label mb-0 d-flex input-label px-3 py-2">Top Flange width</label>
                                    </div>
                                    <div class="col-lg-8 py-1">
                                        <div class="form-check ">
                                            <div class="form-label mb-0 input-label d-flex justify-content-between px-3"
                                                style="background-color: #F5F5F5;height: 36px; width: 200px; padding-top: 8px;">
                                                <span class="justify-content-start">2319009</span>
                                                <span class="justify-content-end">mm</span>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div class="row px-5">
                                    <div class="col-lg-4 p-0 py-1">
                                        <label for="exampleFormControlInput1" style="height: 36px; width: 200px;"
                                            class="form-label mb-0 d-flex input-label px-3 py-2">Top Flange</label>
                                    </div>
                                    <div class="col-lg-8 py-1">
                                        <div class="form-check ">
                                            <div class="form-label mb-0 input-label d-flex justify-content-between px-3"
                                                style="background-color: #F5F5F5;height: 36px; width: 200px; padding-top: 8px;">
                                                <span class="justify-content-start">ST-37 (s 275)</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </sub-panel>
                        <sub-panel label="Bottom Flange">
                            <template v-slot:body>
                                <div class="row px-5">
                                    <div class="col-lg-4 p-0 py-1">
                                        <label for="exampleFormControlInput1" style="height: 36px; width: 200px;"
                                            class="form-label mb-0 d-flex input-label px-3 py-2">Bottom Flange
                                            thickness</label>
                                    </div>
                                    <div class="col-lg-8 py-1">
                                        <div class="form-check ">
                                            <div class="form-label mb-0 input-label d-flex justify-content-between px-3"
                                                style="background-color: #F5F5F5;height: 36px; width: 200px; padding-top: 8px;">
                                                <span class="justify-content-start">1200000</span>
                                                <span class="justify-content-end">mm</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row px-5">
                                    <div class="col-lg-4 p-0 py-1">
                                        <label for="exampleFormControlInput1" style="height: 36px; width: 200px;"
                                            class="form-label mb-0 d-flex input-label px-3 py-2">Bottom Flange width</label>
                                    </div>
                                    <div class="col-lg-8 py-1">
                                        <div class="form-check ">
                                            <div class="form-label mb-0 input-label d-flex justify-content-between px-3"
                                                style="background-color: #F5F5F5;height: 36px; width: 200px; padding-top: 8px;">
                                                <span class="justify-content-start">12999000</span>
                                                <span class="justify-content-end">mm</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row px-5">
                                    <div class="col-lg-4 p-0 py-1">
                                        <label for="exampleFormControlInput1" style="height: 36px; width: 200px;"
                                            class="form-label mb-0 d-flex input-label px-3 py-2">Bottom Flangee</label>
                                    </div>
                                    <div class="col-lg-8 py-1">
                                        <div class="form-check ">
                                            <div class="form-label mb-0 input-label d-flex justify-content-between px-3"
                                                style="background-color: #F5F5F5;height: 36px; width: 200px; padding-top: 8px;">
                                                <span class="justify-content-start">ST-37 (s 275)</span>
                                                <!-- <span class="justify-content-end">mm</span> -->
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </sub-panel>
                    </div>
                    <div class="col-6">
                        <sub-panel label="View">
                            <template v-slot:body>
                                <div class="d-flex justify-content-center">
                                    <img src="/src/assets/img/temp.png" alt="">
                                </div>

                            </template>
                        </sub-panel>

                    </div>
                </div>
                <div class="row">
                    <sub-panel label="3D View">
                        <template v-slot:body>
                            <div class="d-flex justify-content-center">
                                <img src="/src/assets/img/temp-2.png" alt="">
                            </div>
                            <div class="d-flex justify-content-center">
                                <img src="/src/assets/img/temp-3.png" alt="">
                            </div>
                        </template>
                    </sub-panel>
                </div>
            </template>
        </panel>

        <div class="accordion" id="accordionExample">
            <div class="accordion-item">
                <h2 class="accordion-header" id="headingOne">
                    <button class="accordion-button fs-16 fw-600" type="button" data-bs-toggle="collapse"
                        data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne"
                        style="background-color: #125CCB; color: #FFFFFF;">
                        Properties
                    </button>
                </h2>
                <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne"
                    data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                        <table class="table table-striped table-bordered">
                            <tbody>
                                <tr>
                                    <td>Bean has uniform depth</td>
                                    <td>Iy Major axis inertia = 61762 cm4</td>
                                    <td>Iz Minor axis inertia = 10400 cm4</td>
                                </tr>
                                <tr>
                                    <td>iy Major axis gyration = 0 cm</td>
                                    <td>iz Minor axis gyration = 14.7 cm</td>
                                    <td>It Torsional inertia = 0 cm4</td>
                                </tr>
                                <tr>
                                    <td>Iw Warping inertia = 4096576 cm6</td>
                                    <td>A Cross section area = 48 cm2</td>
                                    <td>Weight per m = 57 kg/m</td>
                                </tr>
                                <tr>
                                    <td>Weight per m = 57 kg/m</td>
                                    <td>Surface area per m = 2.4 m2/m</td>
                                    <td>Surface area per T = 42.3 m2/T</td>
                                </tr>
                                <tr>
                                    <td style="text-align: center;" colspan="3">Ratio A/AQ = 1.15</td>
                                </tr>
                            </tbody>

                        </table>
                    </div>
                </div>
            </div>
        </div>
        <div class="row d-flex justify-content-end py-5">
            <button type="button" class="btn px-2 fs-16 fw-500 mx-2" @click="clearForm"
                style="background-color: #F4F4F4; width: 196px; height: 42px; color: #125CCB;">Clear All</button>
            <button type="button" class="btn btn-primary px-2 fs-16 fw-500  mx-2" @click="nextStep"
                style="background-color: #125CCB; width: 196px; height: 42px;">Next</button>
        </div>
    </div>


    <vue-modal btnClassList="btn btn-success" :isShowModal="showNoteModal" headerTitle="Corrugated Web Sections Library"
        @closeModal="showNoteModal = !showNoteModal" width="95%" height="900px">
        <div class="row">
            <div class="col-3 px-5">
                <img src="/src/assets/img/info-circle.png" alt="">
                <label class="fs-14 fw-500 py-2 px-2" for="" style="color: #3F3F3F;">Weight (kg/m)</label>
                <dropdown-range style="width: 100%"></dropdown-range>
            </div>
            <div class="col-3 px-5">
                <img src="/src/assets/img/info-circle.png" alt="">
                <label class="fs-14 fw-500 py-2 px-2" for="" style="color: #3F3F3F;">Web height (mm)</label>
                <dropdown-range style="width: 100%"></dropdown-range>
            </div>
            <div class="col-3 px-5">
                <img src="/src/assets/img/info-circle.png" alt="">
                <label class="fs-14 fw-500 py-2 px-2" for="" style="color: #3F3F3F;">Web thickness (mm)</label>
                <dropdown-range style="width: 100%"></dropdown-range>
            </div>
            <div class="col-3 px-5">
                <img src="/src/assets/img/info-circle.png" alt="">
                <label class="fs-14 fw-500 py-2 px-2" for="" style="color: #3F3F3F;">Flange width (mm)</label>
                <dropdown-range style="width: 100%"></dropdown-range>
            </div>
        </div>
        <div class="row">
            <div class="col-3 px-5">
                <img src="/src/assets/img/info-circle.png" alt="">
                <label class="fs-14 fw-500 py-2 px-2" for="" style="color: #3F3F3F;">Flange thickness (mm)</label>
                <dropdown-range style="width: 100%"></dropdown-range>
            </div>
            <div class="col-3 px-5">
                <img src="/src/assets/img/info-circle.png" alt="">
                <label class="fs-14 fw-500 py-2 px-2" for="" style="color: #3F3F3F;">Section perimeter (m2/m)</label>
                <dropdown-range style="width: 100%"></dropdown-range>
            </div>
            <div class="col-3 px-5">
                <img src="/src/assets/img/info-circle.png" alt="">
                <label class="fs-14 fw-500 py-2 px-2" for="" style="color: #3F3F3F;">Moment of inertia Iy (cm4)</label>
                <dropdown-range style="width: 100%"></dropdown-range>
            </div>
            <div class="col-3 px-5">
                <img src="/src/assets/img/info-circle.png" alt="">
                <label class="fs-14 fw-500 py-2 px-2" for="" style="color: #3F3F3F;">Moment of inertia Iz (cm4)</label>
                <dropdown-range style="width: 100%"></dropdown-range>
            </div>
        </div>
        <div class="row">
            <div class="col-3 px-5">
                <img src="/src/assets/img/info-circle.png" alt="">
                <label class="fs-14 fw-500 py-2 px-2" for="" style="color: #3F3F3F;">Bending capacity</label>
                <dropdown-range style="width: 100%"></dropdown-range>
            </div>
            <div class="col-3 px-5">
                <img src="/src/assets/img/info-circle.png" alt="">
                <label class="fs-14 fw-500 py-2 px-2" for="" style="color: #3F3F3F;">Shear capacity</label>
                <dropdown-range style="width: 100%"></dropdown-range>
            </div>
            <div class="col-3 px-5">
                <img src="/src/assets/img/info-circle.png" alt="">
                <label class="fs-14 fw-500 py-2 px-2" for="" style="color: #3F3F3F;">Axial capacity</label>
                <dropdown-range style="width: 100%"></dropdown-range>
            </div>
            <div class="col-3 px-5">

            </div>
        </div>
        <div class="row">

        </div>
    </vue-modal>
</template>

<style>
.table td {
    font-size: 16px;
    font-weight: 400;
    padding-left: 35px;
}
</style>