import { IsPC, setStore, getStore, getCache, vaildUtil } from '@/util/yun'
import { baseUrl, khglUrl, dicUrl } from '@/config/env';
const common = {

    state: {
        mobile: !IsPC(),
        httpReqState: false,
    },
    actions: {
        //获取字典公用类
        GetDic({ commit, state, dispatch }, dic) {
            return new Promise((resolve, reject) => {
                let time;
                state.online ? time = 24 : time = 9999999999;
                for (let obj in dic) {
                    let dicName = `DIC_${obj}`
                    let str = getCache(dicName, time);
                    if (!vaildUtil.ifnull(str)) {
                        dic[obj] = str;
                        resolve(str);
                    } else if (state.online) {
                        axios({
                            method: 'get',
                            url: `${dicUrl}/admin/dic/${obj}`,
                        }).then((res) => {
                            res = res.data;
                            if (!vaildUtil.ifnull(res.data)) {
                                setCache(dicName, res.data);
                                dic[obj] = res.data;
                            }
                            resolve(res.data);
                        }).catch((res) => {
                            time = 9999999999;
                            str = getCache(dicName, time);
                            dic[obj] = str;
                        })
                    }
                }

            })
        }
    },
    mutations: {
        SET_HTTP_REQ_STATE: (state, action) => {
            state.httpReqState = action;
        }
    }
}
export default common