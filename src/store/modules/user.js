import { login, logout, getInfo ,getmenu} from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { asyncRoutes, constantRoutes } from '@/router'
import { resetRouter } from '@/router'
import Layout from '@/layout'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    routes: [],
    addRoutes: [],
    roles: [],
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
}
export function filterAsyncRoutes() {
  login({
      name:localStorage.getItem("name"),
      pass:localStorage.getItem("pass")
  }).then(response=>{
    // var data1 = []
    var data = []
    var role = []
    role = response
    localStorage.setItem('roles' , role.role)
      data = response.data.perTree.children
      data.forEach(item => {
        constantRoutes.push({
          path: item.path,
          component: Layout,
          redirect: item.redirect,
          meta: { title: item.label, icon: item.icon },
          children: getChilder(item.children)
        })
      })
  })
  return constantRoutes
}
export function getChilder(dd) {
  var data2 = []
  dd.forEach(item => {
    data2.push({
      path: item.path,
      name: item.vuekey,
      // 组价要经过特殊处理 不然动态加载不出来
      component:(resolve) => require([`@/views/${item.component}`], resolve),
    // component:  resolve => require([`${item.component}`], resolve), 这个方法还没有试过
      meta: { title: item.label, icon: item.icon }
    })
  })  
  return data2
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    localStorage.setItem("name" , username)
    localStorage.setItem("pass" , password)
    return new Promise((resolve, reject) => {
      // 后端接口传值
      login({ Name: username.trim(), Pass: password }).then(response => {
        commit('SET_TOKEN', response.data.token)
        setToken(response.data.token)
        localStorage.setItem('comid' , response.data.user.CompanyID)
        localStorage.setItem('ActionTime' , response.data.user.ActionTime)
        localStorage.setItem('ActionUserID' , response.data.user.ActionUserID)
        localStorage.setItem('ActionUserName' , response.data.user.ActionUserName)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      // let data = {
      //   roles : state.roles,
      //   name : state.name,
      //   avatar :'https://www.baidu.com/?tn=02003390_79_hao_pg'
      // };
      // commit ("SET_AVATAR" , "https://www.baidu.com/?tn=02003390_79_hao_pg")
      // resolve(data);
      getInfo({
        name:localStorage.getItem("name"),
        pass:localStorage.getItem("pass")
      }).then(response => {
        const { data } = response
        if (!data) {
          return reject('Verification failed, please Login again.')
        }
        const { name, avatar } = data
        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  // })
}, 
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout({
        name:localStorage.getItem("name"),
        pass:localStorage.getItem("pass")
      }).then(() => {
         location.reload()
        localStorage.clear();
        commit('RESET_STATE')
        removeToken() // must remove  token  first
        resetRouter()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  },
  generateRoutes({ commit }) {
    return new Promise(resolve => {
      let accessedRoutes
      accessedRoutes = filterAsyncRoutes()
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}



// store.dispatch('SETNAV' , 数据来源)
// state:{
// nav : [
// 
// ]
// }
// mutation:{  1
//   SETNAV({commit},data){
//  commit('SETNAV' , data)
// }
// 
// }
// 管理mutation  1
// actions{
// SETNAV({commit},data){
//  commit('SETNAV' , data)
// }
// } 

// 获取 $store.state.nav