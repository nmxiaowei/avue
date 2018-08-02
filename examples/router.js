import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './route.config';
Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'hash',
  base: __dirname,
  routes
});

export default router;
