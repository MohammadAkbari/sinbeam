<script setup lang="ts">
import { ref } from 'vue';


const loadInput = ref(true as boolean)



const designTypes = [
    { id: 1, label: 'UK NA', image: 'src/assets/img/UK-icon.png' },
    { id: 1, label: 'Irish NA', image: 'src/assets/img/irish-icon.png' },
    { id: 1, label: 'IR NA', image: 'src/assets/img/IR-icon.png' },
]


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

                                <img style="width: 100%;" src="src/assets/img/view-3.png" alt="">

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
                                            <img src="src/assets/img/info-circle.png" alt="">
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
                                            <img src="src/assets/img/info-circle.png" alt="">
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                    </template>
                </sub-panel>
                <sub-panel label="View">
                    <template v-slot:body>
                        <img style="width: 100%;" src="src/assets/img/view-4.png" alt="">

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
                                            <img src="src/assets/img/info-circle.png" alt="">
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
                                            <img src="src/assets/img/info-circle.png" alt="">
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                    </template>
                </sub-panel>
                <sub-panel label="View">
                    <template v-slot:body>
                        <img style="width: 100%;" src="src/assets/img/view-4.png" alt="">

                    </template>
                </sub-panel>
            </template>
        </panel>
    </div>
</template>