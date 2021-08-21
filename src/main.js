import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN'
// lang i18n
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import Moment from 'moment'
Vue.prototype.moment = Moment

import '@/styles/index.scss' // global css
// import 'lib-flexible'
import App from './App'
import store from './store'
import router from './router'
import './rem.js'
import '@/dialog'
import '@/icons' // icon
import '@/permission' // permission control
// axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
// import 'lib-flexible'
// import qs from 'qs'
// import vueConfig from 'vue.config'

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
// if (process.env.NODE_ENV === 'production') {
//   const { mockXHR } = require('../mock')
//   mockXHR()
// }

// set ElementUI lang to EN
// var eventHub = new Vue();
ElementUI.TableColumn.props.showOverflowTooltip = { type: Boolean, default: true }
Vue.use(ElementUI)
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(Vuex)
Vue.config.productionTip = false

// Vue.protorype.$qs = qs;

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
