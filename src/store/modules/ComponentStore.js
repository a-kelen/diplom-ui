import Axios from '../axios'
const state = {
    activeComponent: {},
    ownComponents: [],
    ownedComponents: [],
    likedList: [],
    cache: []
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
    set_owned_components(state, val) {
      state.ownedComponents = val
    },
    add_own_component(state, val) {
      state.ownComponents.push(val)
    },
    add_to_cache(state, val) {
      state.cache.push(val)
    },
    set_active_component(state, val) {
      state.activeComponent = val
    },
    change_like(state, val) {
      state.activeComponent.liked = val;
    },
    set_owned(state, val) {
      state.activeComponent.owned = val;
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

    getOwnedComponentList({ commit }) {
      Axios.get('Component/ownedComponentList/')
        .then(resp => {
          commit('set_owned_components', resp.data)
        })
    },

    getComponent({ commit, state }, id) {
      if(state.cache.some(c => c.id == id)) {
        commit('set_active_component', state.cache.find(c => c.id == id))
        return
      }
      Axios.get(`Component/${id}`)
        .then(resp => {
          commit('set_active_component', resp.data)
          commit('add_to_cache', resp.data)
      })
    },


    //POST
    like({ commit, state }) {
      return new Promise((resolve, reject) => {
        Axios.post('Component/like', { id: state.activeComponent.id })
        .then(resp => {
          console.log(resp)
          commit('change_like', resp.data)
          resolve(resp)
        }).catch(err => {
          reject(err)
        })
      })
    },
    
    getOwn({ commit, state }) {
      return new Promise((resolve, reject) => {
        Axios.post('Component/get-own', { id: state.activeComponent.id })
        .then(resp => {
          commit('set_owned', resp.data.id == state.activeComponent.id)
          resolve(resp)
        }).catch(err => {
          reject(err)
        })
      })
    }
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