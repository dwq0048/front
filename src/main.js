import Vue from 'vue'
import axios from 'axios'
//import io from 'socket.io-client';

import App from '@/App.vue'
import store from '@/store'
import router from '@/router'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

//const socket = io('http://localhost:3000')

library.add(fas)
library.add(far)
library.add(fab)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false
Vue.prototype.$axios = axios
//Vue.prototype.$socket = socket


if(process.env.NODE_ENV == 'developer'){
  axios.defaults.baseURL = 'http://127.0.0.1:3000';
}else{
  axios.defaults.baseURL = 'http://127.0.0.1:3000';
}


new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
