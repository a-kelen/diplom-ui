import Axios from '../axios'
const state = {
    activeComponent: {},
    ownComponents: [],
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