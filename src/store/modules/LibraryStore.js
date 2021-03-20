import Axios from '../axios'
const state = {
  ownLibraries: [],
  ownedLibraries: [],
  activeLibrary: {},
  cache: []
}

const getters = {
}

const mutations = {
  updateElementType (state, val) {
    state.elementSelectType = val
  },
  updateNewLibraryName (state, val) {
    state.newLibraryName = val
  },
  set_own_libraries(state, val) {
    state.ownLibraries = val
  },
  set_owned_libraries(state, val) {
    state.ownedLibraries = val
  },
  add_own_library(state, val) {
    state.ownLibraries.push(val)
  },
  add_to_cache(state, val) {
    state.cache.push(val)
  },
  set_active_library(state, val) {
    state.activeLibrary = val
    // for(let c of state.activeLibrary.components) {
    //   c.author = state.activeLibrary.author
    //   c.library = state.activeLibrary.name
    //   console.log(c)
    // }
  },
  change_like(state, val) {
    state.activeLibrary.liked = val;
  },
  set_owned(state, val) {
    state.activeLibrary.owned = val;
  }
}

const actions = {
  //GET
  getOwnLibraryList({commit}) {
      return new Promise((resolve, reject) => {
      Axios.get('Library/ownLibraryList/')
        .then(resp => {
          commit('set_own_libraries', resp.data)
          resolve(resp.data)
        }).catch(err => {
          reject(err)
        })
    })
  },

  getOwnedLibraryList({ commit }) {
    return new Promise((resolve, reject) => {
      Axios.get('Library/ownedLibraryList/')
        .then(resp => {
          commit('set_owned_libraries', resp.data)
          resolve()
        })
        .catch(err => reject(err))
    })
},

  createLibrary ({ commit }, payload) {
    Axios.post('Library/', payload)
      .then(resp => {
        commit('add_own_library', resp.data)
      })
  },
  getLibrary({ commit, state }, id) {
    if(state.cache.some(c => c.id == id)) {
      commit('set_active_library', state.cache.find(c => c.id == id))
      return
    }
    Axios.get(`Library/${id}`)
      .then(resp => {
        commit('set_active_library', resp.data)
        commit('add_to_cache', resp.data)
    })
  },
  like({ commit, state }) {
    return new Promise((resolve, reject) => {
      Axios.post('Library/like', { id: state.activeLibrary.id })
      .then(resp => {
        commit('change_like', resp.data)
        resolve(resp)
      }).catch(err => {
        reject(err)
      })
    })
  },
  
  getOwn({ commit, state }) {
    return new Promise((resolve, reject) => {
      Axios.post('Library/get-own', { id: state.activeLibrary.id })
      .then(resp => {
        commit('set_owned', resp.data.id == state.activeLibrary.id)
        resolve(resp)
      }).catch(err => {
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