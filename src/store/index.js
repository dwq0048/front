import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import userStore from '@/store/modules/userStore.js'
import helperStore from '@/store/modules/helperStore.js'

const store = new Vuex.Store({
  modules: {
    userStore: userStore,
    helperStore: helperStore
  }
})

export default store