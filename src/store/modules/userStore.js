import axios from 'axios'

const User = {
	namespaced: true,
	state: {
		IS_LOGIN: false,
		USER_INFO: {},
		LOGIN_ALERT: {},

		GUEST_INFO: {
			userid: 'guest',
			name: 'guest',
			nickname: 'guest',
			email: 'guest@vrchat.kr'
		},
		INITIAL_ALERT: {
			ALERT: false,
			USER_ID: false,
			USER_PW: false,
			ERROR: false,
			MESSAGE: ''
		},
		DETAILS_INFO: {},
	},
	getters: {
		GET_LOGIN: state => state.IS_LOGIN,
		GET_ALERT: state => state.INITIAL_ALERT,
		GET_USER: (state) => {
			if(state.IS_LOGIN == true){
				return state.USER_INFO
			}else {
				return state.GUEST_INFO
			}
		},

		UPDATE_ALERT: state => state.LOGIN_ALERT
	},
	mutations: {
		SET_STATUS(state, payload){
			state.IS_LOGIN = true;
			state.USER_INFO = payload;
		},
		SET_ALERT(state, payload){
			state.LOGIN_ALERT = payload
		},
		SET_LOGOUT(state, payload){
			state.IS_LOGIN = false;
			state.USER_INFO = {};
		},
	},
	actions: {
		USER_LOGIN: function({commit}, payload){
			const SEND = {
				USER_ID: payload.USER_ID,
				USER_PW: payload.USER_PW
			}

			return new Promise((resolve, reject) => {
				axios({
					method: 'post',
					url: '/api/1/auth/login',
					data: SEND,
					withCredentials : true
				}).then((req) => {
					if(req.data.status == 'success'){
						const user = req.data.info;
						commit('SET_STATUS', user);

						resolve(req);
					}else{
						reject(req);
					}
				}).catch((err) => {
					reject(err)
				})
			});
		},
		USER_LOGOUT: function({commit}, payload){
			return new Promise((resolve, reject) => {
				axios({
					method: 'post',
					url: '/api/1/auth/logout',
					withCredentials : true,
				}).then((req) => {
					commit('SET_LOGOUT');
					resolve('success');
				}).catch((err) => {
					reject(err);
				})
			})
		},
		USER_ALERT: function({commit}, payload){
			let object = {};
			const update = (alert, userid, userpw, message) => {
				return {
					ALERT: alert,
					USER_ID: userid,
					USER_PW: userpw,
					MESSAGE: message,
					ERROR: true
				}
			}

            switch(payload){
                case 'There is no user ID':
					object = update(true,true,false,'아이디를 입력해주세요.');
                    break;
                case 'There is no user PW':
					object = update(false,true,true,'비밀번호를 입력해주세요');
                    break;
                case 'User ID is wrong':
					object = update(true,true,true,'아이디 또는 비밀번호가 틀렸습니다.');
                    break;
                case 'User PW is wrong':
					object = update(true,true,true,'아이디 또는 비밀번호가 틀렸습니다.');
                    break;
                default:
					object = update(false,false,false,'알 수 없는 오류입니다.');
                    break;
			}
			
			commit('SET_ALERT', object)
		},
		USER_DATA: function({commit}, payload){
			commit('SET_STATUS', payload);
		},
		USER_DETAILS: function({commit}, payload){
			return new Promise((resolve, reject) => {
				axios({
					method: 'post',
					url: `/api/1/auth/info`,
					withCredentials: true,
				}).then((req) => {
					resolve(req);
				}).catch((err) => {
					reject(false);
				})
			});
		},
		USER_TOKEN: function({commit}, payload){
			return new Promise((resolve, reject) => {
				axios({
					method: 'post',
					url: `/api/1/auth/token`,
					withCredentials: true,
				}).then((req) => {
					if(req.data.info.constructor == Object){
						if(req.data.message == 'Token authentication complete' || req.data.message == 'Issued Success'){
							const user = req.data.info;
							commit('SET_STATUS', user);

							resolve('success');
						}else{
							resolve('fail');
						}
					}else{
						reject('fail')
					}
				}).catch((err) => {
					reject('fail')
				});
			});
		}
	}
}

export default User
