import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './route.config';
Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'hash',
    base: __dirname,
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
    routes
});

export default router;