import Store from '../../store'
import { mapActions, mapGetters } from 'vuex'

const Before = (object) => (to, from, next) => {
	Store.dispatch('helperStore/ON_NAVIGATION', false);
	Store.dispatch('userStore/USER_TOKEN').then((req) => {
		console.log(req);
	}).catch((err) => {
		console.log(err);
	});

	next();
}

const StoreGetter = (name, getter) => {
	return Store.getters[name + '/' + getter]
}

const StoreActions = (name, action) => {
	return Store._actions[name + '/' + action]
}

export default Before