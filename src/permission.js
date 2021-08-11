import router from './router'
import store from './store'
import { ColorPicker, Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar 进度条
import 'nprogress/nprogress.css' // progress bar style 进度条样式
import { getToken } from '@/utils/auth' // get token from cookie 从cookie中获取token
import getPageTitle from '@/utils/get-page-title'
// import asyncRoutes from '@/router/index.js'
import navData2 from "@/utils/navData.js"  //引入路由假数据
import Layout from '@/layout'  //引入组件
// import { querymenu } from '@/api/menu.js'

NProgress.configure({ showSpinner: false }) // NProgress Configuration NProgress配置

const whiteList = ['/login'] // no redirect whitelist 没有重定向白名单

var getRouter  //定义接受路由数组
// 遍历路由假数据 获取需要的路由数据
// navData2.forEach(item=>{
//   getRouter.push({
//       path: item.path,
//       component: Layout,
//       redirect: item.redirect,
//       meta: { title: (item.meta == undefined ? item.children[0].meta.title : item.meta.title), icon: item.meta == undefined ? item.children[0].meta.icon : item.meta.icon }
//       // meta: { title: item.meta.title, icon: item.meta.icon }
//       ,
//        children: getChilder(item.children)
//     })
//   }
//   )

// export function getChilder(dd) {
//   var ss = '0'
//   localStorage.setItem('ss' , ss)
//   var routers = [];
//    dd.forEach(item => {
//      routers.push({
//       path: item.path,
//       name: item.name,
//       component: item.component,
//       meta: { title: item.meta.title, icon: item.meta.icon }
//     })
//   })
//   return routers;
// }

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in 判断用户是否已经登录
  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page 如果已登录，则重定向到主页
      next({ path: '/' })
      NProgress.done()
    } else {
      const hasGetUserInfo = store.getters.name
      if (hasGetUserInfo) {
        next()
      } else {
        try {
          // get user info 获取用户信息
          await store.dispatch('user/getInfo')
          // // 动态添加路由
          // router.addRoutes(getRouter)
          next()
        } catch (error) {
          // 移除令牌，到登录页面重新登录 
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
      // in the free login whitelist, go directly 在免费登录白名单，直接去
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      // 其他没有访问权限的页面被重定向到登录页面。
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar 完成进度条
  NProgress.done()
})

