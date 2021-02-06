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
		path: '*',
		redirect: '/404'
	},
	{
		path: '/404',
		component: () => import('@/views/404.vue'),
		beforeEnter: before(),
	},
	{
		path: '/profile/:id',
		name: 'Profile',
		component: () => import('@/views/profile/index'),
		beforeEnter: before(),
		children: [
			{
				name: 'Profile',
				path: '',
				component: () => import('@/views/profile/profile')
			},
			{
				name: 'ProfilePost',
				path: 'post',
				component: () => import('@/views/profile/post')
			},
			{
				name: 'ProfileImage',
				path: 'image',
				component: () => import('@/views/profile/image')
			},

			// 여기는 북마크
			
			{
				name: 'ProfileVisit',
				path: 'visit',
				component: () => import('@/views/profile/visit')
			}
		]
	},
	{
		path: '/setting',
		redirect: '/setting/profile'
	},
	{
		name: 'Setting',
		path: '/setting/:id',
		component: () => import('@/views/setting/index'),
		beforeEnter: before(),
		children: [
			{
				name: '',
				path: '',
				component: () => import('@/views/setting/profile')
			},
			{
				name: 'SettingProfile',
				path: 'profile',
				component: () => import('@/views/setting/profile')
			}
		]
	},
	{
		path: '/auth',
		name: 'Auth',
		component: () => import('@/views/auth/sign/user.vue'),
		beforeEnter: before(),
		children: [
			{
				name: 'AuthHome',
				path: 'home',
				component: () => import ('@/views/auth/user/home')
			},
			{
				name: 'AuthLike',
				path: 'like',
				component: () => import ('@/views/auth/user/like')
			},
			{
				name: 'AuthPost',
				path: 'post',
				component: () => import ('@/views/auth/user/post')
			},
			{
				name: 'AuthSetting',
				path: 'setting',
				component: () => import('@/views/auth/user/setting')
			}
		]
	},
	{
		path: '/auth/:id',
		name: 'Auth',
		component: () => import('@/views/auth/sign/index.vue'),
		beforeEnter: before(),
		watch: {
			'$route' (to, from) {
				const toDepth = to.path.split('/').length;
				const fromDepth = from.path.split('/').length;
				this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left';
			}
		}
	},

	// 커뮤니티 메인
	{
		path: '/community',
		name: 'Community',
		component: () => import('@/views/Community'),
		beforeEnter: before(),
	},

	// 공지사항 게시판
	{
		path: '/notice',
		name: 'Notice',
		component: () => import('@/views/board/notice'),
		beforeEnter: before(),
	},
	{
		path: '/notice/edit',
		name: 'NoticeEdit',
		component: () => import('@/views/board/notice/edit'),
		beforeEnter: before(),
		children: [
			{
				path: ':id',
				name: 'NoticeEditFixed',
			}
		]
	},
	{
		path: '/notice/:id',
		name: 'NoticePost',
		component: () => import('@/views/board/notice/post'),
		beforeEnter: before(),
	},

	// 자유게시판
	{
		path: '/free',
		name: 'Free',
		component: () => import('@/views/board/free'),
		beforeEnter: before()
	},
	{
		path: '/free/edit',
		name: 'FreeEdit',
		component: () => import('@/views/board/free/edit'),
		beforeEnter: before(),
		children: [
			{
				path: ':id',
				name: 'FreeEditFixed',
			}
		]
	},
	{
		path: '/free/:id',
		name: 'FreePost',
		component: () => import('@/views/board/free/post'),
		beforeEnter: before()
	},

	// 포토게시판
	{
		path: '/photo',
		name: 'Photo',
		component: () => import('@/views/board/photo'),
		beforeEnter: before(),
	},
	{
		path: '/photo/edit',
		name: 'PhotoEdit',
		component: () => import('@/views/board/photo/edit'),
		beforeEnter: before(),
		children: [
			{
				path: ':id',
				name: 'PhotoEditFixed',
			}
		]
	},
	{
		path: '/photo/:id',
		name: 'PhotoPost',
		component: () => import('@/views/board/photo/post.vue'),
		beforeEnter: before()
	},

	// QNA 페이지
	{
		path: '/qna',
		name: 'Qna',
		component: () => import('@/views/board/qna'),
		beforeEnter: before()
	}
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default router
