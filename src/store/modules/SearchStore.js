import Axios from '../axios'
const state = {
    dashboardSearchQuery: '',
    userProfileSearchQuery: '',
    users: [],
    components: [],
    libraries: []
}
// getters
const getters = {
 
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
    searchUsers({ commit }, searchQuery) {
        
        return new Promise((resolve, reject) => {
            Axios.get(`User/search/${searchQuery}`)
                .then(resp => {
                    commit('set_users', resp.data)
                    resolve()
                })
                .catch(err => {
                    reject(err)
                })
        })
    },

    searchComponents({ commit }, searchQuery) {
        return new Promise((resolve, reject) => {
            Axios.get(`Component/search/${searchQuery}`)
                .then(resp => {
                    commit('set_components', resp.data)
                    resolve()
                })
                .catch(err => {
                    reject(err)
                })
        })
    },

    searchLibraries({ commit }, searchQuery) {
        return new Promise((resolve, reject) => {
            Axios.get(`Library/search/${searchQuery}`)
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