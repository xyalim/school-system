
import rolesRoute from '@/router/route.roles'
import systemRoutes from '@/router/route.system'

const state = {
  routes: [],
  addRoutes: []
}
// 404 page must be placed at the end !!!
const notFoundPage = { path: '*', redirect: '/404', hidden: true, meta: { pageType: 'system' }}

/**
 * @description 用来把角色和route.meta.role来进行匹配
 * route.meta.roles 始终为数组
 * @param {*} group_id
 * @param {*} route
 * @returns
 */
function hasPermission(group_id, route) {
  if (route.meta && Array.isArray(route.meta.roles)) {
    if (route.meta.roles.includes(group_id)) {
      return true
    } else {
      return false
    }
  } else {
    return true
  }
}

/**
 * @description 过滤掉不符角色权限的路由
 * @param {object} routes
 * @param {number} group_id 权限id
 * @returns
 */
const filterRolesRoutes = (routes, group_id) => {
  const res = []
  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(group_id, tmp)) {
      if (tmp.children) {
        tmp.children = filterRolesRoutes(tmp.children, group_id)
      }
      res.push(tmp)
    }
  })
  return res
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    // 这个地方维护了两个状态一个是addRouters，一个是routes
    state.addRoutes = routes
    state.routes = systemRoutes.concat(routes)
  }

}

const actions = {
  generateRoutes({ commit, state }, group_id) {
    const filterRoutes = filterRolesRoutes(rolesRoute, group_id)
    filterRoutes.push(notFoundPage)
    commit('SET_ROUTES', filterRoutes)
    return filterRoutes
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
