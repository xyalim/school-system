import { roles } from '@/config/roles'

const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  // 用户信息
  userInfo: state => state.user.userInfo,
  // 用户名
  name: state => state.user.userInfo.username,
  // 用户角色id
  group_id: state => state.user.userInfo.group_id,
  // 角色名
  roleName: state => {
    const roleItem = roles.find(ele => {
      return state.user.userInfo.group_id === ele.group_id
    })
    return roleItem.roleName
  },
  addRoutes: state => state.routes.addRoutes,
  routes: state => state.routes.routes
}
export default getters
