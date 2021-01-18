const state = {
    elementSelectType: 0,
    newLibraryName: ''
  }

  const getters = {
  }
  
  const mutations = {
    updateElementType (state, val) {
      state.elementSelectType = val
    },
    updateNewLibraryName (state, val) {
      state.newLibraryName = val
    }
  }

  const actions = {
      
  }


  
  export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
  }