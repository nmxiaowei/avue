import { baseUrl, khglUrl, dicUrl } from '@/config/env'
import request from '@/router/axios'
import { userInfo, tableData } from '@/mock/user'
import menu from '@/mock/menu'
export const loginByUsername = (username, password) => {
    return new Promise((resolve, reject) => {
        resolve({ data: new Date().getTime() });
    })
}

export const getUserInfo = () => {
    return new Promise((resolve, reject) => {
        resolve({ data: userInfo });
    })
}
export const getMenu = () => {
    return new Promise((resolve, reject) => {
        resolve({ data: menu });
    })
}
export const getTableData = (page) => {
    return new Promise((resolve, reject) => {
        resolve({ data: tableData });
    })
}
export const logout = () => {
    return new Promise((resolve, reject) => {
        resolve();
    })
}



