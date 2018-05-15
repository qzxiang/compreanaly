import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/page/Login'
import Layout from '@/page/Layout'
import Statistical from '@/page/Statistical'
import AppDelivery from '@/page/AppDelivery'
import AppManage from '@/page/AppManage'
import ApkDetail from '@/page/ApkDetail'
import IosDetail from '@/page/IosDetail'
import AppSearch from '@/page/AppSearch'
import ClassicCase from '@/page/ClassicCase'
import UserManage from '@/page/UserManage'
import AddUser from '@/page/AddUser'
import SetPwd from '@/page/SetPwd'
import SysManage from '@/page/SysManage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Login,
      meta: {
        name: '登录',
        requireAuth: false // 添加该字段，表示进入这个路由是需要登录的
      },
    },
    {
      path: '/layout',
      component: Layout,
      children: [
        {
          path: '',
          component: Statistical,
          meta: {
            name: '统计概览',
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          },
        },
        {
          path: '/appdelivery',
          component: AppDelivery,
          meta: {
            name: '应用投放',
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          },
        },
        {
          path: '/appmanage',
          component: AppManage,
          meta: {
            name: '应用管理',
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          },
        },
        {
          path: '/apkdetail',
          component: ApkDetail,
          meta: {
            name: '任务详情',
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          },
        },
        {
          path: '/iosdetail',
          component: IosDetail,
          meta: {
            name: '任务详情',
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          },
        },
        {
          path: '/appsearch',
          component: AppSearch,
          meta: {
            name: '应用搜索',
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          },
        },
        {
          path: '/classiccase',
          component: ClassicCase,
          meta: {
            name: '经典案例',
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          },
        },
        {
          path: '/usermanage',
          component: UserManage,
          meta: {
            name: '用户管理',
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          },
        },
        {
          path: '/adduser',
          component: AddUser,
          meta: {
            name: '添加用户',
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          },
        },
        {
          path: '/setpwd',
          component: SetPwd,
          meta: {
            name: '修改密码',
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          },
        },
        {
          path: '/sysmanage',
          component: SysManage,
          meta: {
            name: '系统管理',
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          },
        }
      ]
    }
  ]
})
