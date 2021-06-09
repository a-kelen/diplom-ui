import Axios from '../axios'
const state = {
  ownLibraries: [],
  ownedLibraries: [],
  activeLibrary: {},
  topLibraries: [],
  cache: []
}

const getters = {
}

const mutations = {
  
  reset_state(state) {
    Object.assign(state, {
      ownLibraries: [],
      ownedLibraries: [],
      activeLibrary: {},
      cache: []
    })
  },

  updateElementType (state, val) {
    state.elementSelectType = val
  },

  updateNewLibraryName (state, val) {
    state.newLibraryName = val
  },

  set_own_libraries(state, val) {
    state.ownLibraries = val
  },

  set_top_libraries(state, val) {
    state.topLibraries = val
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
    state.activeLibrary.liked = val
    state.activeLibrary.likes += val ? 1 : -1
  },
  
  set_owned(state, val) {
    state.activeLibrary.owned = val;
  }
}

const actions = {
  //GET
  getOwnLibraryList({commit, state}) {
      return new Promise((resolve, reject) => {
      if(state.ownLibraries.length > 0)
        resolve()
      Axios.get('Library/ownLibraryList/')
        .then(resp => {
          commit('set_own_libraries', resp.data)
          resolve(resp.data)
        }).catch(err => {
          reject(err)
        })
    })
  },

  getTopLibraryList({commit, state}) {
    return new Promise((resolve, reject) => {
    if(state.topLibraries.length > 0)
      resolve()
    Axios.get('Library/topList/')
      .then(resp => {
        commit('set_top_libraries', resp.data)
        resolve(resp.data)
      }).catch(err => {
        reject(err)
      })
    })
  },

  getOwnedLibraryList({ commit , state}) {
    return new Promise((resolve, reject) => {
      if(state.ownedLibraries.length > 0)
        resolve()
      Axios.get('Library/ownedLibraryList/')
        .then(resp => {
          commit('set_owned_libraries', resp.data)
          resolve()
        })
        .catch(err => reject(err))
    })
  },

  getLibrary({ commit, state }, payload) {
    return new Promise((resolve) => {
      if(state.cache.some(c => c.author == payload.author && c.name == payload.name)) {
        commit('set_active_library', state.cache.find(c => c.author == payload.author && c.name == payload.name))
        resolve()
      }

      Axios.get(`Library/${payload.author}/${payload.name}`)
        .then(resp => {
          commit('set_active_library', resp.data)
          commit('add_to_cache', resp.data)
          resolve()
      })
    })
  },

  //POST
  createLibrary ({ commit }, payload) {
    return new Promise((resolve, reject) => {
    Axios.post('Library/', payload)
      .then(resp => {
        commit('add_own_library', resp.data)
        resolve()
      })
      .catch(err => reject(err))
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
  },

  report (_, payload) {
    return new Promise((resolve, reject) => {
      Axios.post('Library/report', payload)
        .then(resp => {
          if (resp.data) {
            resolve(resp.data)
          } else {
            reject(resp.data)
          }
        }).catch((err) => reject(err))
    })
  },

  //PUT
  updateLibrary ( _, payload) {
    return new Promise((resolve, reject) => {
    Axios.post('Library/update', payload)
      .then(resp => {
        resolve(resp.data)
      })
      .catch(err => reject(err))
    })
  },

  saveAvatar (  _, payload) {
    return new Promise((resolve, reject) => {
      const form = new FormData()
      form.append('libraryId', payload.libraryId)
      form.append('image', payload.blob)
    Axios.post('Library/avatar', form)
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