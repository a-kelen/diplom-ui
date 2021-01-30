import Axios from '../axios'
const state = {
    ownComponents: []
  }

  const getters = {
  }
  
  const mutations = {
    updateElementType(state, val) {
      state.elementSelectType = val
    },
    updateNewLibraryName(state, val) {
      state.newLibraryName = val
    },
    set_own_components(state, val) {
      state.ownComponents = val
    },
    add_own_component(state, val) {
      state.ownComponents.push(val)
    }
  }

  const actions = {
    //GET
    getOwnComponentList({ commit }) {
        Axios.get('Component/ownComponentList/')
          .then(resp => {
            commit('set_own_components', resp.data)
          })
    },

    //CREATE
    

    //DELETE
    // softDelete(_, payload) {
    //   return new Promise(() => {
    //     Axios.delete()
    //       .then(resp => {

    //       })
    //   })
    // }
  }


  
  export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
  }