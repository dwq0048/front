import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		userInfo: {
			status: false,
			data: {
				userid : 'guest',
				name: '손님',
				nickname: '손님',
				email: 'guest',
				access : {
					auth: 1,
					rank: 1,
					point: 0,
					check: 1
				}
			}
		},
		navigation : false
	},
	mutations: {
		tokenStatus(state, info){
			state.userInfo.status = true,
			state.userInfo.data = info
		},
		onNavigation(state, value){
			state.navigation = value;
		}
	},
	actions: {
		Login: function({commit}, data){
			const form = {
				userid: data.userid,
				userpw: data.userpw
			}

			return new Promise((resolve, reject) => {
				axios({
					method: 'post',
					url: '/api/1/auth/login',
					data: form,
					withCredentials : true
				}).then((req) => {
					resolve(req);
				}).catch((err) => {
					reject(err)
				})
			});
		}
	},
	modules: {

	}
})
