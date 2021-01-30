import Axios from '../axios'
const state = {
  status: '',
  token: localStorage.getItem('token') || '',
  user: {}
}
// getters
const getters = {
  isLoggedIn: state => !!state.token,
  authStatus: state => state.status
}
// actions
const actions = {
  login ({ commit }, user) {
    return new Promise((resolve, reject) => {
      commit('auth_request')
      Axios({ url: 'User/login', data: user, method: 'POST' })
        .then(resp => {
          const token = resp.data.token
          const user = {
            email: resp.data.email,
            name: resp.data.name,
            nickname: resp.data.nickname
          }
          localStorage.setItem('token', token)
          Axios.defaults.headers.common.Authorization = token
          commit('auth_success', { token, user })
          resolve(resp)
        })
        .catch(err => {
          commit('auth_error', err)
          localStorage.removeItem('token')
          reject(err)
        })
    })
  },
  getCurrentUser ({ commit }) {
    return new Promise((resolve, reject) => {
      commit('auth_request')
      if (localStorage.getItem('token') != null) {
        Axios({ url: 'User', method: 'GET' })
          .then(resp => {
            const user = {
              email: resp.data.email,
              name: resp.data.name,
              nickname: resp.data.nickname
            }
            commit('reauth_success', user)
            resolve(resp)
          })
          .catch(err => {
            reject(err)
          })
      }
    })
  },
  register ({ commit }, user) {
    return new Promise((resolve, reject) => {
      commit('auth_request')
      Axios.post('user', user)
        .then(resp => {
          console.log(resp)
          const token = resp.data.token
          const user = {
            email: resp.data.email,
            id: resp.data.id,
            name: resp.data.name,
            nickname: resp.data.nickname
          }
          localStorage.setItem('token', token)
          Axios.defaults.headers.common.Authorization = token
          commit('auth_success', { token, user })
          resolve(resp)
        })
        .catch(err => {
          commit('auth_error', err)
          localStorage.removeItem('token')
          reject(err)
        })
    })
  },
  logout ({ commit }) {
    return new Promise((resolve) => {
      commit('logout')
      localStorage.removeItem('token')
      delete Axios.defaults.headers.common.Authorization
      resolve(true)
    })
  },
  changeProfile ({ commit }, user) {
    Axios.put('user', user)
      .then(resp => {
        commit('update_user', resp.data)
      })
  },
  changePassword (_, payload) {
    return new Promise((resolve, reject) => {
      Axios.post('user/password', payload)
        .then(resp => {
          if (resp.data) {
            resolve(resp.data)
          } else {
            reject(resp.data)
          }
        })
    })
  }
}
// mutations
const mutations = {
  auth_request (state) {
    state.status = 'loading'
  },
  auth_success (state, payload) {
    state.status = 'success'
    state.token = payload.token
    state.user = payload.user
  },
  reauth_success (state, user) {
    state.status = 'success'
    state.token = localStorage.getItem('token')
    state.user = user
  },
  auth_error (state) {
    state.status = 'error'
  },
  logout (state) {
    state.status = ''
    state.token = ''
    state.user = {}
  },
  update_user (state, user) {
    state.user.name = user.name
  }
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}