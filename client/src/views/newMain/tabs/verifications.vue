<script setup lang="ts">
import { ref } from 'vue';

const emit = defineEmits(['nextStep', 'clearForm']);

const loadInput = ref(true as boolean)

const nextStep = () => {
    emit("nextStep");
}

const clearForm = () => {
    emit("clearForm");
}

</script>
<template>
    <div class="col-11">
        <panel label="Restraints" icon="/src/assets/img/restraints.png" size="col-lg-12">
            <template v-slot:body>
                <sub-panel label="View">
                    <template v-slot:body>
                        <div class="row">
                            <div class="col-4">
                                <div class="row py-2">
                                    <div class="form-check d-flex justify-content-start mx-4">
                                        <input class="form-check-input fs-16" type="checkbox" value=""
                                            id="fullRestraintTop">
                                        <label class="form-check-label input-label px-2 fw-400 fs-16"
                                            for="fullRestraintTop">
                                            Full Restraint Top Flange
                                        </label>
                                    </div>
                                </div>
                                <div class="row py-2">
                                    <span class="fs-14 fw-500" style=" color: #5C5C5C; opacity: 78%;">Position</span>
                                    <div class="d-flex justify-content-start py-2">
                                        <div class="form-check mx-2">
                                            <input class="form-check-input fs-16" type="radio" name="Element-2"
                                                :value="true" v-model="loadInput" id="Characteristic-2">
                                            <label class="form-check-label fs-16 fw-400" style="opacity: 78%;"
                                                for="Characteristic-2">
                                                Absolute
                                            </label>
                                        </div>
                                        <div class="form-check mx-2">
                                            <input class="form-check-input fs-16" type="radio" name="Element-2"
                                                :value="false" v-model="loadInput" id="Ultimate-3">
                                            <label class="form-check-label fs-16 fw-400" style="opacity: 78%;"
                                                for="Ultimate-3">
                                                Relative
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div class="row py-2">
                                    <span class="fs-14 fw-500" style=" color: #5C5C5C; opacity: 78%;">To top flange</span>
                                    <div class="d-flex justify-content-start py-2">
                                        <div class="position-relative">
                                            <input type="text" class="form-control fs-16"
                                                style="height: 36px; width:278px;">
                                            <button type="button"
                                                class="btn btn-primary px-2 position-absolute fs-14 fw-400 my-1 py-1"
                                                style="background-color: #125CCB; top: 2px; right: 3px;height: 28px; width: 80px;">
                                                + Add
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div class="row py-2">
                                    <div class="d-flex justify-content-start py-2">
                                        <div class="position-relative">
                                            <input type="text" class="form-control fs-16"
                                                style="height: 36px; width:278px;">
                                            <span class="position-absolute fs-14 fw-500 my-1 py-1"
                                                style="color: #B61C1C; top: 2px; right: 10px;height: 28px;">
                                                Remove
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div class="row py-2">
                                    <div class="d-flex justify-content-start py-2">
                                        <div class="position-relative">
                                            <input type="text" class="form-control fs-16"
                                                style="height: 36px; width:278px;">
                                            <span class="position-absolute fs-14 fw-500 my-1 py-1"
                                                style="color: #B61C1C; top: 2px; right: 10px;height: 28px;">
                                                Remove
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div class="row py-2">
                                    <div class="form-check d-flex justify-content-start py-2 mx-4">
                                        <input class="form-check-input fs-16" type="checkbox" value=""
                                            id="fullRestraintBottom">
                                        <label class="form-check-label input-label px-2 fw-400 fs-16"
                                            for="fullRestraintBottom">
                                            Full Restraint Bottom Flange
                                        </label>
                                    </div>
                                </div>
                                <div class="row py-2">
                                    <span class="fs-14 fw-500" style=" color: #5C5C5C; opacity: 78%;">Position</span>
                                    <div class="d-flex justify-content-start py-2">
                                        <div class="form-check mx-2">
                                            <input class="form-check-input fs-16" type="radio" name="Element-1"
                                                :value="true" v-model="loadInput" id="Characteristic-1">
                                            <label class="form-check-label fs-16 fw-400" style="opacity: 78%;"
                                                for="Characteristic-1">
                                                Absolute
                                            </label>
                                        </div>
                                        <div class="form-check mx-2">
                                            <input class="form-check-input fs-16" type="radio" name="Element-1"
                                                :value="false" v-model="loadInput" id="Ultimate-1">
                                            <label class="form-check-label fs-16 fw-400" style="opacity: 78%;"
                                                for="Ultimate-1">
                                                Relative
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div class="row py-2">
                                    <span class="fs-14 fw-500" style=" color: #5C5C5C; opacity: 78%;">To top flange</span>
                                    <div class="d-flex justify-content-start py-2">
                                        <div class="position-relative">
                                            <input type="text" class="form-control fs-16"
                                                style="height: 36px; width:278px;">
                                            <button type="button" class="btn px-2 position-absolute fs-14 fw-400 my-1 py-1"
                                                style="color:#FFFFFF ; background-color: #626262; top: 2px; right: 3px;height: 28px; width: 80px;">
                                                + Add
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div class="row py-2">
                                    <div class="d-flex justify-content-start py-2">
                                        <div class="position-relative">
                                            <input type="text" class="form-control fs-16"
                                                style="height: 36px; width:278px;">
                                            <span class="position-absolute fs-14 fw-500 my-1 py-1"
                                                style="color: #B61C1C; top: 2px; right: 10px;height: 28px;">
                                                Remove
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div class="row py-2">
                                    <div class="d-flex justify-content-start py-2">
                                        <div class="position-relative">
                                            <input type="text" class="form-control fs-16"
                                                style="height: 36px; width:278px;">
                                            <span class="position-absolute fs-14 fw-500 my-1 py-1"
                                                style="color: #B61C1C; top: 2px; right: 10px;height: 28px;">
                                                Remove
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-8 d-flex align-items-center justify-content-center">

                                <img style="width: 100%;" src="/src/assets/img/view-3.png" alt="">

                            </div>
                        </div>

                    </template>
                </sub-panel>
            </template>
        </panel>
        <panel label="Verifications" icon="/src/assets/img/verifications.png" size="col-lg-12">
            <template v-slot:body>
                <sub-panel label="Top Flange Verification">
                    <template v-slot:body>
                        <span class="fs-16 fw-600 px-3" style="color: #125CCB;">Maximum Utilization is 1.67</span>
                        <div class="row px-4 py-3">
                            <table class="table table-bordered text-center">
                                <thead>
                                    <tr class="fs-14 fw-500"
                                        style="background-color:#F6F6F6;height: 48px; color: #5C5C5C;vertical-align: middle;">
                                        <td style="width: 18%;">From(M)</td>
                                        <td style="width: 18%;">To(M)</td>
                                        <td style="width: 18%;">Design force (kN)</td>
                                        <td style="width: 18%;">Resistance (kN)</td>
                                        <td style="width: 18%;">Utilization</td>
                                        <td style="width: 10%;">Detail</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr class="fs-14 fw-500 py-0"
                                        style="height: 48px;color: #5C5C5C;vertical-align: middle;">
                                        <td>0</td>
                                        <td>15</td>
                                        <td>136</td>
                                        <td>82</td>
                                        <td>1.67</td>
                                        <td>
                                            <img src="/src/assets/img/info-circle.png" alt="">
                                        </td>
                                    </tr>
                                    <tr class="fs-14 fw-500 py-0"
                                        style="height: 48px;color: #5C5C5C;vertical-align: middle;">
                                        <td>15</td>
                                        <td>20</td>
                                        <td>136</td>
                                        <td>525</td>
                                        <td>0.26</td>
                                        <td>
                                            <img src="/src/assets/img/info-circle.png" alt="">
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="row px-4 py-3">
                            <div class="col-5 position-relative">
                                <div class="row border-left-green">
                                    <div class="row px-5">
                                        <div class="col-lg-3 p-0 py-1">
                                            <label for="exampleFormControlInput1" style="height: 36px; width: 200px;"
                                                class="form-label mb-0 d-flex input-label px-3 py-2">Segment from</label>
                                        </div>
                                        <div class="col-lg-8 py-1">
                                            <div class="form-check d-flex justify-content-between">
                                                <div class="col-5 form-label mb-0 input-label d-flex justify-content-between px-3"
                                                    style="background-color: #F5F5F5;height: 36px; width: 180px; padding-top: 8px;">
                                                    <span class="justify-content-start">15</span>
                                                    <span class="justify-content-end">mm</span>
                                                </div>
                                                <div
                                                    class="form-label mb-0 input-label d-flex justify-content-between px-3 py-2">
                                                    to</div>
                                                <div class="col-5 form-label mb-0 input-label d-flex justify-content-between px-3"
                                                    style="background-color: #F5F5F5;height: 36px; width: 180px; padding-top: 8px;">
                                                    <span class="justify-content-start">20</span>
                                                    <span class="justify-content-end">mm</span>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <div class="row px-5">
                                        <div class="col-lg-3 p-0 py-1">
                                            <label for="exampleFormControlInput1" style="height: 36px; width: 200px;"
                                                class="form-label mb-0 d-flex input-label px-3 py-2">Force due to
                                                moment</label>
                                        </div>
                                        <div class="col-lg-8 py-1">
                                            <div class="form-check ">
                                                <div class="form-label mb-0 input-label d-flex justify-content-between px-3"
                                                    style="background-color: #F5F5F5;height: 36px; width: 398px; padding-top: 8px;">
                                                    <span class="justify-content-start">135</span>
                                                    <span class="justify-content-end">kN</span>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <div class="row px-5">
                                        <div class="col-lg-3 p-0 py-1">
                                            <label for="exampleFormControlInput1" style="height: 36px; width: 200px;"
                                                class="form-label mb-0 d-flex input-label px-3 py-2">Effective Area</label>
                                        </div>
                                        <div class="col-lg-8 py-1">
                                            <div class="form-check ">
                                                <div class="form-label mb-0 input-label d-flex justify-content-between px-3"
                                                    style="background-color: #F5F5F5;height: 36px; width: 398px; padding-top: 8px;">
                                                    <span class="justify-content-start">135</span>
                                                    <span class="justify-content-end">kN</span>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <div class="row px-5">
                                        <div class="col-lg-3 p-0 py-1">
                                            <label for="exampleFormControlInput1" style="height: 36px; width: 200px;"
                                                class="form-label mb-0 d-flex input-label px-3 py-2">Correction factor
                                                kc</label>
                                        </div>
                                        <div class="col-lg-8 py-1">
                                            <div class="form-check ">
                                                <div class="form-label mb-0 input-label d-flex justify-content-between px-3"
                                                    style="background-color: #F5F5F5;height: 36px; width: 398px; padding-top: 8px;">
                                                    <span class="justify-content-start">0.77</span>
                                                    <!-- <span class="justify-content-end">kN</span> -->
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <div class="row px-5">
                                        <div class="col-lg-3 p-0 py-1">
                                            <label for="exampleFormControlInput1" style="height: 36px; width: 200px;"
                                                class="form-label mb-0 d-flex input-label px-3 py-2">Total</label>
                                        </div>
                                        <div class="col-lg-8 py-1">
                                            <div class="form-check ">
                                                <div class="form-label mb-0 input-label d-flex justify-content-between px-3"
                                                    style="background-color: #F5F5F5;height: 36px; width: 398px; padding-top: 8px;">
                                                    <span class="justify-content-start">136</span>
                                                    <span class="justify-content-end">kN</span>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-5 position-relative">
                                <div class="row border-left-green">
                                    <div class="row px-5">
                                        <div class="col-lg-3 p-0 py-1">
                                            <label for="exampleFormControlInput1" style="height: 36px; width: 200px;"
                                                class="form-label mb-0 d-flex input-label px-3 py-2">Segment length</label>
                                        </div>
                                        <div class="col-lg-8 py-1">
                                            <div class="form-check ">
                                                <div class="form-label mb-0 input-label d-flex justify-content-between px-3"
                                                    style="background-color: #F5F5F5;height: 36px; width: 398px; padding-top: 8px;">
                                                    <span class="justify-content-start">5000</span>
                                                    <span class="justify-content-end">mm</span>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <div class="row px-5">
                                        <div class="col-lg-3 p-0 py-1">
                                            <label for="exampleFormControlInput1" style="height: 36px; width: 200px;"
                                                class="form-label mb-0 d-flex input-label px-3 py-2">Slenderness</label>
                                        </div>
                                        <div class="col-lg-8 py-1">
                                            <div class="form-check ">
                                                <div class="form-label mb-0 input-label d-flex justify-content-between px-3"
                                                    style="background-color: #F5F5F5;height: 36px; width: 398px; padding-top: 8px;">
                                                    <span class="justify-content-start">0.847</span>
                                                    <!-- <span class="justify-content-end">kN</span> -->
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <div class="row px-5">
                                        <div class="col-lg-3 p-0 py-1">
                                            <label for="exampleFormControlInput1" style="height: 36px; width: 200px;"
                                                class="form-label mb-0 d-flex input-label px-3 py-2">Resistance</label>
                                        </div>
                                        <div class="col-lg-8 py-1">
                                            <div class="form-check ">
                                                <div class="form-label mb-0 input-label d-flex justify-content-between px-3"
                                                    style="background-color: #F5F5F5;height: 36px; width: 398px; padding-top: 8px;">
                                                    <span class="justify-content-start">525</span>
                                                    <span class="justify-content-end">kN</span>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <div class="row px-5">
                                        <div class="col-lg-3 p-0 py-1">
                                            <label for="exampleFormControlInput1" style="height: 36px; width: 200px;"
                                                class="form-label mb-0 d-flex input-label px-3 py-2">Force from
                                                axial</label>
                                        </div>
                                        <div class="col-lg-8 py-1">
                                            <div class="form-check ">
                                                <div class="form-label mb-0 input-label d-flex justify-content-between px-3"
                                                    style="background-color: #F5F5F5;height: 36px; width: 398px; padding-top: 8px;">
                                                    <span class="justify-content-start">1</span>
                                                    <span class="justify-content-end">kN</span>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <div class="row px-5">
                                        <div class="col-lg-3 p-0 py-1">
                                            <label for="exampleFormControlInput1" style="height: 36px; width: 200px;"
                                                class="form-label mb-0 d-flex input-label px-3 py-2">Utilisation</label>
                                        </div>
                                        <div class="col-lg-8 py-1">
                                            <div class="form-check ">
                                                <div class="form-label mb-0 input-label d-flex justify-content-between px-3"
                                                    style="background-color: #F5F5F5;height: 36px; width: 398px; padding-top: 8px;">
                                                    <span class="justify-content-start">0.26</span>
                                                    <!-- <span class="justify-content-end">kN</span> -->
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </template>
                </sub-panel>
                <sub-panel label="View">
                    <template v-slot:body>
                        <img style="width: 100%;" src="/src/assets/img/view-4.png" alt="">

                    </template>
                </sub-panel>
                <sub-panel label="Bottom Flange Verification">
                    <template v-slot:body>
                        <span class="fs-16 fw-600 px-3" style="color: #125CCB;">Maximum Utilization is 1.67</span>
                        <div class="row px-4 py-3">
                            <table class="table table-bordered text-center">
                                <thead>
                                    <tr class="fs-14 fw-500"
                                        style="background-color:#F6F6F6;height: 48px; color: #5C5C5C;vertical-align: middle;">
                                        <td style="width: 18%;">From(M)</td>
                                        <td style="width: 18%;">To(M)</td>
                                        <td style="width: 18%;">Design force (kN)</td>
                                        <td style="width: 18%;">Resistance (kN)</td>
                                        <td style="width: 18%;">Utilization</td>
                                        <td style="width: 10%;">Detail</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr class="fs-14 fw-500 py-0"
                                        style="height: 48px;color: #5C5C5C;vertical-align: middle;">
                                        <td>0</td>
                                        <td>15</td>
                                        <td>136</td>
                                        <td>82</td>
                                        <td>1.67</td>
                                        <td>
                                            <img src="/src/assets/img/info-circle.png" alt="">
                                        </td>
                                    </tr>
                                    <tr class="fs-14 fw-500 py-0"
                                        style="height: 48px;color: #5C5C5C;vertical-align: middle;">
                                        <td>15</td>
                                        <td>20</td>
                                        <td>136</td>
                                        <td>525</td>
                                        <td>0.26</td>
                                        <td>
                                            <img src="/src/assets/img/info-circle.png" alt="">
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="row px-4 py-3">
                            <div class="col-5 position-relative">
                                <div class="row border-left-green">
                                    <div class="row px-5">
                                        <div class="col-lg-3 p-0 py-1">
                                            <label for="exampleFormControlInput1" style="height: 36px; width: 200px;"
                                                class="form-label mb-0 d-flex input-label px-3 py-2">Segment from</label>
                                        </div>
                                        <div class="col-lg-8 py-1">
                                            <div class="form-check d-flex justify-content-between">
                                                <div class="col-5 form-label mb-0 input-label d-flex justify-content-between px-3"
                                                    style="background-color: #F5F5F5;height: 36px; width: 180px; padding-top: 8px;">
                                                    <span class="justify-content-start">15</span>
                                                    <span class="justify-content-end">mm</span>
                                                </div>
                                                <div
                                                    class="form-label mb-0 input-label d-flex justify-content-between px-3 py-2">
                                                    to</div>
                                                <div class="col-5 form-label mb-0 input-label d-flex justify-content-between px-3"
                                                    style="background-color: #F5F5F5;height: 36px; width: 180px; padding-top: 8px;">
                                                    <span class="justify-content-start">20</span>
                                                    <span class="justify-content-end">mm</span>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <div class="row px-5">
                                        <div class="col-lg-3 p-0 py-1">
                                            <label for="exampleFormControlInput1" style="height: 36px; width: 200px;"
                                                class="form-label mb-0 d-flex input-label px-3 py-2">Force due to
                                                moment</label>
                                        </div>
                                        <div class="col-lg-8 py-1">
                                            <div class="form-check ">
                                                <div class="form-label mb-0 input-label d-flex justify-content-between px-3"
                                                    style="background-color: #F5F5F5;height: 36px; width: 398px; padding-top: 8px;">
                                                    <span class="justify-content-start">135</span>
                                                    <span class="justify-content-end">kN</span>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <div class="row px-5">
                                        <div class="col-lg-3 p-0 py-1">
                                            <label for="exampleFormControlInput1" style="height: 36px; width: 200px;"
                                                class="form-label mb-0 d-flex input-label px-3 py-2">Effective Area</label>
                                        </div>
                                        <div class="col-lg-8 py-1">
                                            <div class="form-check ">
                                                <div class="form-label mb-0 input-label d-flex justify-content-between px-3"
                                                    style="background-color: #F5F5F5;height: 36px; width: 398px; padding-top: 8px;">
                                                    <span class="justify-content-start">135</span>
                                                    <span class="justify-content-end">kN</span>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <div class="row px-5">
                                        <div class="col-lg-3 p-0 py-1">
                                            <label for="exampleFormControlInput1" style="height: 36px; width: 200px;"
                                                class="form-label mb-0 d-flex input-label px-3 py-2">Correction factor
                                                kc</label>
                                        </div>
                                        <div class="col-lg-8 py-1">
                                            <div class="form-check ">
                                                <div class="form-label mb-0 input-label d-flex justify-content-between px-3"
                                                    style="background-color: #F5F5F5;height: 36px; width: 398px; padding-top: 8px;">
                                                    <span class="justify-content-start">0.77</span>
                                                    <!-- <span class="justify-content-end">kN</span> -->
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <div class="row px-5">
                                        <div class="col-lg-3 p-0 py-1">
                                            <label for="exampleFormControlInput1" style="height: 36px; width: 200px;"
                                                class="form-label mb-0 d-flex input-label px-3 py-2">Total</label>
                                        </div>
                                        <div class="col-lg-8 py-1">
                                            <div class="form-check ">
                                                <div class="form-label mb-0 input-label d-flex justify-content-between px-3"
                                                    style="background-color: #F5F5F5;height: 36px; width: 398px; padding-top: 8px;">
                                                    <span class="justify-content-start">136</span>
                                                    <span class="justify-content-end">kN</span>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-5 position-relative">
                                <div class="row border-left-green">
                                    <div class="row px-5">
                                        <div class="col-lg-3 p-0 py-1">
                                            <label for="exampleFormControlInput1" style="height: 36px; width: 200px;"
                                                class="form-label mb-0 d-flex input-label px-3 py-2">Segment length</label>
                                        </div>
                                        <div class="col-lg-8 py-1">
                                            <div class="form-check ">
                                                <div class="form-label mb-0 input-label d-flex justify-content-between px-3"
                                                    style="background-color: #F5F5F5;height: 36px; width: 398px; padding-top: 8px;">
                                                    <span class="justify-content-start">5000</span>
                                                    <span class="justify-content-end">mm</span>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <div class="row px-5">
                                        <div class="col-lg-3 p-0 py-1">
                                            <label for="exampleFormControlInput1" style="height: 36px; width: 200px;"
                                                class="form-label mb-0 d-flex input-label px-3 py-2">Slenderness</label>
                                        </div>
                                        <div class="col-lg-8 py-1">
                                            <div class="form-check ">
                                                <div class="form-label mb-0 input-label d-flex justify-content-between px-3"
                                                    style="background-color: #F5F5F5;height: 36px; width: 398px; padding-top: 8px;">
                                                    <span class="justify-content-start">0.847</span>
                                                    <!-- <span class="justify-content-end">kN</span> -->
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <div class="row px-5">
                                        <div class="col-lg-3 p-0 py-1">
                                            <label for="exampleFormControlInput1" style="height: 36px; width: 200px;"
                                                class="form-label mb-0 d-flex input-label px-3 py-2">Resistance</label>
                                        </div>
                                        <div class="col-lg-8 py-1">
                                            <div class="form-check ">
                                                <div class="form-label mb-0 input-label d-flex justify-content-between px-3"
                                                    style="background-color: #F5F5F5;height: 36px; width: 398px; padding-top: 8px;">
                                                    <span class="justify-content-start">525</span>
                                                    <span class="justify-content-end">kN</span>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <div class="row px-5">
                                        <div class="col-lg-3 p-0 py-1">
                                            <label for="exampleFormControlInput1" style="height: 36px; width: 200px;"
                                                class="form-label mb-0 d-flex input-label px-3 py-2">Force from
                                                axial</label>
                                        </div>
                                        <div class="col-lg-8 py-1">
                                            <div class="form-check ">
                                                <div class="form-label mb-0 input-label d-flex justify-content-between px-3"
                                                    style="background-color: #F5F5F5;height: 36px; width: 398px; padding-top: 8px;">
                                                    <span class="justify-content-start">1</span>
                                                    <span class="justify-content-end">kN</span>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <div class="row px-5">
                                        <div class="col-lg-3 p-0 py-1">
                                            <label for="exampleFormControlInput1" style="height: 36px; width: 200px;"
                                                class="form-label mb-0 d-flex input-label px-3 py-2">Utilisation</label>
                                        </div>
                                        <div class="col-lg-8 py-1">
                                            <div class="form-check ">
                                                <div class="form-label mb-0 input-label d-flex justify-content-between px-3"
                                                    style="background-color: #F5F5F5;height: 36px; width: 398px; padding-top: 8px;">
                                                    <span class="justify-content-start">0.26</span>
                                                    <!-- <span class="justify-content-end">kN</span> -->
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </template>
                </sub-panel>
                <sub-panel label="View">
                    <template v-slot:body>
                        <img style="width: 100%;" src="/src/assets/img/view-4.png" alt="">

                    </template>
                </sub-panel>
                <sub-panel label="Web verification">
                    <template v-slot:body>
                        <div class="row py-2">
                            <div class="form-check d-flex justify-content-start mx-4">

                                <label class="form-check-label input-label fw-500 fs-16" for="include">
                                    Include local buckling?
                                </label>
                                <input class="form-check-input fw-500 fs-16" style="margin-left : 0" type="checkbox"
                                    value="" id="include">
                            </div>
                        </div>
                        <div class="row">
                            <div class="form-check d-flex justify-content-start mx-4 my-3">
                                <span class="fs-16 fw-600" style="color: #125CCB;">Maximum Utilization is 0.14 as left end with 1.5 mm web</span>
                            </div>                           
                        </div>

                        <div>
                            <img class="px-5" style="width: 100%;" src="/src/assets/img/include-header.png" alt="">
                            <img class="px-5" style="width: 100%;" src="/src/assets/img/include-body.png" alt="">
                        </div>
                        

                    </template>
                </sub-panel>
            </template>
        </panel>
        <div class="row d-flex justify-content-end py-5">
            <button type="button" class="btn px-2 fs-16 fw-500 mx-2" @click="clearForm"
                style="background-color: #F4F4F4; width: 196px; height: 42px; color: #125CCB;">Clear All</button>
            <button type="button" class="btn btn-primary px-2 fs-16 fw-500  mx-2" @click="nextStep"
                style="background-color: #125CCB; width: 196px; height: 42px;">Next</button>
        </div>
    </div>
</template>
<style scoped>
/* .border-left-green{

   
} */

.border-left-green::before {
    content: '';
    border-left: 4px solid #69C179;
    position: absolute;
    height: 90%;
    left: 0;
    top: 5%;
}
</style>