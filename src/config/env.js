/**
 * 配置编译环境和线上环境之间的切换
 * 
 * baseUrl: 老项目域名地址
 * khglUrl: 客户管理域名地址
 * dicUrl : 字典服务器地址
 * routerMode: 路由模式
 * imgBaseUrl: 图片所在域名地址
 * welUrl :默认欢迎页
 * 
 */


let baseUrl = '';
let iconfontVersion = ['567566_sch40o867ogk3xr'];
let iconfontUrl = `//at.alicdn.com/t/font_$key.css`;
let codeUrl = `${baseUrl}/code`

if (process.env.NODE_ENV == 'development') {
	baseUrl = `http://localhost`;// 开发环境地址
} else if (process.env.NODE_ENV == 'production') {
	baseUrl = `http://localhost`;//生产环境地址
} else if (process.env.NODE_ENV == 'test') {
	baseUrl = `http://localhost`;//测试环境地址
}

export { baseUrl, iconfontUrl, iconfontVersion, codeUrl }