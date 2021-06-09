import Axios from '../axios'
const state = {
    activeComponent: {},
    ownComponents: [],
    ownedComponents: [],
    topComponents: [],
    likedList: [],
    cache: []
  }

  const getters = {
  }
  
  const mutations = {
    
    reset_state(state) {
      Object.assign(state, {
        activeComponent: {},
        ownComponents: [],
        ownedComponents: [],
        likedList: [],
        cache: []
      })
    },

    updateElementType(state, val) {
      state.elementSelectType = val
    },

    updateNewLibraryName(state, val) {
      state.newLibraryName = val
    },

    set_own_components(state, val) {
      state.ownComponents = val
    },

    set_top_components(state, val) {
      state.topComponents = val
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
      state.activeComponent.liked = val
      state.activeComponent.likes += val ? 1 : -1
    },

    set_owned(state, val) {
      state.activeComponent.owned = val
    }
  }

  const actions = {
    //GET
    getOwnComponentList({ commit, state}) {
      return new Promise((resolve, reject) => {
        if(state.ownComponents.length > 0)
        resolve()
        Axios.get('Component/ownComponentList/')
          .then(resp => {
            commit('set_own_components', resp.data)
            resolve()
          })
          .catch(err => reject(err))
      })
    },

    getOwnedComponentList({ commit, state }) {
      return new Promise((resolve, reject) => {
        if(state.ownedComponents.length > 0)
          resolve()
        Axios.get('Component/ownedComponentList/')
          .then(resp => {
            commit('set_owned_components', resp.data)
            resolve()
          })
          .catch(err => reject(err))
      })
    },

    getTopComponentList({ commit, state }) {
      return new Promise((resolve, reject) => {
        if(state.topComponents.length > 0)
          resolve()
        Axios.get('Component/topList/')
          .then(resp => {
            commit('set_top_components', resp.data)
            resolve()
          })
          .catch(err => reject(err))
      })
    },

    getComponent({ commit }, params) {
      return new Promise((resolve, reject) => {
      Axios.get('Component', { params })
        .then(resp => {
          commit('set_active_component', resp.data)
          commit('add_to_cache', resp.data)
          resolve();
      })
      .catch((err) => {
        reject(err)
      })
    })
    },


    //POST
    like({ commit, state }) {
      return new Promise((resolve, reject) => {
        Axios.post('Component/like', { id: state.activeComponent.id })
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
        Axios.post('Component/get-own', { id: state.activeComponent.id })
        .then(resp => {
          commit('set_owned', resp.data.id == state.activeComponent.id)
          resolve(resp)
        }).catch(err => {
          reject(err)
        })
      })
    },

    report (_, payload) {
      return new Promise((resolve, reject) => {
        Axios.post('Component/report', payload)
          .then(resp => {
            if (resp.data) {
              resolve(resp.data)
            } else {
              reject(resp.data)
            }
          })
          .catch((err) => reject(err))
      })
    },

    //PUT
    updateComponent ( _, payload) {
      return new Promise((resolve, reject) => {
      Axios.post('Component/update', payload)
        .then(resp => {
          
          resolve(resp.data)
        })
        .catch(err =>  { 
          reject(err) 
        })
      })
    },

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