import router from './router/router'
import store from './store'
import { getToken } from '@/util/auth'
import { vaildUtil } from '@/util/yun';
import { asyncRouterMap } from '@/router/router'
function hasPermission(roles, permissionRoles) {
    if (!permissionRoles) return true
    return roles.some(role => permissionRoles.indexOf(role) >= 0)
}
router.addRoutes(asyncRouterMap); // 动态添加可访问路由表
router.beforeEach((to, from, next) => {
    if (store.state.online) {
        login();
    } else {
        next();
    }
    function login() {
        if (!vaildUtil.ifnull(getToken())) { // 判断是否有token
            if (to.path === '/login') {
                next({ path: '/' })
            } else {
                if (!store.state.roles) { // 判断当前用户是否已拉取完user_info信息
                    store.dispatch('LogOut').then(() => {

                    })
                } else {
                    if (hasPermission(store.state.roles, to.meta.role)) {
                        next()
                    } else {
                        next({ path: '/401' })
                    }
                }
            }
        } else {
            if (!to.matched.some(res => res.meta.requireAuth)) { // 在免登录白名单，直接进入
                next()
            } else {
                store.dispatch('LogOut').then(() => {
                    next({ path: '/login' })
                })
            }
        }
    }
})

