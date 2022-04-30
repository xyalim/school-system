
/* Layout */
import Layout from '@/layout'
import { getRolesIdByName, getRolesIdExByName } from '@/config/roles'
/**
 * @description 角色控制页面 动态添加有权限的路由 隐藏无权限路由
 * 其中 父路由优先级将高于子路由
 * 未填roles默认全员允许
 */
const rolesRoute = [
  {
    path: '/major',
    component: Layout,
    redirect: '/major/index',
    meta: { title: '院系专业', icon: 'form'
    },
    children: [
      {
        path: 'index',
        name: 'Table',
        component: () => import('@/views/major/index'),
        meta: { title: '院系专业', icon: 'table' }
      }
      // {
      //   path: 'index2',
      //   name: 'Table',
      //   component: () => import('@/views/major/index'),
      //   meta: { title: '专业管理-学生能看', icon: 'table' },
      //   children: [
      //     {
      //       path: 'index3',
      //       name: 'Table',
      //       component: () => import('@/views/major/index'),
      //       meta: { title: '专业管理-学生能看', icon: 'table' }
      //     }
      //   ]
      // }
    ]
  },

  // {
  //   path: '/manage',
  //   component: Layout,
  //   redirect: '/index',
  //   meta: { title: '角色管理', icon: 'form' },
  //   children: [
  //     {
  //       path: 'student',
  //       name: 'Table',
  //       component: () => import('@/views/table/index'),
  //       meta: { title: '学生管理', icon: 'el-icon-user' }
  //     },
  //     {
  //       path: 'teacher',
  //       name: 'Table',
  //       component: () => import('@/views/table/index'),
  //       meta: { title: '教师管理', icon: 'el-icon-s-custom' }
  //     }
  //   ]
  // },

  {
    path: '/schedule',
    component: Layout,
    redirect: '/student',
    hidden: true,
    meta: { title: '课程管理', icon: 'form' },
    children: [
      {
        path: 'student',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: '学生课程表', icon: 'el-icon-user' }
      },
      {
        path: 'teacher',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: '老师排课表', icon: 'el-icon-s-custom' }
      }
    ]
  },

  {
    path: '/vacate',
    component: Layout,
    meta: { title: '请假管理', icon: 'el-icon-date' },
    children: [
      {
        path: 'index',
        name: 'Table',
        component: () => import('@/views/vacate/index'),
        meta: { title: '请假列表', icon: 'el-icon-date' }
      },
      {
        path: 'post-apply',
        name: 'Table',
        component: () => import('@/views/vacate/post-apply'),
        meta: { title: '请假申请', icon: 'el-icon-date', roles: getRolesIdByName('学生') }
      },
      {
        path: 'check',
        name: 'check',
        hidden: true,
        component: () => import('@/views/vacate/check'),
        meta: { title: '请假申请', icon: 'el-icon-date', roles: getRolesIdExByName('学生') }
      }
    ]
  },

  {
    path: '/message',
    component: Layout,
    redirect: '/message/index',
    meta: { title: '消息通知提醒', icon: 'el-icon-bell' },
    children: [
      {
        path: 'index',
        name: 'Table',
        component: () => import('@/views/message/index'),
        meta: { title: '消息列表', icon: 'el-icon-bell' }
      },
      {
        path: 'post-message',
        name: 'Table',
        component: () => import('@/views/message/post-message'),
        meta: { title: '发送消息', icon: 'el-icon-bell', roles: getRolesIdByName('系统管理员', '教学管理员') }
      }
    ]
  },

  {
    path: '/feedback',
    component: Layout,
    redirect: '/feedback/index',
    meta: { title: '建议反馈', icon: 'form' },
    children: [
      {
        path: 'index',
        name: 'Table',
        component: () => import('@/views/feedback/index'),
        meta: { title: '建议列表', icon: 'form', roles: getRolesIdByName('系统管理员', '教学管理员') }
      },
      {
        path: 'post-feed-back',
        name: 'Table',
        component: () => import('@/views/feedback/post-feed-back'),
        meta: { title: '提交建议', icon: 'form' }
      }
    ]
  }

]

rolesRoute.forEach(ele => {
  if (ele.meta) {
    ele.meta.pageType = 'role'
  } else {
    ele.meta = {
      pageType: 'role'
    }
  }
})
export default rolesRoute
