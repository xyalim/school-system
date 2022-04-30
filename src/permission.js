import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login', '/register'] // no redirect whitelist
const loginFail = async(to, from, next) => {
  await store.dispatch('user/resetToken')
  next(`/login?redirect=${to.path}`)
  NProgress.done()
}

let isReplaceCount = 0

// 动态生成拥有角色权限的路由
const generateRoutes = async(to, from, next, userInfo) => {
  const addRoutes = store.getters.addRoutes
  // const saveRoutes = store.getters.routes

  if (addRoutes && addRoutes.length > 0 && isReplaceCount === 0) {
    router.addRoutes(addRoutes)
    // addRoutes.forEach((ele) => {
    //   router.options.routes.push(ele)
    // })
    // router.options.routes = saveRoutes
    // router.options.routes = [...router.options.routes, ...addRoutes]
    console.log(router.options.routes)
    // if (isReplaceCount < 1) {
    isReplaceCount++
    next({ ...to })
    // }
    return
  }
  const res = await store.dispatch('routes/generateRoutes', userInfo.group_id)
  // 动态添加可访问路由表（核心代码，没有它啥也干不了）
  router.addRoutes(res)
  console.log(router.options.routes)
  console.log(router.getRoutes)

  // res.forEach((ele) => {
  //   router.options.routes.push(ele)
  // })

  // router.options.routes = saveRoutes
  // router.options.routes = router.options.routes.splice(router.options.routes, router.options.routes.length, ...addRoutes)
  // [...router.options.routes, ...addRoutes]
  console.log(router.options.routes)

  // hack方法 确保addRoutes已完成
  next({ ...to })
}

// 拥有用户信息时候的操作
const hasUserInfoAction = async(to, from, next, userInfo) => {
  store.commit('user/SET_USERINFO', userInfo)
  // await generateRoutes(to, from, next, userInfo)

  const rootPath = to.matched[0]

  // 对需要特定角色权限管理的页面进行统一管理
  if (rootPath.meta.pageType === 'role') {
    const { group_id } = userInfo

    let lastRolesIndex = -1
    let undefinedCount = 0
    const matchedLen = to.matched.length
    for (let index = matchedLen - 1; index > -1; index--) {
      const ele = to.matched[index]
      console.log(to, ele, ele.meta.roles)
      if (ele.meta.roles && Array.isArray(ele.meta.roles)) {
        // 完整目标路径上不包含对应角色id时 此角色无权访问并退出匹配
        if (index === matchedLen - 1 && !ele.meta.roles.includes(group_id)) {
          break
        } else if (ele.meta.roles.includes(group_id)) {
          // 若上一级路径包含角色id时 此角色有权访问并退出匹配
          lastRolesIndex = index
          break
        }
      } else {
        undefinedCount++
      }
    }
    // 是否全路径未设特定角色权限
    const isAllUndefined = (lastRolesIndex === -1 && undefinedCount === matchedLen)

    // 有权访问目标页面
    if (lastRolesIndex !== -1 || isAllUndefined) {
      console.log('lastRoles', to.matched[lastRolesIndex], userInfo)
      next()
    } else {
      // 此页面无权访问 并返回首页
      next('/')
      Message.error('无权访问此页面！')
    }
  } else {
    next()
  }
}

router.beforeEach(async(to, from, next) => {
  console.trace()

  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else {
      const hasGetUserInfo = store.getters.userInfo
      // 是否含有用户信息
      if (hasGetUserInfo) {
        await hasUserInfoAction(to, from, next, hasGetUserInfo)
      } else {
        try {
          // get user info
          const userInfo = await store.dispatch('user/getUserInfo')
          const { group_id } = userInfo || {}

          if (!group_id) {
            loginFail(to, from, next)
            return
          }
          await hasUserInfoAction(to, from, next, userInfo)
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
