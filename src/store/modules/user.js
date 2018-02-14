import { getToken, setToken, removeToken } from '@/util/auth'
import { setStore, getStore } from '@/util/store'
import { setCache, getCache } from '@/util/yun'
import { loginByUsername, getUserInfo, getTableData, getMenu, logout, getMenuAll } from '@/api/user'
const user = {
    state: {
        userInfo: {},
        permission: getStore('permission') || {},
        roles: getStore('roles') || [],
        menu: [],
        menuAll: [],
        token: getStore('token') || '',
    },
    actions: {
        //根据用户名登录
        LoginByUsername({ commit, state, dispatch }, userInfo) {
            return new Promise((resolve, reject) => {
                loginByUsername(userInfo.username, userInfo.password).then(res => {
                    const data = res.data;
                    commit('SET_TOKEN', data);
                    setToken(data);
                    resolve();
                })
            })
        },
        //根据手机号登录
        LoginByPhone({ commit, state, dispatch }, userInfo) {
            return new Promise((resolve, reject) => {
                loginByUsername(userInfo.phone, userInfo.code).then(res => {
                    const data = res.data;
                    commit('SET_TOKEN', data);
                    setToken(data);
                    resolve();
                })
            })
        },
        GetTableData({ commit, state, dispatch }, page) {
            return new Promise((resolve, reject) => {
                getTableData(page).then(res => {
                    const data = res.data;
                    resolve(data);
                })
            })
        },
        GetUserInfo({ commit, state, dispatch }) {
            return new Promise((resolve, reject) => {
                getUserInfo().then((res) => {
                    const data = res.data;
                    commit('SET_USERIFNO', data.userInfo);
                    commit('SET_ROLES', data.roles);
                    commit('SET_PERMISSION', data.permission)
                    resolve(data);
                })
            })
        },
        // 登出
        LogOut({ commit, state }) {
            return new Promise((resolve, reject) => {
                logout().then(() => {
                    commit('SET_TOKEN', '')
                    commit('SET_ROLES', [])
                    commit('DEL_ALL_TAG');
                    removeToken()
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },
        //注销session
        FedLogOut({ commit }) {
            return new Promise(resolve => {
                commit('SET_TOKEN', '')
                commit('DEL_ALL_TAG');
                removeToken()
                resolve()
            })
        },
        //获取系统菜单
        GetMenu({ commit }) {
            return new Promise(resolve => {
                getMenu().then((res) => {
                    const data = res.data;
                    commit('SET_MENU', data);
                    resolve(data);
                })
            })
        },
        //获取全部菜单
        GetMenuAll({ commit }) {
            return new Promise(resolve => {
                getMenuAll().then((res) => {
                    const data = res.data;
                    commit('SET_MENU_ALL', data);
                    resolve(data);
                })
            })
        },

    },
    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token;
            setStore({ name: 'token', content: state.token, type: 'session' })
        },
        SET_USERIFNO: (state, userInfo) => {
            state.userInfo = userInfo;
        },
        SET_MENU: (state, menu) => {
            state.menu = menu;
        },
        SET_MENU_ALL: (state, menuAll) => {
            state.menuAll = menuAll;
        },
        SET_ROLES: (state, roles) => {
            state.roles = roles;
            setStore({ name: 'roles', content: state.roles, type: 'session' })
        },
        SET_PERMISSION: (state, permission) => {
            permission.forEach(ele => {
                state.permission[ele] = true;
            });
            setStore({ name: 'permission', content: state.permission, type: 'session' })
        }
    }

}
export default user