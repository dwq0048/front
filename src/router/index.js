import Vue from 'vue'
import VueRouter from 'vue-router'
import before from './before'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'Home',
		component: () => import('@/views/Home'),
		beforeEnter: before()
	},
	{
		path: '/login',
		name: 'Login',
		component: () => import('@/views/Login'),
		beforeEnter: before()
	},
	{
		path: '/notice',
		name: 'Notice',
		component: () => import('@/views/Notice'),
		beforeEnter: before()
	},
	{
		path: '/notice/edit',
		name: 'NoticeEdit',
		component: () => import('@/views/Notice/edit'),
		beforeEnter: before()
	},
	{
		path: '/notice/post/:id',
		name: 'NoticePost',
		component: () => import('@/views/Notice/post'),
		beforeEnter: before()
	}
];

/*
boradJson.forEach((object) => {
	const target = object;
	const source = {
		beforeEnter: token
	}
	const data = board(Object.assign(target, source));
	for(let i=0; i<data.length; i++){
		routes.push(data[i]);
	}
})

console.log(routes);
*/

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default router
