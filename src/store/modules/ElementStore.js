import Axios from '../axios'
const state = {
    elementSelectType: 0,
    elementType: '',
    elementLabels: [],
    searchedLabels: [],
    status: false,
    newLibraryName: 'Library name',
    newLibraryAvatar: null,
    newLibraryHasDuplicates: false,
    newLibraryDescription: 'Library Description',
    newComponent: {
      name: '',
      files: [],
      events: [],
      slots: [],
      props: [],
      description: 'Description ...',
      dependencies: '',
      status: false
    },
    components: [],

    likedList: []
  }

  const getters = {
  }
  
  const mutations = {
    

    set_liked(state, val) {
      state.likedList = val
    },
    set_searched_labels(state, val) {
      state.searchedLabels = val
    },

    set_labels(state, val) {
      state.elementLabels = val
    },

    updateElementType (state, val) {
      state.elementSelectType = val
    },

    updateType (state, val) {
      state.elementType = val
    },

    updateStatus (state, val) {
      state.status = val
    },

    updateNewLibraryName (state, val) {
      state.newLibraryName = val
    },

    updateNewLibraryAvatar (state, val) {
      state.newLibraryAvatar = val
    },

    updateNewLibraryHasDuplicates (state, val) {
      state.newLibraryHasDuplicates = val
    },

    updateNewLibraryDescription (state, val) {
      state.newLibraryDescription = val
    },
    
    addNewComponentToLibrary(state) {
      state.components.push({
        id: state.components.length + 1,
        name: '',
        files: [],
        events: [],
        props: [],
        slots: [],
        description: 'Description ...',
        dependencies: '',
        isDone: false
      })
    },

    refreshNewComponent(state) {
      state.newComponent = {
        name: '',
        files: [],
        events: [],
        props: [],
        slots: [],
        description: '',
        dependencies: '',
        status: true
      }
    },

    deleteComponent(state, val) {
      state.components = state.components.filter(x => x.id != val)
    }
  }

  const actions = {

    searchLabels({ commit }, searchQuery) {
        
      return new Promise((resolve, reject) => {
          Axios.get('Label/search', { params: {
            searchQuery
          } })
              .then(resp => {
                  commit('set_searched_labels', resp.data)
                  resolve()
              })
              .catch(err => {
                  reject(err)
              })
      })
  },

    getLikedLibraries({ commit }) {
      return new Promise((resolve, reject) => {
        Axios.get('Like/liked')
        .then(resp => {
          commit('set_liked', resp.data)
          resolve(resp)
        }).catch(err => {
          reject(err)
        })
      })
    },
    
    createElement ({ commit, dispatch, state }) {
      if(state.elementSelectType == 0) {
        var libraryFiles = [];
        for(var i=0; i<state.components.length; i++){
          let fs = state.components[i].files.map(x => new File([x], `${state.components[i].name}/${x.name}`))
          libraryFiles = libraryFiles.concat(fs);
        }
        let payload = {
          name: state.newLibraryName,
          description: state.newLibraryDescription,
          components: state.components,
          status: state.status,
          type: state.elementType,
          labels: state.elementLabels
        }
        let formData = new FormData()
        for(let i=0; i < libraryFiles.length; i++){
          formData.append('files', libraryFiles[i])
        }
        return new Promise((resolve, reject) => {
          Axios.post('Library/', payload)
            .then(resp => {
              formData.append('elementId', resp.data.id)
              formData.append('descriminator', 'library')
              if(state.newLibraryAvatar)
                dispatch(
                  'LibraryStore/saveAvatar',
                  { libraryId: resp.data.id, blob: state.newLibraryAvatar },
                  { root: true }
                )
              Axios.post('File/upload-files', formData)
                .then(resp => {
                  commit('LibraryStore/add_own_library', resp.data, { root: true })
                    resolve(resp.data)
                }).catch(err => {
                  reject(err)
                })
            })
            .catch(reject)
          })
      }
      if(state.elementSelectType == 1) {
        let formData = new FormData()
        for(let i=0; i < state.newComponent.files.length; i++){
          formData.append('files', state.newComponent.files[i])
        }
        state.newComponent.status = state.status
        return new Promise((resolve, reject) => {
          Axios.post('Component/', {
            ...state.newComponent,
            status: state.status,
            type: state.elementType,
            labels: state.elementLabels
          })
            .then(resp => {
              formData.append('elementId', resp.data.id)
              formData.append('descriminator', 'component')
              Axios.post('File/upload-files', formData)
                .then(resp => {
                  commit('ComponentStore/add_own_component', resp.data, { root: true })
                  resolve(resp.data)
                }).catch(err => {
                  reject(err)
                })
            })
            .catch(err => {
              console.log(err)
              reject(err)
            })
        })
      }
    },

    report (_, payload) {
      return new Promise((resolve, reject) => {
        Axios.post('User/report', payload)
          .then(resp => {
            if (resp.data) {
              resolve(resp.data)
            } else {
              reject(resp.data)
            }
          }).catch((err) => reject(err))
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