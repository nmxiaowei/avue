import { validatenull } from '@/util/validate';
/**
 * 存储localStorage
 */
export const setStore = (params) => {
    let { name, content, type } = params;
    let obj = {
        dataType: typeof (content),
        content: content,
        type: type
    }
    if (type) window.sessionStorage.setItem(name, JSON.stringify(obj));
    else window.localStorage.setItem(name, JSON.stringify(obj));
}
/**
 * 获取localStorage
 */
export const getStore = (params) => {
    let { name, type } = params;
    let obj = {}, content;
    obj = window.localStorage.getItem(name);
    if (validatenull(obj)) obj = window.sessionStorage.getItem(name);
    if (validatenull(obj)) return;
    obj = JSON.parse(obj);
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
export const removeStore = name => {
    if (!name) return;
    window.localStorage.removeItem(name);
}

/**
 * 设置缓存
  */
export const setCache = (key, str) => {
    const date = new Date().getTime();
    const obj = {
        date: date,
        value: str,
    }
    setStore(key, obj);
}
/*获取缓存*/
export const getCache = (key, time) => {
    const str = JSON.parse(getStore(key));
    if (vaildUtil.ifnull(str)) return '';
    const date = str.date;
    //缓存是否大于有效期
    if ((parseInt(new Date() - new Date(date)) / 1000 / 60) < time) {
        return str.value;
    }
}