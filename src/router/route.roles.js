
/* Layout */
import Layout from '@/layout'

const rolesRoute = [
  {
    path: '/major',
    component: Layout,
    redirect: '/major/index',
    meta: { title: '专业管理', icon: 'form' },
    children: [
      {
        path: 'index',
        name: 'Table',
        component: () => import('@/views/major/index'),
        meta: { title: '专业管理', icon: 'table' }
      }
    ]
  },
  {
    path: '/manage',
    component: Layout,
    redirect: '/index',
    meta: { title: '角色管理', icon: 'form' },
    children: [
      {
        path: 'student',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: '学生管理', icon: 'el-icon-user' }
      },
      {
        path: 'teacher',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: '教师管理', icon: 'el-icon-s-custom' }
      }
    ]
  },
  {
    path: '/leave',
    component: Layout,
    redirect: '/leave/index',
    meta: { title: '请假管理', icon: 'table' },
    children: [
      {
        path: 'index',
        name: 'Table',
        component: () => import('@/views/leave/index'),
        meta: { title: '请假管理', icon: 'el-icon-date' }
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
        meta: { title: '消息通知提醒', icon: 'el-icon-bell' }
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
        meta: { title: '建议反馈', icon: 'el-icon-message' }
      }
    ]
  }
]
export default rolesRoute
