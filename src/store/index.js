import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		userInfo: {
			status: false,
			data: {}
		},
		navigation : false
	},
	mutations: {
		tokenStatus(state, info){
			state.userInfo.status = true,
			state.userInfo.data = info
		},
		onNavigation(state){
			if(state.navigation){
				state.navigation = false;
			}else{
				state.navigation = true;
			}
		}
	},
	actions: {
	},
	modules: {
	}
})
