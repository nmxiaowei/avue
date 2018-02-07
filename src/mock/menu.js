import { baseUrl } from '@/config/env'
export default [{
	title: "欢迎页面",
	href: '/wel/',
	icon: 'el-icon-my-shouye1',
	children: [],
}, {
	title: "第三方网站",
	href: '',
	icon: 'el-icon-my-jibenxinxi',
	children: [
		{
			title: "百度",
			href: 'https://www.baidu.com',
			icon: 'el-icon-my-kehuguanli',
			children: [],
		}, {
			title: "搜狐",
			href: 'http://www.sohu.com',
			icon: 'el-icon-my-kehuguanli',
			children: [],
		}, {
			title: "360",
			href: 'http://www.06.com',
			icon: 'el-icon-my-kehuguanli',
			children: [],

		}]
}, {
	title: "CRUD",
	href: '/crud/',
	icon: 'el-icon-my-chart',
	children: []
}]