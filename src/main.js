import Vue from 'vue';
import axios from './router/axios';
import VueAxios from 'vue-axios';
import App from './App';
import './permission' // 权限
import router from './router/router';
import store from './store';
import ELEMENT from 'element-ui';
//引入全局Url
import { baseUrl, khglUrl, dicUrl, imgBaseUrl, vueUrl } from '@/config/env';
import * as filters from './filters' // 全局filter
import './styles/common.scss';
Vue.use(ELEMENT)
Vue.use(VueAxios, axios)
Vue.prototype.baseUrl = baseUrl;


Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})


Vue.config.productionTip = false;


export function createApp() {
  const app = new Vue({
    router,
    store,
    render: h => h(App)
  })
  return { app, router, store }
}