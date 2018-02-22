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
                if (dic instanceof Array) {
                    Promise.all(dic.map(ele => getDic(ele))).then(data => {
                        let result = {};
                        dic.forEach((ele, index) => {
                            result[ele] = data[index].data;
                        })
                        resolve(result)
                    })
                }
            })
        }
    },
    mutations: {

    }
}
export default common