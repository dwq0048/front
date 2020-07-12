import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import userStore from '@/store/modules/userStore.js'
import postStore from '@/store/modules/postStore.js'

const store = new Vuex.Store({
  modules: {
    Store: {
      state: {
          NAVIGATION: false
      },
      getters: {
          GET_NAVIGATION: state => state.NAVIGATION
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