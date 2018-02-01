/**
 *
 * http配置
 * 
 */
// 引入axios以及element ui中的loading和message组件
import axios from 'axios'
import store from '../store'
import router from '../router/router';
import { getToken, setToken, removeToken } from '@/util/auth';
import { baseUrl, dicUrl, khglUrl } from '@/config/env';
import { getStore, removeSessionStore, getSessionStore, removeByValue,vaildUtil } from '@/util/yun'
import { Loading, Message, MessageBox } from 'element-ui'
// 超时时间
if (store.online)axios.defaults.timeout = 13000;
else axios.defaults.timeout = 0;
//跨域请求，允许保存cookie
axios.defaults.withCredentials = true;

let loadinginstace
let cfg,msg;
msg='服务器君开小差了，请稍后再试';
//HTTPrequest拦截
axios.interceptors.request.use(config => {
	loadinginstace = Loading.service({
		fullscreen: true
	});
	// if (store.state.token) {
	// 	config.headers['X-Token'] = getToken() // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
	// }
	cfg = config;
	return config
}, error => {
	console.log('err' + error)// for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 500
    })
    return Promise.reject(error)
})
//HTTPresponse拦截
axios.interceptors.response.use(data => {
	const reqCfg = data.config;
	loadinginstace.close();
	if (data.data.code != '00' && data.data.code != '200') {
		if (data.data.code == '88') {
			MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
				confirmButtonText: '重新登录',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				store.dispatch('LogOut').then((data) => {
					
				});
			})
		}else if (data.data.code == '401'||data.data.code == '400'){
			msg=data.data.message;
			Message({
				message: msg,
				type: 'info',
				duration: 5 * 500
			});
		}else if(data.data=="<script>parent.location.href='/login'</script>"){
			Message({
				message: '登录已超时,或没有相关操作权限,请退出重新登录',
				type: 'info',
				duration: 5 * 500
			});
			removeToken();
			store.commit('SET_TOKEN', null);
			store.commit('SET_ROLES', []);
			store.commit('CLEAR_USER', null);
			// router.isBack = true;
			// router.push({
			// 	path: "/login"
			// });
			return data;
		}
		return Promise.reject(new Error(msg));
	} else {
		if (reqCfg.url.indexOf('cust') != -1&& (reqCfg.method == 'post' || reqCfg.method == 'put' || reqCfg.method == 'delete')) {
			if(!vaildUtil.ifnull(store.state.cust))
			store.dispatch('GetState', {
				custId: store.state.cust.custId
			}).then(() => {

			});
		}
		return data
	}
}, error => {
	loadinginstace.close();
	if(error=='Error: Request failed with status code 404'){
		msg='404错误，未发现相关接口';
	}else if(error=='Error: Request failed with status code 403'){
		msg='403错误，接口没有相关权限';
	}else if(error=='Error: Network Error'){
		msg='没有网络，请检测网络链接';
	}else if(error==`SyntaxError: Failed to execute 'open' on 'XMLHttpRequest': Invalid URL`){
		return data;
	}else{
		msg='服务器君开小差了，请稍后再试'
	}
	Message({
		message: msg,
		type: 'info',
		duration: 5 * 500
	})
	return Promise.reject(new Error(msg));

})

export default axios