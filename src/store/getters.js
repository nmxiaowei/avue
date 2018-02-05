
const getters = {
    tag: state => state.tags.tag,
    tagList: state => state.tags.tagList,
    token: state => state.user.token,
    roles: state => state.user.roles,
    menu: state => state.user.menu
}
export default getters
