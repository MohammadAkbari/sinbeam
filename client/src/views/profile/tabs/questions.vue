<script setup lang="ts">
import type Link from '@/models/link';
import constants from '@/shared/globals/newConstants';
import { inject, onMounted, ref } from 'vue';
import type ApiServise from '@/core/services/api.service';
import type QuestionDto from '@/models/questionDto';
import pager from "@/shared/newComponents/pager.vue";

import DataTable from 'primevue/datatable';
import Column from 'primevue/column';


export interface Props {
    links: Link[]
}

const props = withDefaults(defineProps<Props>(), {
    //hasCreated: false
});

const apiServise = inject('apiServise') as ApiServise;

const questionDtos = ref([] as QuestionDto[]);
const pageCount = ref(1);
const count = ref(1);
const pageSize = ref(10);



onMounted(async () => {
    const model ={
        page:pageCount.value,
        take : pageSize.value
    }

    await getData(model)
})

const getData = async (model :any)=>{
    const data = await apiServise.callApi(props.links, constants.admin.questions,model);
     questionDtos.value = data.items;
    // pageCount.value = data.pageCount
    count.value = data.count 
}


const currentPageChange = async (courrent) => {
    pageCount.value = courrent
    const model ={
        page:pageCount.value,
        take : pageSize.value
    }
    await getData(model)
}



</script>

<template>
    <div class="row px-4" style="height: 500px;">
        <table class="filter table table-bordered text-center" style="margin-bottom: 0px;">
            <thead>
                <tr class="fs-14 fw-500 py-0" style="height: 48px;color: #5C5C5C;vertical-align: middle;">
                    <th style="height: 30px;background-color:#F6F6F6; width: 50px;">row</th>
                    <th style="height: 30px;background-color:#F6F6F6;width: 250px;">email</th>
                    <th style="height: 30px;background-color:#F6F6F6; width: 200px;">Created On</th>
                    <th style="height: 30px;background-color:#F6F6F6;">Message</th>
                </tr>
            </thead>
            <tbody>
                <tr class="fs-14 fw-500" v-for="(item, index) in questionDtos" :key="index"
                    style="height: 24px; color: #5C5C5C;vertical-align: middle;">

                    <td >{{ index+1 }}</td>
                    <td >{{ item.email }}</td>
                    <td >{{ item.createdOn.split('T')[0] }} - {{
                    item.createdOn.split('T')[1].substring(0, 8) }}</td>
                    <td >{{ item.message }}</td>
                </tr>
            </tbody>
        </table>
        <pager v-if="count > pageSize" :pageSize="pageSize" :recordCount="count" :currentPage="pageCount-1"
        @currentPageChange="currentPageChange($event)"></pager>
    </div>

</template>