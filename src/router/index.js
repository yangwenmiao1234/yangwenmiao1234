import Vue from 'vue'
import Router from 'vue-router'
import navData2 from '@/utils/navData.js'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
// import { responsive } from 'devtools/packages/app-frontend/src/plugins/responsive'
// import { connect } from 'devtools/packages/shell-electron/types'
// import { returnError } from 'devtools/packages/app-backend-vue3/src/util'

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  // {
  //   path: '/',
  //   component: Layout,
  //   redirect: '/dashboard',
  //   meta: { title: '用户管理', icon: 'dashboard' },
  //   children: [
  //     {
  //       path: 'dashboard',
  //       name: 'dashboard',
  //       component: () => import('@/views/dashboard/yonghuguanli'),
  //       meta: { title: '用户管理', icon: 'dashboard' }
  //     }
  //   ]
  // },
  {
    path: '/bangzhu',
    component: Layout,
    name: 'Bangzhu',
    redirect: '/bangzhu/shiyong',
    hidden: true,
    children: [
      {
        path: '/shiyong',
        name: 'Shiyong',
        hidden: true,
        component: () => import('@/views/bangzhu/shiyong/index'),
        meta: { title: '使用说明', icon: 'form' }
      },
      {
        path: '/guanyu',
        name: 'Guanyu',
        hidden: true,
        component: () => import('@/views/bangzhu/guanyu/index'),
        meta: { title: '关于', icon: 'form' }
      },
      {
        path: '/yuancheng',
        name: 'Yuancheng',
        hidden: true,
        component: () => import('@/views/bangzhu/yuancheng/index'),
        meta: { title: '远程协助', icon: 'form' }
      }
    ]
  }
  // {
  //   path: '/',
  //   component: Layout,
  //   redirect: '/dashboard',
  //   children: [{
  //     path: 'dashboard',
  //     name: 'dashboard',
  //     component: () => import('@/views/dashboard/yonghuguanli'),
  //     meta: { title: '惠工智科', icon: 'dashboard' }
  //   }]
  // },
  // 404 page must be placed at the end !!!
]

export const asyncRoutes = []
// console.log(navData)
navData2.forEach(item => {
  constantRoutes.push({
    path: item.path,
    component: Layout,
    redirect: item.redirect,
    meta: {
      title:
        item.meta === undefined ? item.children[0].meta.title : item.meta.title,
      icon: item.meta === undefined ? item.children[0].meta.icon : item.meta.icon
    },
    // meta: { title: item.meta.title, icon: item.meta.icon }
    children: getChilder(item.children)
  })
})

export function getChilder(dd) {
  var ss = '0'
  localStorage.setItem('ss', ss)
  var routers = []
  dd.forEach(item => {
    routers.push({
      path: item.path,
      name: item.name,
      component: item.component,
      meta: { title: item.meta.title, icon: item.meta.icon }
    })
  })
  return routers
}

const createRouter = () =>
  new Router({
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  })

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
