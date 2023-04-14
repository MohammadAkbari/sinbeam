<script setup lang="ts">
import type Link from '@/models/link';
import type ApiServise from '@/core/services/api.service';

import { inject, reactive, ref, watch } from 'vue';
import constants from '@/shared/globals/constants';
import type BeamDto from '@/models/beamDto';
import type ListItem from '@/models/listItem';
import type LoadingDto from '@/models/loadingDto';

import panel from '@/shared/components/panel.vue';
import inputNumber from '@/shared/components/inputNumber.vue';
import checkBox from '@/shared/components/checkBox.vue';
import singleSelect from '@/shared/components/singleSelect.vue';
import radioGroupButton from '@/shared/components/radioGroupButton.vue';





export interface Props {
    links: Link[]
}

const props = withDefaults(defineProps<Props>(), {});
const emit = defineEmits(['nextStep', 'saveLinks']);

const apiServise = inject('apiServise') as ApiServise;

const loadingDto = ref({} as LoadingDto);


apiServise.callApi(props.links, constants.loading.getLoading).then((data: LoadingDto) => {
    loadingDto.value = data;
    emit('saveLinks', data._links)
})


</script>


<template>

    <!-- <radio-group-button /> -->










    <panel label="loading">
        <template v-slot:body>



        </template>
    </panel>
</template>
