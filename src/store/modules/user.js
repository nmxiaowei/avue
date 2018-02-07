import { getToken, setToken, removeToken } from '@/util/auth'
import { setStore, getStore, setCache, getCache } from '@/util/yun'
import { loginByUsername, getUserInfo, getTableData, getMenu, logout } from '@/api/user'
const user = {
    state: {
        userInfo: {},
        roles: [],
        menu: [],
        token: '',
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
        GetTableData({ commit, state, dispatch }, userInfo) {
            return new Promise((resolve, reject) => {
                getTableData().then(res => {
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

    },
    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token;
        },
        SET_USERIFNO: (state, userInfo) => {
            state.userInfo = userInfo;
        },
        SET_MENU: (state, menu) => {
            state.menu = menu;
        },
        SET_ROLES: (state, roles) => {
            state.roles = roles;
        },
    }

}
export default user