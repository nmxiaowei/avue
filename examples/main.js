import Vue from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';
import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Avue from '../packages/index';
import '../packages/theme-chalk/src/index.scss';

Vue.use(Element);
Vue.use(Avue, axios);
Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
