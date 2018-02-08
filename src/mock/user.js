import Mock from 'mockjs'
export const userInfo = {
    userInfo: {
        username: 'admin',
        name: 'avue',
    },
    roles: ['admin']
}
let List = []
for (let i = 0; i < 4; i++) {
    List.push(Mock.mock({
        id: '@increment',
        name: Mock.mock('@cname'),
        username: Mock.mock('@last'),
        'type|0-1': 0,
        'sex|0-1': 0,
        grade: [0, 1],
        address: Mock.mock('@cparagraph(1, 3)')
    }))
}
export const tableData = List;