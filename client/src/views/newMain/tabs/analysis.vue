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
        <panel label="Analysis" icon="/src/assets/img/analysis.png" size="col-lg-12">
            <template v-slot:body>
                <div class="row px-2 py-3">
                    <div class="d-flex justify-content-start ">
                        <span class="fs-14 fw-500 mx-4" style="opacity: 78%;">Combination:</span>
                        <div class="form-check mx-4">
                            <input class="form-check-input fs-16" type="radio" name="Element" value="C1"
                                 id="Characteristic">
                            <label class="form-check-label fs-16 fw-400" style="opacity: 78%;" for="Characteristic">
                                C1
                            </label>
                        </div>
                        <div class="form-check mx-4">
                            <input class="form-check-input fs-16" type="radio" name="Element" value="false"
                                 id="Ultimate">
                            <label class="form-check-label fs-16 fw-400" style="opacity: 78%;" for="Ultimate">
                                C2
                            </label>
                        </div>
                        <div class="form-check mx-4">
                            <input class="form-check-input fs-16" type="radio" name="Element" value="false"
                                 id="Ultimate">
                            <label class="form-check-label fs-16 fw-400" style="opacity: 78%;" for="Ultimate">
                                C3
                            </label>
                        </div>
                        <div class="form-check mx-4">
                            <input class="form-check-input fs-16" type="radio" name="Element" value="false"
                                 id="Ultimate">
                            <label class="form-check-label fs-16 fw-400" style="opacity: 78%;" for="Ultimate">
                                C4
                            </label>
                        </div>
                        <div class="form-check mx-4">
                            <input class="form-check-input fs-16" type="radio" name="Element" value="false"
                                 id="Ultimate">
                            <label class="form-check-label fs-16 fw-400" style="opacity: 78%;" for="Ultimate">
                                C5
                            </label>
                        </div>
                    </div>
                </div>



                <sub-panel label="Bending">
                    <template v-slot:body>
                        <div class="row">
                            <div class="col-4">
                                <div class="row">
                                    <div class="col-lg-4 p-0 py-1">
                                        <label for="exampleFormControlInput1" style="height: 36px; width: 200px;"
                                            class="form-label mb-0 d-flex input-label px-3 py-2">Max moment</label>
                                    </div>
                                    <div class="col-lg-8 py-1">
                                        <div class="form-check ">
                                            <div class="form-label mb-0 input-label d-flex justify-content-between px-3"
                                                style="background-color: #F5F5F5;height: 36px; width: 200px; padding-top: 8px;">
                                                <span class="justify-content-start">37.9485 kNm at 1.2m</span>                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-lg-4 p-0 py-1">
                                        <label for="exampleFormControlInput1" style="height: 36px; width: 200px;"
                                            class="form-label mb-0 d-flex input-label px-3 py-2">Min moment</label>
                                    </div>
                                    <div class="col-lg-8 py-1">
                                        <div class="form-check ">
                                            <div class="form-label mb-0 input-label d-flex justify-content-between px-3"
                                                style="background-color: #F5F5F5;height: 36px; width: 200px; padding-top: 8px;">
                                                <span class="justify-content-start">0.0000 kNm at 1.2m</span>                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-8">
                                <span class="fs-14 fw-500 chart-title" style="">Bending moment kNm</span>
                                <img src="src/assets/img/chart-1.png" alt="">
                            </div>
                        </div>
                    </template>
                </sub-panel>
                <sub-panel label="Shear">
                    <template v-slot:body>
                        <div class="row">
                            <div class="col-4">
                                <div class="row">
                                    <div class="col-lg-4 p-0 py-1">
                                        <label for="exampleFormControlInput1" style="height: 36px; width: 200px;"
                                            class="form-label mb-0 d-flex input-label px-3 py-2">Max Shear</label>
                                    </div>
                                    <div class="col-lg-8 py-1">
                                        <div class="form-check ">
                                            <div class="form-label mb-0 input-label d-flex justify-content-between px-3"
                                                style="background-color: #F5F5F5;height: 36px; width: 200px; padding-top: 8px;">
                                                <span class="justify-content-start">7.5900 kNm at 1.2m</span>                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-lg-4 p-0 py-1">
                                        <label for="exampleFormControlInput1" style="height: 36px; width: 200px;"
                                            class="form-label mb-0 d-flex input-label px-3 py-2">Min Shear</label>
                                    </div>
                                    <div class="col-lg-8 py-1">
                                        <div class="form-check ">
                                            <div class="form-label mb-0 input-label d-flex justify-content-between px-3"
                                                style="background-color: #F5F5F5;height: 36px; width: 200px; padding-top: 8px;">
                                                <span class="justify-content-start">-7.5900 kNm at 1.2m</span>                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-8">
                                <span class="fs-14 fw-500 chart-title" style="">Shear force (kN)</span>
                                <img src="src/assets/img/chart-2.png" alt="">
                            </div>
                        </div>
                    </template>
                </sub-panel>
                <sub-panel label="Deflection">
                    <template v-slot:body>
                        <div class="row">
                            <div class="col-4">
                                <div class="row">
                                    <div class="col-lg-4 p-0 py-1">
                                        <label for="exampleFormControlInput1" style="height: 36px; width: 200px;"
                                            class="form-label mb-0 d-flex input-label px-3 py-2">Max deflection</label>
                                    </div>
                                    <div class="col-lg-8 py-1">
                                        <div class="form-check ">
                                            <div class="form-label mb-0 input-label d-flex justify-content-between px-3"
                                                style="background-color: #F5F5F5;height: 36px; width: 200px; padding-top: 8px;">
                                                <span  class="justify-content-start">8.5000 kNm at 1.2m</span>                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>                                
                            </div>
                            <div class="col-8">
                                <span class="fs-14 fw-500 chart-title" style="">Deflection (mm)</span>
                                <img src="src/assets/img/chart-3.png" alt="">
                            </div>
                        </div>
                    </template>
                </sub-panel>
            </template>
        </panel>
    </div>
</template>

<style scoped>
.chart-title {
    writing-mode: vertical-lr;
    transform: scale(-1, -1);
    color: #404040;
    position: relative;
    top: 20%;
    right: 10px;
}
</style>