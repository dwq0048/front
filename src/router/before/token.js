import axios from 'axios'
import store from '../../store/index'

const token = (to, from, next) => {
	axios({
		method: 'post',
		url: `/api/1/auth/token`,
		withCredentials : true
	}).then((req) => {
		if(req.data.info){
			store.commit('tokenStatus', req.data.info);
			console.log(store.state)
		}else{
			throw new Error('오호');
		}

		next()
	}).catch((err) => {
		console.log(err);

		next()
	})

	next()
}

export default token
