import router from './router/router'
import store from './store'
import { getToken } from '@/util/auth'
import { vaildUtil } from '@/util/yun';
import { asyncRouterMap } from '@/router/router'
function hasPermission(roles, permissionRoles) {
    if (!permissionRoles) return true
    return roles.some(role => permissionRoles.indexOf(role) >= 0)
}
const whiteList = ['/login', '/404', '/401']
router.addRoutes(asyncRouterMap); // 动态添加可访问路由表
router.beforeEach((to, from, next) => {
    store.commit('SET_TAG', from.query.src ? from.query.src : from.path);
    if (getToken()) { // determine if there has token
        /* has token*/
        if (to.path === '/login') {
            next({ path: '/' })
        } else {
            if (store.getters.roles.length === 0) {
                store.dispatch('GetUserInfo').then(res => {
                    const roles = res.roles
                    next({ ...to, replace: true })
                }).catch(() => {
                    store.dispatch('FedLogOut').then(() => {
                        next({ path: '/login' })
                    })
                })
            } else {
                next()
            }
        }
    } else {
        /* has no token*/
        if (whiteList.indexOf(to.path) !== -1) {
            next()
        } else {
            next('/login')
        }
    }
})

