<script setup lang="ts">
import type FlangeVerification from '@/models/flangeVerification';


export interface Props {
    flangeVerification?: FlangeVerification
}



const props = withDefaults(defineProps<Props>(), {
});


</script>
<template>
    <span class="fs-16 fw-600 px-3" style="color: #125CCB;">Maximum Utilization is {{
        props.flangeVerification.maximumUtilization }}</span>
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
                <tr class="fs-14 fw-500 py-0" v-for="(item, index) in props.flangeVerification.verificationItems"
                    :key="index" style="height: 48px;color: #5C5C5C;vertical-align: middle;">
                    <td>{{ item.from }}</td>
                    <td>{{ item.to }}</td>
                    <td>{{ item.designForce }}</td>
                    <td>{{ item.resistance }}</td>
                    <td>{{ item.utilization }}</td>
                    <td>
                        <img :src="infocircle" alt="">
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <div class="row px-4 py-3">
        <div class="col-11 position-relative">
            <div class="row">
                <div class="col-6"
                    v-for="(item, index) in Object.entries(props.flangeVerification.keyValues ? props.flangeVerification.keyValues : [])" :key="index">
                    <div class="row  border-left-green">
                      
                        <div class="col-4 p-0 py-1">
                            <label for="exampleFormControlInput1" style="height: 36px; width: 200px;"
                                class="form-label mb-0 d-flex input-label px-3 py-2">{{ item[0] }}</label>
                        </div>
                       
                        <div class="col-6 py-1"> 
                            <div class="form-check">
                                <div class="form-label mb-0 input-label px-3"
                                    style="background-color: #F5F5F5; height: 36px; padding-top: 8px;">
                                    <span > {{ item[1] }}</span>

                                    <!-- <span class="justify-content-start">135</span>
                                <span class="justify-content-end">kN</span> -->
                                </div>
                            </div>
                        </div>
                        <div class="col-2"> </div>
                    </div>
                </div>
            </div>
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
    /* left: 0; */
    top: 5%;
    padding-left:10px
}
</style>