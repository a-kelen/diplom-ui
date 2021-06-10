import Axios from '../axios'
const state = {
  status: '',
  token: localStorage.getItem('token') || '',
  user: {
    avatar: null
  },
  isLoggedIn: false,
  init: false,
  activeProfile: {},
  topUsers: [],
  followedUsers: [],
  activitiesPage: []

}
// getters
const getters = {
  isLoggedIn: state => state.isLoggedIn,
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
    state.isLoggedIn = true
    state.init = true
  },

  reauth_success (state, user) {
    state.status = 'success'
    state.token = localStorage.getItem('token')
    state.user = user
    state.isLoggedIn = true
    state.init = true
  },

  auth_error (state) {
    state.status = 'error'
    state.isLoggedIn = false
  },

  set_top_users(state, val) {
    state.topUsers = val
  },

  set_followed_users(state, val) {
    state.followedUsers = val
  },

  set_activities_page(state, val) {
    state.activitiesPage = val
  },

  reset_state() {
    Object.assign(state, {
      status: '',
      token: localStorage.getItem('token') || '',
      user: {},
      activities: {}
    
    })
  },

  logout() {
    //location.reload()
  },

  update_user (state, user) {
    state.user.name = user.name
  },
  
  set_avatar(state, val) {
    state.user.avatar = val
  },

  set_role(state, val) {
    state.user.role = val
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

  getActivities({commit}, page) {
    return new Promise((resolve, reject) => {
    Axios.get('User/activities', {
      params: { page }
    })
      .then(resp => {
        commit('set_activities_page', resp.data)
        resolve(resp.data)
      }).catch(err => {
        reject(err)
      })
    })
  },

  getFollowedUsers({commit}) {
    return new Promise((resolve, reject) => {
    Axios.get('User/followed-users')
      .then(resp => {
        commit('set_followed_users', resp.data)
      }).catch(err => {
        reject(err)
      })
    })
  },

  getTopUsersList({commit, state}) {
    return new Promise((resolve, reject) => {
    if(state.topUsers.length > 0)
      resolve()
    Axios.get('User/top-list')
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
      Axios.get('User')
        .then(resp => {
          const user = resp.data
          commit('reauth_success', user)
          if(user.hasAvatar)
            dispatch('getAvatar', user.username)
          resolve(resp)
        })
        .catch(err => {
          reject(err)
          commit('auth_error', err)
        })
      
    })
  },

  getAvatar({ commit }, username) {
    return new Promise((resolve, reject) => {
      Axios.get(`User/avatar/${ username }`, {
          responseType: 'blob'
      }).then(resp => {
          var reader = new FileReader()
          reader.readAsDataURL(resp.data)
          reader.onload = () => {
            commit('set_avatar', reader.result)
            resolve()
          }
        }).catch((err) => reject(err)) 
    })
  },

  getRole({ commit }) {
    return new Promise((resolve, reject) => {
      try {
        Axios.get('Admin/role')
          .then(resp => {
            commit('set_role', resp.data)
            resolve()
          })
          .catch((err) => {
            reject(err)
          })
      } catch(err) {
        console.log(err)
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
      Axios.post('User/register', user)
        .then(resp => {
          const token = resp.data.token
          localStorage.setItem('token', token)
          Axios.defaults.headers.common.Authorization = token
          commit('auth_success', { token, user: resp.data })
          resolve(resp)
        })
        .catch(err => {
          commit('auth_error', err)
          localStorage.removeItem('token')
          reject(err)
        })
    })
  },

  login({ commit, dispatch }, user) {
    return new Promise((resolve, reject) => {
      commit('auth_request')
      Axios({ url: 'User/login', data: user, method: 'POST' })
        .then(resp => {
          const token = resp.data.token 
          const user = {
            email: resp.data.email,
            name: resp.data.name,
            nickname: resp.data.nickname,
            username: resp.data.username,
            role: resp.data.role
          }
          commit('auth_success', { token, user })
          
          if(resp.data.hasAvatar)
            dispatch('getAvatar', resp.data.username)
          resolve(resp)
        })
        .catch(err => {
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

  logout () {   
    return new Promise((resolve, reject) => {
      Axios({ url: 'User/logout', method: 'POST' })
        .then(resp => {
           resolve(resp)
        })
        .catch(err => {
          reject(err)
        })
    })
  },

  changeProfile ({ commit }, user) {
    return new Promise((resolve, reject) => {
      Axios.post('User', user)
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
    Axios.post('User/avatar', form)
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