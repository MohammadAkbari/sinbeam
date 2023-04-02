import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'


import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.rtl.min.css';

import './assets/main.css';

import '@/assets/iransans/css/fontiran.css';


const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
  },
  // locale: {
  //   locale: 'fa',   
  //   rtl: {
  //     fa: true,
  //   }
  // }
})

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.use(vuetify);

app.mount('#app')
