import axios from 'axios'
import store from '../../store/index'

const guest = {
	userid : 'guest',
	name: '손님',
	nickname: '손님',
	email: 'guest',
	access : {
		auth: 0,
		rank: 0,
		point: 0,
		check: 1
	}
}

const before = (object) => (to, from, next) => {
	store.commit('onNavigation', false);

	token().then((req) => {
		if(object.auth){
			if(object.auth <= store.state.userInfo.data.access.auth){
				next();
			}else{
				alert('페이지 권한이 없습니다!')
				next(false);
			}
		}else{
			next();
		}
	}).catch((err) => {
		console.log(err);
		next(false);
	});
}

const token = () => {
	return new Promise((resolve, reject) => {
		axios({
			method: 'post',
			url: `/api/1/auth/token`,
			withCredentials: true,
		}).then((req) => {
			if(req.data.info){
				store.commit('tokenStatus', req.data.info);
				resolve(req.data.info);
			}else{
				resolve(guest)
				store.commit('tokenStatus', guest);
			}
		}).catch((err) => {
			store.commit('tokenStatus', guest);
			reject(err)
		});
	});
}

export default before
