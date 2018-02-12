
const getters = {
    tag: state => state.tags.tag,
    tagList: state => state.tags.tagList,
    tagWel: state => state.tags.tagWel,
    token: state => state.user.token,
    roles: state => state.user.roles,
    permission: state => state.user.permission,
    menu: state => state.user.menu,
    errLog: state => state.errLog.errLog
}
export default getters
