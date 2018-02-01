import Vue from 'vue';
import axios from './router/axios';
import VueAxios from 'vue-axios';
import App from './App';
import './permission' // 权限
import router from './router/router';
import store from './store';
import ELEMENT from 'element-ui';
//引入全局Url
import { baseUrl, khglUrl, dicUrl, imgBaseUrl, vueUrl} from '@/config/env';
//引入全局工具类
import roles from '@/const/roles'
import { findByvalue, messageBox, findStrArray } from '@/util/yun'
import * as filters from './filters' // 全局filter
import './styles/common.scss';
Vue.use(ELEMENT)
Vue.use(VueAxios, axios)

Vue.prototype.vueUrl=vueUrl;
Vue.prototype.baseUrl=baseUrl;
Vue.prototype.khglUrl=khglUrl;
Vue.prototype.dicUrl=dicUrl;
Vue.prototype.imgBaseUrl=imgBaseUrl;
Vue.prototype.roles=roles;
Vue.prototype.findByvalue=findByvalue;
Vue.prototype.findStrArray=findStrArray;
Vue.prototype.messageBox=messageBox;


Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})


Vue.config.productionTip = false;



const app =new Vue({
  // el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
export { app, router, store }
