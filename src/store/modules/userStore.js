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
		//navigation : false
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
		//onNavigation(state, value){
		//	state.navigation = value;
		//}
	},
	actions: {
		USER_LOGIN: function({commit}, payload){
			const SEND = {
				userid: payload.userid,
				userpw: payload.userpw
			}

			return new Promise((resolve, reject) => {
				axios({
					method: 'post',
					url: '/api/1/auth/login',
					data: SEND,
					withCredentials : true
				}).then((req) => {
					resolve(req);
				}).catch((err) => {
					reject(err)
				})
			});
		},
		USER_ALERT: function({commit}, payload){
			const object = {};
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
					object = update(false,false,true,'알 수 없는 오류입니다.');
                    break;
			}
			
			commit('SET_ALERT', object)
		},
		USER_DATA: function({commit}, payload){
			commit('SET_STATUS', payload)
		}
	}
}

export default User
