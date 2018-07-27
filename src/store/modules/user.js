import { login, getMenu, getRolePermission } from '@/api/login'
import { Message } from 'element-ui'
import { getCookies, setCookies, removeCookies } from '@/utils/cookies'

const user = {
  state: {
    token: getCookies('token'),
    account: '',
    name: '',
    avatar: '',
    menus: [],
    roles: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_ACCOUNT: (state, account) => {
      state.account = account
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      if (avatar) {
        state.avatar = avatar
      } else {
        state.avatar = '/static/avatar/default.png'
      }
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_MENUS: (state, menus) => {
      console.log('menus', menus)
      state.menus = menus
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password).then(response => {
          const res = response.data
          if (res.success) {
            commit('SET_TOKEN', res.data.account)
            commit('SET_NAME', res.data.account)
            // commit('SET_ROLES', res.data.account)
            commit('SET_AVATAR', '/static/avatar/default.png')
            setCookies('token', res.data.account)
            setCookies('name', res.data.account)
            setCookies('id', res.data.id)
            setCookies('roleId', res.data.roleId)
            setCookies('status', res.data.status)
            setCookies('avatar', '/static/avatar/default.png')
            resolve()
          } else {
            Message.error(res.msg)
          }
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        commit('SET_NAME', getCookies('name'))
        commit('SET_AVATAR', getCookies('avatar'))
        resolve()
      })
    },

    // 获取用户Menu
    GetMenu({ commit, state }) {
      return new Promise((resolve, reject) => {
        getMenu(state.token).then(response => {
          const data = response.data
          console.log(data)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
        // commit('SET_NAME', getCookies('name'))
        resolve()
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        // logout(state.token).then(() => {
        //   commit('SET_TOKEN', '')
        //   commit('SET_ROLES', [])
        //   removeCookies('token')
        //   resolve()
        // }).catch(error => {
        //   reject(error)
        // })
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeCookies('token')
        resolve()
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeCookies('token')
        resolve()
      })
    },

    // 获取用户权限
    GetRolePermission({ commit }, account) {
      return new Promise((resolve, reject) => {
        getRolePermission(account).then(response => {
          const data = response.data
          if (data.data && data.data.length > 0) { // 验证返回的roles是否是一个非空数组
            commit('SET_ROLES', data.data)
            console.log(data,'aside')
            localStorage.setItem('SET_ROLES', JSON.stringify(data))
          } else {
            reject('getInfo: roles must be a non-null array !')
          }
          resolve()
        }).catch(error => {
          reject(error)
        })
        resolve()
      })
    }
  }
}

export default user