import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import axios from 'axios'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(fas)
library.add(far)
library.add(fab)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false
Vue.prototype.$axios = axios


if(process.env.NODE_ENV == 'developer'){
  axios.defaults.baseURL = 'http://127.0.0.1:3000';
}else{
  axios.defaults.baseURL = 'http://127.0.0.1:3000';
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
