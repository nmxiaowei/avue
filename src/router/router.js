import Vue from 'vue';
import VueRouter from 'vue-router';
import { routerMode } from '@/config/env';
import store from '@/store'
import { getStore, getSessionStore, vaildUtil } from '@/util/yun'



import Myiframe from '@/components/iframe/iframe.vue'

import LOGIN from '@/page/login.vue';
import INDEX from '@/page/index/index.vue';
import WEL from '@/page/wel.vue';
import errorPage401 from '@/components/errorPage/401.vue';
import errorPage404 from '@/components/errorPage/404.vue';
Vue.use(VueRouter);
export const constantRouterMap = [{
	path: '/login',
	name: '登录页',
	component: LOGIN,
	meta: {

	}
},
{ path: '*', redirect: '/404', hidden: true },
{ path: '/401', component: errorPage401, name: '401' },
{ path: '/404', component: errorPage404, name: '404' }
];
export default new VueRouter({
	// mode: 'history',
	strict: process.env.NODE_ENV !== 'production',
	scrollBehavior(to, from, savedPosition) {
		if (savedPosition) {
			return savedPosition
		} else {
			if (from.meta.keepAlive) {
				from.meta.savedPosition = document.body.scrollTop;
			}
			return {
				x: 0,
				y: to.meta.savedPosition || 0
			}
		}
	},
	routes: constantRouterMap
});
export const asyncRouterMap = [
	{
		path: '/',
		name: '主路径',
		component: INDEX,
		redirect: '/index',
		meta: {
			requireAuth: true,
		},
		children: [
			{
				path: 'index',
				name: '主页',
				component: INDEX,
			},
			{
				path: "/myiframe/:routerPath",
				component: Myiframe,
				props: true
			}
		]

	}, {
		path: '/wel',
		name: '欢迎页面',
		component: WEL,
	}
]