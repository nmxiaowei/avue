import { userTableData, roleTableData } from '@/mock/admin'
export const getUserData = (page) => {
    return new Promise((resolve, reject) => {
        resolve({ data: userTableData });
    })
}

export const getRoleData = (page) => {
    return new Promise((resolve, reject) => {
        resolve({ data: roleTableData });
    })
}