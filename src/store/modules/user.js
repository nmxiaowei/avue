import { getToken, setToken, removeToken } from '@/util/auth'
import { setStore, getStore, vaildUtil, setCache, getCache } from '@/util/yun'
import { baseUrl, khglUrl, dicUrl } from '@/config/env'
const user = {
    state: {
        user: {},
        roles: {},
        permission: {},
        token: '',
        online: false
    },
    actions: {
        //根据用户名登录
        LoginByUsername({ commit, state, dispatch }, userInfo) {
            return new Promise((resolve, reject) => {
                axios({
                    method: 'post',
                    url: `${baseUrl}/Login/login`,
                    data: {
                        "username": btoa(userInfo.username),
                        "password": btoa(userInfo.passwd),
                    }
                }).then((res) => {
                    res = res.data;
                    if (!vaildUtil.ifnull(res.data)) {
                        setToken(res.data['x-access-token']);
                        commit('SET_TOKEN', res.data['x-access-token']);
                        commit('SET_USER', res.data.user);
                        commit('SET_ROLES', res.data.user.role_CD);
                        commit('SET_ONLINE', true);
                    }
                    resolve(res);
                })
            })

        },
        //用户退出
        LogOut({ commit, state, dispatch }) {
            return new Promise((resolve, reject) => {
                if (state.online) {
                    axios({
                        method: 'GET',
                        url: `${baseUrl}/Login/logout`,
                    }).then((res) => {
                        res = res.data;
                    })
                }
                removeToken();
                commit('SET_TOKEN', null);
                commit('SET_ROLES', );
                commit('CLEAR_USER', null);
                commit('SET_MENU_ACTIVE', '');
                resolve();
            })
        }
    },
    mutations: {
        SET_USER: (state, action) => {
            state.user = action;
        },
        SET_TOKEN: (state, action) => {
            state.token = action;
        },
        CLEAR_USER: (state, action) => {
            state.user = action;
        },
        SET_ONLINE: (state, action) => {
            state.online = action;
        },
        SET_ROLES: (state, action) => {
            if (vaildUtil.ifnull(action)) action = [];
            state.roles = action;
            state.permission = [];
            for (let i = 0; i < action.length; i++) {
                state.permission.push(actioni.ROLE_ID);
            }
        },
        SET_USER_STATE: (state, action) => {
            const data = {
                custWork: '',
                custFamily: '',
                custFin: '',
                report: '',
                custBreed: '',
                custPlant: '',
                custBusiness: '',
                custStaff: '',
            }
            // 如果为空初始化进度条
            if (vaildUtil.ifnull(action)) state.complete = data;
            else state.complete = action;
        },
    }

}
export default user