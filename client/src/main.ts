import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import panel from '@/shared/newComponents/panel.vue';
import subPanel from '@/shared/newComponents/subPanel.vue';
import modal from '@/shared/newComponents/modal.vue';
import dropdownWithImg from '@/shared/newComponents/dropdownWithImg.vue';
import dropdownRange from '@/shared/newComponents/dropdownRange.vue';
import dropdown from '@/shared/newComponents/dropdown.vue';
import rangeSlider from '@/shared/newComponents/rangeSlider.vue';
import iron from '@/shared/newComponents/iron.vue';
import shapeLoading from '@/shared/newComponents/shapeLoading.vue';
import ApiService from '@/core/services/api.service';
import ClickOutside from '@/shared/common/outside';
import PrimeVue from 'primevue/config';


import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';




// import 'vuetify/styles'
// import { createVuetify } from 'vuetify'
// import * as components from 'vuetify/components'
// import * as directives from 'vuetify/directives'

//import Quasar from "quasar-framework/dist/quasar.mat.esm";
//Vue.use(Quasar, { components: [QLayout, QInput, QBtn] });

import '@/assets/fontawesome/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css'


import './assets/main.css';

import '@/assets/iransans/css/fontiran.css';
import "bootstrap/dist/js/bootstrap.js";

import VueUniversalModal from 'vue-universal-modal';
import 'vue-universal-modal/dist/index.css';






const app = createApp(App)


app.directive('click-outside', ClickOutside);

// components 
app.component('panel', panel);
app.component('dropdown-with-img', dropdownWithImg);
app.component('dropdown-range', dropdownRange);
app.component('dropdown', dropdown);
app.component('sub-panel', subPanel);
app.component('vue-modal', modal);
app.component('range-slider', rangeSlider);
app.component('iron', iron);
app.component('shape-loading', shapeLoading);

app.use(VueSweetalert2);

app.use(createPinia());
app.use(router);

app.provide('apiServise', new ApiService())

app.use(VueUniversalModal, {
    teleportTarget: '#modals',
});


import 'primevue/resources/themes/aura-light-green/theme.css' 

app.use(PrimeVue);




app.mount('#app')
