import {
    validatenull
} from '@/util/validate';
/**
 * 存储localStorage
 */
export const setStore = (params) => {
        let {
            name,
            content,
            type,
            datetime
        } = params;
        let obj = {
            dataType: typeof(content),
            content: content,
            type: type,
            datetime: new Date().getTime()
        }
        if (type) window.sessionStorage.setItem(name, JSON.stringify(obj));
        else window.localStorage.setItem(name, JSON.stringify(obj));
    }
    /**
     * 获取localStorage
     */

export const getStore = (params) => {
        let {
            name,
            type,
            debug
        } = params;
        let obj = {},
            content;
        obj = window.localStorage.getItem(name);
        if (validatenull(obj)) obj = window.sessionStorage.getItem(name);
        if (validatenull(obj)) return;
        obj = JSON.parse(obj);
        if (debug) {
            return obj;
        }
        if (obj.dataType == 'string') {
            content = obj.content;
        } else if (obj.dataType == 'number') {
            content = Number(obj.content);
        } else if (obj.dataType == 'boolean') {
            content = eval(obj.content);
        } else if (obj.dataType == 'object') {
            content = obj.content;
        }
        return content;
    }
    /**
     * 删除localStorage
     */
export const removeStore = params => {
    let {
        name
    } = params;
    window.localStorage.removeItem(name);
    window.sessionStorage.removeItem(name);
}

/**
 * 获取全部localStorage
 */
export const getAllStore = (params) => {
    let list = [];
    let {
        type
    } = params;
    for (let i = 1; i <= window.sessionStorage.length; i++) {
        if (type) {
            list.push({
                name: window.sessionStorage.key(i),
                content: getStore({
                    name: window.sessionStorage.key(i),
                    type: 'session'
                })
            })
        } else {
            list.push(getStore({
                name: window.localStorage.key(i),
                content: getStore({
                    name: window.localStorage.key(i),
                })
            }))
        }
    }

    return list;

}

/**
 * 清空全部localStorage
 */
export const clearStore = (params) => {
    let {
        type
    } = params;
    if (type) {
        window.sessionStorage.clear();
        return
    }
    window.localStorage.clear()
}