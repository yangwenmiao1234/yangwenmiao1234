import router from './router'
import store from './store'
import { Message } from 'element-ui' // ColorPicker,
import NProgress from 'nprogress' // progress bar 进度条
import 'nprogress/nprogress.css' // progress bar style 进度条样式
import { getToken } from '@/utils/auth' // get token from cookie 从cookie中获取token
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration NProgress配置

const whiteList = ['/login'] // no redirect whitelist 没有重定向白名单

// var getRouter

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
      // const hasGetPermissionRoutes = store.getters.permission_routes && store.getters.permission_routes.length > 0
      const hasGetUserInfo = store.getters.name
      if (hasGetUserInfo) {
        next()
      } else {
        try {
          // get user info 获取用户信息
          await store.dispatch('user/getInfo')
          // 如果获取到了姓名 那就说明已经登录成功了，就不用再添加
          // // 动态获取路由
          // const accessRoutes = await store.dispatch('user/generateRoutes')
          // // 动态添加路由
          // router.addRoutes(accessRoutes)
          // // 动态添加路由404
          // let lastRou = [ { path: '*', redirect: '/404', hidden: true }]
          // router.addRoutes(lastRou)
          // next({ ...to, replace: true }) // hack方法 确保addRoutes已完成
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
