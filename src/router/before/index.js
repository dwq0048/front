import Store from '../../store'

const Before = (object) => (to, from, next) => {
	Store.dispatch('ON_NAVIGATION', false, { root : true });
	Store.dispatch('userStore/USER_TOKEN').then((req) => {
		console.log(from);
		next(vm => {
			console.log(from);
			vm.prevRoute = from
		});
	}).catch((err) => {
		next(vm => {
			vm.prevRoute = from
		});
	});

	next(vm => {
		vm.prevRoute = from
	});
}

export default Before
