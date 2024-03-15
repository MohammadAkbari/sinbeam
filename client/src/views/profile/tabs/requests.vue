<script setup  lang="ts">
import type Link from '@/models/link';
import constants from '@/shared/globals/newConstants';
import { inject, onMounted, ref } from 'vue';
import type ApiServise from '@/core/services/api.service';
import type RequestDto from '@/models/requestDto';


export interface Props {
    links: Link[]
}

const props = withDefaults(defineProps<Props>(), {
    //hasCreated: false
});

const apiServise = inject('apiServise') as ApiServise;

const requestDtos = ref([] as RequestDto[]);
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
    const data = await apiServise.callApi(props.links, constants.admin.requests,model);
    requestDtos.value = data.items;
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
                    <th style="height: 30px;background-color:#F6F6F6;">Name</th>
                    <th style="height: 30px;background-color:#F6F6F6;">Email</th>
                    <th style="height: 30px;background-color:#F6F6F6;">Phone Number</th>
                    <th style="height: 30px;background-color:#F6F6F6;">Created On</th>
                </tr>
            </thead>
            <tbody>
                <tr class="fs-14 fw-500" v-for="(item, index) in requestDtos" :key="index"
                    style="height: 24px; color: #5C5C5C;vertical-align: middle;">

                    <td >{{ index+1 }}</td>
                    <td >{{ item.name }}</td>
                    <td >{{ item.email }}</td>
                    <td >{{ item.phoneNumber }}</td>
                    <td >{{ item.createdOn.split('T')[0] }} - {{
                    item.createdOn.split('T')[1].substring(0, 8) }}</td>
                
                </tr>
            </tbody>
        </table>
        <pager v-if="count > pageSize" :pageSize="pageSize" :recordCount="count" :currentPage="pageCount-1"
        @currentPageChange="currentPageChange($event)"></pager>
    </div>
</template>