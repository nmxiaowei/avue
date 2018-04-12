import Vue from 'vue';
import VueRouter from 'vue-router';
import Layout from '@/page/index/'
import BaseRouter from './_router'
const _import = require('./_import');
Vue.use(VueRouter);
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
});
export const asyncRouterMap = [
	{
		path: '/wel',
		component: Layout,
		redirect: '/wel/index',
		children: [
			{
				path: 'index',
				name: '首页',
				component: _import('wel')
			}
		]
	}, {
		path: '/info',
		component: Layout,
		redirect: '/info/index',
		children: [
			{
				path: 'index',
				name: '个人信息',
				component: _import('info/index', 'views')
			}
		]
	}, {
		path: '/role',
		component: Layout,
		redirect: '/role/index',
		children: [
			{
				path: 'index',
				name: '权限测试页',
				component: _import('role', 'views')
			}
		]
	}, {
		path: '/table',
		component: Layout,
		redirect: '/table/index',
		children: [
			{
				path: 'index',
				name: '表格CRUD',
				component: _import('table/index', 'views')
			},
			{
				path: 'generator',
				name: '表格生成器',
				component: _import('table/generator', 'views')
			}
		]
	}, {
		path: '/exhibition',
		component: Layout,
		redirect: '/exhibition/index',
		children: [
			{
				path: 'index',
				name: '数据展示',
				component: _import('exhibition/index', 'views')
			}
		]
	}, {
		path: '/forms',
		component: Layout,
		redirect: '/forms/index',
		children: [
			{
				path: 'index',
				name: '表单CRUD',
				component: _import('forms/index', 'views')
			}
		]
	}, {
		path: '/iconfont',
		component: Layout,
		redirect: '/iconfont/index',
		children: [
			{
				path: 'index',
				name: '阿里图标',
				component: _import('iconfont/index', 'views')
			}
		]
	}, {
		path: '/errlog',
		component: Layout,
		redirect: '/errlog/index',
		children: [
			{
				path: 'index',
				name: '错误日志',
				component: _import('errlog/index')
			}, {
				path: 'page',
				name: '错误页面',
				component: _import('errlog/errorPage')
			}
		]
	}, {
		path: '/advanced-router',
		component: Layout,
		children: [
			{
				path: 'mutative-router',
				name: '动态路由',
				component: _import('advanced-router/mutative-router', 'views'),
			}, {
				path: 'argument-page',
				name: '参数路由',
				component: _import('advanced-router/argument-page', 'views')
			}, {
				path: 'mutative-detail/:id',
				name: '动态路由详情页',
				component: _import('advanced-router/mutative-detail', 'views'),
			}, {
				path: 'argument-detail',
				name: '参数路由详情页',
				component: _import('advanced-router/argument-detail', 'views')
			}
		]
	}, {
		path: '/admin',
		component: Layout,
		children: [
			{
				path: 'user',
				name: '用户管理',
				component: _import('admin/user/index', 'views')
			}, {
				path: 'role',
				name: '角色管理',
				component: _import('admin/role/index', 'views')
			}, {
				path: 'menu',
				name: '菜单管理',
				component: _import('admin/menu/index', 'views')
			}
		]
	}
].concat(BaseRouter)
