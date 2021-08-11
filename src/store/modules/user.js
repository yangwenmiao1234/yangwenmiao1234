import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: ''
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
  // SET_GETROUTER:(state, avatar)=>{

  // }
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

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout({
        name:localStorage.getItem("name"),
        pass:localStorage.getItem("pass")
      }).then(() => {
        localStorage.clear();
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
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