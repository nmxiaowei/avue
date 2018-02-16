import { setStore, getStore } from '@/util/store'
import { validatenull } from '@/util/validate'
import { getDic } from '@/api/admin'
import { baseUrl } from '@/config/env';
const common = {

    state: {

    },
    actions: {
        //获取字典公用类
        GetDic({ commit, state, dispatch }, dic) {
            return new Promise((resolve, reject) => {
                const list = dic;
                const len = list.length - 1;
                dic = {};
                list.forEach((ele, index) => {
                    getDic(ele).then(data => {
                        dic[ele] = data.data;
                        if (index == len) {
                            resolve(dic)
                        };
                    })
                });

            })
        }
    },
    mutations: {

    }
}
export default common