import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import selectDate from './views/SelectDate.vue';
Vue.use(Router);

export default new Router({
  routes: [{
    path: '/',
    name: 'home',
    component: Home
  }, {
    path: '/selectDate',
    name: 'selectDate',
    component: selectDate
  }]
});
