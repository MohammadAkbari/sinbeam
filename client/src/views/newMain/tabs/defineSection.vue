<script setup lang="ts">
import type Link from '@/models/link';
import type ApiServise from '@/core/services/api.service';
import constants from '@/shared/globals/newConstants';
import { reactive, ref, onMounted, inject, computed } from 'vue';
import helper from '@/shared/common/helper';
import type WebSection from '@/models/webSection';
import type WebSectionDto from '@/dtos/webSectionDto';
import pager from "@/shared/newComponents/pager.vue";


enum Filter {
    Weight = 1,
    WebHeight = 2,
    WebThickness = 3,
    FlangeWidth = 4,
    FlangeThickness = 5,
    SectionPerimeter = 6,
    MomentOfInertiaIy = 7,
    MomentOfInertiaIz = 8,
    BendingCapacity = 9,
    ShearCapacity = 10,
    AxialCapacity = 11,

    _1 = 'Weight (kg/m)',
    _2 = 'Web height (mm)',
    _3 = 'Web thickness (mm)',
    _4 = 'Flange width (mm)',
    _5 = 'Flange thickness (mm)',
    _6 = 'Section perimeter (m2/m)',
    _7 = 'Moment of inertia Iy (cm4)',
    _8 = 'Moment of inertia Iz (cm4)',
    _9 = 'Bending capacity',
    _10 = 'Shear capacity',
    _11 = 'Axial capacity',
}


export interface Props {
    links: Link[]
}

const props = withDefaults(defineProps<Props>(), {
    //hasCreated: false
});


const apiServise = inject('apiServise') as ApiServise;


const emit = defineEmits(['nextStep', 'clearForm', 'saveLinks']);

const showNoteModal = ref(false as boolean);
const filter = Filter;
let filterList = ref([]);

const webSections = ref([] as Array<WebSection>);
const webSectionDto = ref({} as WebSectionDto)
const pageSize = 15, recordCount = ref(0), currentPage = ref(1)



const displayWebSections = computed(() => {
    recordCount.value = webSections.value.length;
    return webSections.value.filter((u, i) => i >= (currentPage.value - 1) * pageSize).filter((u, i) => i < pageSize);
})

const state = reactive({
    value: [10, 100],
    value2: 40,
});

let filterItems = [];

onMounted(() => {
    apiServise.callApi(props.links, constants.sections.getSection).then((data) => {
        console.log(data);
        emit('saveLinks', data._links);

        apiServise.callApi(props.links, constants.sections.getSectionsFilters).then((data) => {
            filterItems = Object.entries(data);

            filterList.value = helper.convertEnumToListItem(Filter).map((item) => {
                const filter = filterItems.find(e => e[0].toLocaleLowerCase() == Filter[item.id].toLocaleLowerCase())
                return { ...item, ...(filter[1]), minValue: filter[1].min, maxValue: filter[1].max }
            });
        });;
    });
})

const changeFilter = (event, item) => {
    item.minValue = event[0];
    item.maxValue = event[1];

    const model = {};

    filterList.value.forEach((filter) => {
        if (filter.minValue != filter.min || filter.maxValue != filter.max) {
            const minfield = Filter[filter.id] + '.min';
            const maxfield = Filter[filter.id] + '.max';

            model[minfield] = filter.minValue;
            model[maxfield] = filter.maxValue;
        }
    });

    apiServise.callApi(props.links, constants.sections.querySections, model).then((data) => {
        webSections.value = data;

    })
}

const currentPageChange = (val: number) => {
    debugger
    currentPage.value = val;
}

const getResultMode = (item) => {
    console.log(item);
    apiServise.callApiByLink(item._links[0]).then((data) => {
        webSectionDto.value = data;       
        emit('saveLinks', data._links);
    })


    showNoteModal.value = false;
}



const nextStep = () => {
    apiServise.callApi(props.links, constants.sections.saveSection).then(data => {
     
        
        emit("nextStep");
    });
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
                                            class="form-label mb-0 d-flex justify-content-center input-label py-2 fs-16">{{ webSectionDto.key }}</label>
                                    </div>
                                    <!-- <div class="col-lg-8 py-1">
                                        <div class="form-check d-flex justify-content-center py-2">
                                            <input class="form-check-input fs-16" type="checkbox" value=""
                                                id="flexCheckDefault">
                                            <label class="form-check-label input-label px-2  fs-16" for="flexCheckDefault">
                                                Default checkbox
                                            </label>
                                        </div>
                                    </div> -->
                                </div>
                                <!-- <div class="row px-5">
                                    <div class="col-lg-4 p-0 py-1">
                                        <label for="exampleFormControlInput1" style="height: 36px; width: 200px;"
                                            class="form-label mb-0 d-flex input-label px-3 py-2">Web depth, right</label>
                                    </div>
                                    <div class="col-lg-8 py-1">
                                        <div class="form-check ">
                                            <div class="form-label mb-0 input-label d-flex justify-content-between px-3"
                                                style="background-color: #F5F5F5;height: 36px; width: 200px; padding-top: 8px;">
                                                <span class="justify-content-start">{{webSectionDto.webDepth}}</span>
                                                <span class="justify-content-end">mm</span>
                                            </div>

                                        </div>
                                    </div>
                                </div> -->
                                <div class="row px-5">
                                    <div class="col-lg-4 p-0 py-1">
                                        <label for="exampleFormControlInput1" style="height: 36px; width: 200px;"
                                            class="form-label mb-0 d-flex input-label px-3 py-2">Web depth</label>
                                    </div>
                                    <div class="col-lg-8 py-1">
                                        <div class="form-check ">
                                            <div class="form-label mb-0 input-label d-flex justify-content-between px-3"
                                                style="background-color: #F5F5F5;height: 36px; width: 200px; padding-top: 8px;">
                                                <span class="justify-content-start">{{ webSectionDto.webDepth }}</span>
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
                                                <span class="justify-content-start">{{ webSectionDto.webThickness }}</span>
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
                                                <span class="justify-content-start">{{ webSectionDto.webSteel }}</span>
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
                                                <span
                                                    class="justify-content-start">{{ webSectionDto.topFlangeThickness }}</span>
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
                                                <span class="justify-content-start">{{ webSectionDto.topFlangeWidth }}</span>
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
                                                <span class="justify-content-start">{{ webSectionDto.topFlangeSteel }}</span>
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
                                                <span
                                                    class="justify-content-start">{{ webSectionDto.bottomFlangeThickness }}</span>
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
                                                <span
                                                    class="justify-content-start">{{ webSectionDto.bottomFlangeWidth }}</span>
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
                                                <span
                                                    class="justify-content-start">{{ webSectionDto.bottomFlangeSteel }}</span>
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
                                    <iron :top="webSectionDto.design?.topFlange"
                                        :bottom="webSectionDto.design?.bottomFlange" :center="webSectionDto.design?.web">
                                    </iron>
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
                        <table class="properties table table-striped table-bordered">
                            <tbody v-if="webSectionDto.properties">
                                <tr v-for="(item, index) in helper.chunks(webSectionDto.properties, 3)" :key="index">
                                    <td v-for="(item1, index1) in item" :key="index1">{{ item1 }}</td>
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
        @closeModal="showNoteModal = !showNoteModal" width="95%" height="800px">
        <div class="row">
            <div class="col-3 px-5" v-for="(item) in filterList" :key="item.id">
                <img src="/src/assets/img/info-circle.png" alt="">
                <label class="fs-14 fw-500 py-2 px-2" for="" style="color: #3F3F3F;">{{ item.title }}</label>
                <dropdown-range style="width: 100%" :min="item.min" :max="item.max"
                    @change="changeFilter($event, item)"></dropdown-range>
            </div>
            <!-- <div class="col-3 px-5">
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
            </div> -->
            <div class="col-3 px-5">

            </div>
        </div>
        <hr>
        <div class="row">
            <div class="row px-4 py-3" style="overflow-y: scroll;  max-height: 450px;">
                <table class="filter table table-bordered text-center" style="margin-bottom: 0px;">
                    <thead>
                        <tr class="fs-14 fw-500 py-0" style="height: 48px;color: #5C5C5C;vertical-align: middle;">
                            <th style="height: 48px;width:12%;background-color:#F6F6F6;">Section ID</th>
                            <th style="height: 48px;background-color:#F6F6F6;">Weight</th>
                            <th style="height: 48px;background-color:#F6F6F6;">Hw</th>
                            <th style="height: 48px;background-color:#F6F6F6;">TW</th>
                            <th style="height: 48px;background-color:#F6F6F6;">BF</th>
                            <th style="height: 48px;background-color:#F6F6F6;">TF</th>
                            <th style="height: 48px;background-color:#F6F6F6;">2P</th>
                            <th style="height: 48px;background-color:#F6F6F6;">Iy</th>
                            <th style="height: 48px;background-color:#F6F6F6;">Iz</th>
                            <th style="height: 48px;background-color:#F6F6F6;">Mn</th>
                            <th style="height: 48px;background-color:#F6F6F6;">Vn</th>
                            <th style="height: 48px;background-color:#F6F6F6;">Pn</th>
                        </tr>
                    </thead>
                    <tbody>

                        <tr class="fs-14 fw-500 py-0" v-for="(item, index) in displayWebSections" :key="index"
                            style="height: 48px;color: #5C5C5C;vertical-align: middle;">
                            <td style="height: 48px; !important;color: #125CCB;text-decoration: underline;cursor: pointer;"
                                @click="getResultMode(item)">{{ item.key }}</td>
                            <td style="height: 48px; !important">{{ item.weight }}</td>
                            <td style="height: 48px; !important">{{ item.webHeight }}</td>
                            <td style="height: 48px; !important">{{ item.webThickness }}</td>
                            <td style="height: 48px; !important">{{ item.flangeWidth }}</td>
                            <td style="height: 48px; !important">{{ item.flangeThickness }}</td>
                            <td style="height: 48px; !important">{{ item.sectionPerimeter }}</td>
                            <td style="height: 48px; !important">{{ item.momentOfInertiaIy }}</td>
                            <td style="height: 48px; !important">{{ item.momentOfInertiaIz }}</td>
                            <td style="height: 48px; !important">{{ item.bendingCapacity }}</td>
                            <td style="height: 48px; !important">{{ item.shearCapacity }}</td>
                            <td style="height: 48px; !important">{{ item.axialCapacity }}</td>

                        </tr>
                    </tbody>
                </table>
                <pager v-if="recordCount > pageSize" :pageSize="pageSize" :recordCount="recordCount"
                    :currentPage="currentPage - 1" @currentPageChange="currentPageChange($event)"></pager>
            </div>

        </div>
    </vue-modal>
</template>

<style>
.properties td {
    font-size: 16px;
    font-weight: 400;
    padding-left: 35px;
}

.filter td {
    font-size: 16px;
    font-weight: 400;
}

.filter th {
    width: 8%;
}
</style>