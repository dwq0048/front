import Store from '../../store'

const Before = (object) => (to, from, next) => {
	Store.dispatch('ON_NAVIGATION', false, { root : true });
	Store.dispatch('userStore/USER_TOKEN').then((req) => {
		next();
	}).catch((err) => {
		next();
	});

	next();
}

export default Before
