import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'


// import 'vuetify/styles'
// import { createVuetify } from 'vuetify'
// import * as components from 'vuetify/components'
// import * as directives from 'vuetify/directives'

//import Quasar from "quasar-framework/dist/quasar.mat.esm";
//Vue.use(Quasar, { components: [QLayout, QInput, QBtn] });

import 'bootstrap/dist/css/bootstrap.min.css'



import './assets/main.css';

import '@/assets/iransans/css/fontiran.css';
import "bootstrap/dist/js/bootstrap.js"

const app = createApp(App)



app.use(createPinia())
app.use(router)


app.mount('#app')
