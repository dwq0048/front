import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import userStore from '@/store/modules/userStore.js'
import postStore from '@/store/modules/postStore.js'

const store = new Vuex.Store({
  modules: {
    Store: {
      state: {
          NAVIGATION: false,
          HOST : {
            protocal : window.location.protocol,
            hostname : window.location.hostname,
            port : 3000
          }
      },
      getters: {
          GET_NAVIGATION: state => state.NAVIGATION,
          GET_HOST: state => state.HOST,
          GET_SERVER: state => `${state.HOST.protocal}//${state.HOST.hostname}:${state.HOST.port}`,
      },
      mutations: {
          SET_NAVIGATION(state, payload){
              state.NAVIGATION = payload
          }
      },
      actions: {
          ON_NAVIGATION({commit}, payload){
              if(payload){
                  commit('SET_NAVIGATION', true)
              }else{
                  commit('SET_NAVIGATION', false)
              }
          },
      },
      modules: {
        userStore: userStore,
        postStore: postStore,
      }
    }
  }
})

export default store