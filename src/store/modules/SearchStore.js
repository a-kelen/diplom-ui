import Axios from '../axios'
import Qs from 'qs'

const state = {
    dashboardSearchQuery: '',
    userProfileSearchQuery: '',
    users: [],
    components: [],
    libraries: []
}
// getters
const getters = {
    getUserAmount(state) {
        return state.users.length
    }
}

// mutations
const mutations = {
    set_users(state, val) {
        state.users = val
    },

    set_components(state, val) {
        state.components = val
    },
    
    set_libraries(state, val) {
        state.libraries = val
    },

    updateDashboardSearchQuery (state, val) {
        state.dashboardSearchQuery = val
    },
    
    updateUserProfileSearchQuery (state, val) {
        state.userProfileSearchQuery = val
    },
}

// actions
const actions = {
    searchUsers({ commit }, payload) {
        
        return new Promise((resolve, reject) => {
            Axios.get(`User/search/${payload.searchQuery}`)
                .then(resp => {
                    commit('set_users', resp.data)
                    resolve()
                })
                .catch(err => {
                    reject(err)
                })
        })
    },

    searchComponents({ commit }, payload) {
        return new Promise((resolve, reject) => {
            Axios.get('Component/search/', {
                params: {
                    searchQuery: payload.searchQuery,
                    labels: payload.labels
                },
                paramsSerializer: function(params) {
                    return Qs.stringify(params, {arrayFormat: 'repeat'})
                }
            })
                .then(resp => {
                    commit('set_components', resp.data)
                    resolve()
                })
                .catch(err => {
                    reject(err)
                })
        })
    },

    searchLibraries({ commit }, payload) {
        return new Promise((resolve, reject) => {
            Axios.get('Library/search/', {
                params: {
                    searchQuery: payload.searchQuery,
                    labels: payload.labels
                }
            })
                .then(resp => {
                    
                    commit('set_libraries', resp.data)
                    resolve()
                })
                .catch(err => {
                    reject(err)
                })
        })
    }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}