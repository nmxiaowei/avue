/**
 * 存储localStorage
 */
export const setStore = (name, content) => {
    if (!name) return;
    if (typeof content !== 'string') {
        content = JSON.stringify(content);
    }
    window.localStorage.setItem(name, content);
}
/**
 * 获取localStorage
 */
export const getStore = name => {
    if (!name) return;
    return window.localStorage.getItem(name);
}

/**
 * 删除localStorage
 */
export const removeStore = name => {
    if (!name) return;
    window.localStorage.removeItem(name);
}
export const setSessionStore = (name, content) => {
    if (!name) return;
    if (typeof content !== 'string') {
        content = JSON.stringify(content);
    }
    window.sessionStorage.setItem(name, content);
}
/**
 * 获取sessionStorage
 */
export const getSessionStore = name => {
    if (!name) return;
    return window.sessionStorage.getItem(name);
}

/**
 * 删除lsessionStorage
 */
export const removeSessionStore = name => {
    if (!name) return;
    window.sessionStorage.removeItem(name);
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