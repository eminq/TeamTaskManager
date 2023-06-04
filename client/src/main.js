import { createApp } from 'vue'
import App from './App.vue'

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import router from './router'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import { sync } from 'vuex-router-sync'
import store from '@/store/store'
import Vuex from 'vuex'

sync(store, router);

createApp(App).use(router, store, Vuex).mount('#app')
