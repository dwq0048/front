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
		path: '/auth/:id',
		name: 'Auth',
		component: () => import('@/views/auth/index.vue'),
		beforeEnter: before(),
		watch: {
			'$route' (to, from) {
				const toDepth = to.path.split('/').length;
				const fromDepth = from.path.split('/').length;
				this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left';
				
				console.log('asdjsalkdjklsajdlksajdlkj');
			}
		}
	},
	{
		path: '/user',
		name: 'Mypage',
		component: () => import('@/views/user/mypage.vue'),
		beforeEnter: before()
	},

	// 공지사항 게시판
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
	},

	// 자유게시판
	{
		path: '/free',
		name: 'Free',
		component: () => import('@/views/Free'),
		beforeEnter: before()
	},
	{
		path: '/free/edit',
		name: 'FreeEdit',
		component: () => import('@/views/Free/edit'),
		beforeEnter: before()
	},
	{
		path: '/free/post/:id',
		name: 'FreePost',
		component: () => import('@/views/Free/post'),
		beforeEnter: before()
	},

	// 포토게시판
	{
		path: '/photo',
		name: 'Photo',
		component: () => import('@/views/photo/index.vue'),
		beforeEnter: before()
	},
	{
		path: '/photo/edit',
		name: 'PhotoEdit',
		component: () => import('@/views/photo/edit'),
		beforeEnter: before()
	},
	{
		path: '/photo/post/:id',
		name: 'PhotoPost',
		component: () => import('@/views/photo/post.vue'),
		beforeEnter: before()
	},

	// 블로그
	{
		path: '/blog',
		name: 'Blog',
		component: () => import('@/views/Blog/index.vue'),
		beforeEnter: before()
	},
	{
		path: '/blog/edit',
		name: 'BlogEdit',
		component: () => import('@/views/Blog/edit'),
		beforeEnter: before()
	},
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
