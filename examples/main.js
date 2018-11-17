import Vue from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';
import demoBlock from './components/demo-block.vue';
import MainHeader from './components/header.vue';
import MainFooter from './components/footer.vue';
import SideNav from './components/side-nav';
import soltComponent from './components/solt-component';
import highlight from './components/highlight/'
import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Avue from '../packages/index';
import '../packages/theme-chalk/src/index.scss';
import "./assets/styles/common.scss";
import 'avue-plugin-transfer/packages';
import 'avue-plugin-dynamicquery/packages';
import 'avue-plugin-ueditor/packages';
Vue.use(Element);
Vue.use(Avue, {
    //size: 'small' //small / mini
});

Vue.component('demo-block', demoBlock);
Vue.component('main-header', MainHeader);
Vue.component('side-nav', SideNav);
Vue.component('main-footer', MainFooter);
Vue.component('soltComponent', soltComponent);
Vue.component('highlight', highlight);
Vue.config.productionTip = false;

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');