const state = {
    ownLibraries: []
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
    add_own_library(state, val) {
      state.ownLibraries.push(val)
    }
  }

  const actions = {
    //GET
    getOwnComponentList({commit}) {
      Axios.get('Component/ownLibraryList/')
        .then(resp => {
          commit('set_own_libraries', resp.data)
        })
    },
    createLibrary ({ commit }, payload) {
      Axios.post('Library/', payload)
        .then(resp => {
          commit('add_own_library', resp.data)
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