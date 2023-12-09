﻿<template>
    <div class="" style="margin: 0px; padding: 0px;">
        <div class="col-sm-12">
            <div class="d-flex flex-column" style="background-color: #eaeff2;">
                <div class="d-flex justify-content-center">
                    <span class="page-number-txt margin-r-50 padding-t-5 text-secondary fs-16 fw-500">
                         Showing  {{ currentPage + 1 }} to {{ pageCount }} of  {{ recordCount }} results
                    </span>
                </div>
                <div class="d-flex justify-content-center">
                    <nav aria-label="Page navigation m-0 " style="top:0px !important;">
                        <ul class="pagination">
                            <li class="page-item">
                                <a aria-label="Previous" @click="onPreviousClick()" class="page-link fs-14 fw-500"
                                    style=" color: rgb(101 130 227) !important;">
                                    <span aria-hidden="true" class="fa fa-angle-left "></span>
                                </a>
                            </li>

                            <li v-bind:class="{ 'active': currentPage + 1 == item }" v-for="(item, index) in itemList"
                                :key="index">
                                <a @click="onButtonClick(item)" class="page-link fs-14 fw-500"> {{ item }}</a>
                            </li>

                            <li>
                                <a aria-label="Next" @click="onNextClick()" class="page-link fs-14 fw-500"
                                    style=" color: rgb(101 130 227) !important;">
                                    <span aria-hidden="true" class="fa fa-angle-right"></span>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>

            </div>
        </div>
    </div>
</template>

<script lang="ts">



import { defineComponent, computed, inject } from 'vue';

export default defineComponent({

    name: 'pager',
    props: {
        pageSize: {
            type: Number,
            default: 10
        },
        recordCount: {
            type: Number
        },
        currentPage: {
            type: Number
        },

    },
    emits: ['update:currentPage', 'currentPageChange'],
    setup(props, { emit }) {
        let pageCountLocal = 0;
        let activePageLocal = 0;

        let pageCount = computed(() => {
            return Math.floor(+props.recordCount / +props.pageSize) + (+props.recordCount % +props.pageSize != 0 ? 1 : 0)
        });

        let currentPage = computed({
            get: () => {
                return props.currentPage as number
            },
            set: (val) => {
                emit('update:currentPage', val)
            },
        });

        function pageChange(page: number): void {
            emit('currentPageChange', page);
        }

        function onButtonClick(page: number): void {
            activePageLocal = page;
            pageChange(page);
        }

        function onPreviousClick(): void {
            if (activePageLocal > 1) {
                activePageLocal = activePageLocal - 1;
                pageChange(activePageLocal);
            }
        }

        function onNextClick(): void {
            if (+activePageLocal < +pageCountLocal) {
                activePageLocal = activePageLocal + 1;
                pageChange(activePageLocal);
            }
        }

        let itemList = computed(() => {

            let items = [];

            if (props.recordCount == undefined || props.pageSize == undefined)
                return;

            activePageLocal = (+currentPage.value + 1);
            let from = 1;
            let to = activePageLocal + 2;

            pageCountLocal = Math.floor(+props.recordCount / +props.pageSize) + (+props.recordCount % +props.pageSize != 0 ? 1 : 0);
            if (activePageLocal > 2) {
                from = activePageLocal - 2;
            }
            else if (activePageLocal == 2) {
                from = 1;
                to += 1;
            }
            else if (activePageLocal == 1) {
                to += 2;
            }

            if (to > pageCountLocal) {
                from = from - (to - pageCountLocal);
                if (from < 1) {
                    from = 1;
                }
                to = pageCountLocal;
            }

            for (let index = from; index <= to; index++)
                items.push(index);

            return items;
        });

        return {
            onButtonClick,
            onNextClick,
            onPreviousClick,
            pageCount,
            itemList,
        };
    },


})
</script>

<style scoped>
@media (max-width: 480px) {
    .res-mobile {
        display: block !important;
    }

}
</style>
