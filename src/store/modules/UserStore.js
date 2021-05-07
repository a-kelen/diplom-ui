import Axios from '../axios'
const state = {
  status: '',
  token: localStorage.getItem('token') || '',
  user: {},
  activeProfile: {},
  topUsers: []

}
// getters
const getters = {
  isLoggedIn: state => !!state.token,
  authStatus: state => state.status
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

  set_top_users(state, val) {
    state.topUsers = val
  },

  reset_state() {
    Object.assign(state, {
      status: '',
      token: localStorage.getItem('token') || '',
      user: {},
      activeProfile: {}
    
    })
  },

  logout() {
    location.reload()
  },

  update_user (state, user) {
    state.user.name = user.name
  },
  
  set_avatar(state, val) {
    state.user.avatar = val
  },

  set_active_profile (state, user) {
    state.activeProfile = user
  },

  follow_user (state, val) {
    state.activeProfile.followed = val
    state.activeProfile.followersCount += val ? 1 : -1
  }
}

// actions
const actions = {

  getTopUsersList({commit, state}) {
    return new Promise((resolve, reject) => {
    if(state.topUsers.length > 0)
      resolve()
    Axios.get('User/topList/')
      .then(resp => {
        commit('set_top_users', resp.data)
        resolve(resp.data)
      }).catch(err => {
        reject(err)
      })
    })
  },

  getCurrentUser ({ commit, dispatch }) {
    return new Promise((resolve, reject) => {
      commit('auth_request')
      if (localStorage.getItem('token') != null) {
        Axios({ url: 'User', method: 'GET' })
          .then(resp => {
            const user = resp.data
            commit('reauth_success', user)
            dispatch('getAvatar', user.username)
            resolve(resp)
          })
          .catch(err => {
            reject(err)
            commit('auth_error', err)
          })
      }
    })
  },

  getAvatar({ commit }, username) {
    Axios.get(`User/avatar/${ username }`, {
        responseType: 'blob'
    }).then(resp => {
        var reader = new FileReader()
        reader.readAsDataURL(resp.data)
        reader.onload = () => {
          commit('set_avatar', reader.result)
        }
      })
  },

  getProfile ({ commit }, username) {
    return new Promise((resolve, reject) => {
        Axios(`User/${ username }`)
          .then(resp => {
            commit('set_active_profile', resp.data)
            resolve(resp)
          })
          .catch(err => {
            reject(err)
          })
    })
  },

  register ({ commit }, user) {
    return new Promise((resolve, reject) => {
      commit('auth_request')
      Axios.post('User', user)
        .then(resp => {
          const token = resp.data.token
          const user = {
            email: resp.data.email,
            id: resp.data.id,
            name: resp.data.name,
            username: resp.data.username
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
          Axios.defaults.headers.common.Authorization = 'Bearer ' + token
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

  followUser ({ commit }, username) {
    return new Promise((resolve, reject) => {
      Axios.post('User/follow', {username: username})
        .then(resp => {
          commit('follow_user', resp.data)
          resolve(resp.data)
        })
        .catch(err => {
          reject(err)
        })
    })
  },

  changePassword (_, payload) {
    return new Promise((resolve, reject) => {
      Axios.post('User/change-password', payload)
        .then(resp => {
          if (resp.data) {
            resolve(resp.data)
          } else {
            reject(resp.data)
          }
        })
    })
  },

  report (_, payload) {
    return new Promise((resolve, reject) => {
      Axios.post('User/report', payload)
        .then(resp => {
          if (resp.data) {
            resolve(resp.data)
          } else {
            reject(resp.data)
          }
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
    return new Promise((resolve, reject) => {
      Axios.put('User', user)
        .then(resp => {
          commit('update_user', resp.data)
          resolve()
        }) 
        .catch(() => reject())
    })
  },

  saveAvatar (  _, payload) {
    return new Promise((resolve, reject) => {
      const form = new FormData()
      form.append('image', payload.blob)
    Axios.put('User/avatar', form)
      .then(resp => {
        resolve(resp.data)
      })
      .catch(err => reject(err))
    })
  },
  
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}