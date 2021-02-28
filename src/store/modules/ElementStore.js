import Axios from '../axios'
const state = {
    elementSelectType: 0,
    status: true,
    newLibraryName: 'a',
    newLibraryDescription: 'a',
    newComponent: {
      files: [],
      events: [],
      props: [],
      description: '',
      status: true
    },
    components: []
  }

  const getters = {
  }
  
  const mutations = {
    updateElementType (state, val) {
      state.elementSelectType = val
    },
    updateStatus (state, val) {
      state.status = val
    },
    updateNewLibraryName (state, val) {
      state.newLibraryName = val
    },
    updateNewLibraryDescription (state, val) {
      state.newLibraryDescription = val
    },
    
    addNewComponentToLibrary(state) {
      state.components.push({
        id: state.components.length + 1,
        files: [],
        events: [],
        props: [],
        description: ''
      })
    },
    refreshNewComponent(state) {
      state.newComponent = {
        files: [],
        events: [],
        props: [],
        description: '',
        status: true
      }
    },
    deleteComponent(state, val) {
      state.components = state.components.filter(x => x.id != val)
    }
  }

  const actions = {
    createElement ({ commit, state }) {
      if(state.elementSelectType == 0) {
        var libraryFiles = [];
        for(var i=0; i<state.components.length; i++){
          libraryFiles = libraryFiles.concat(state.components[i].files);
        }
        console.log(libraryFiles);
        let payload = {
          name: state.newLibraryName,
          description: state.newLibraryDescription,
          components: state.components,
          status: state.status
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
              commit('ComponentStore/add_own_component', resp.data)
              Axios.post('File/upload-files', formData)
                .then(resp => {
                  commit('LibraryStore/add_own_library', resp.data, { root: true })
                  resolve(resp.data)
                }).catch(err => {
                  reject(err)
                })
            })
          })
      }
      if(state.elementSelectType == 1) {
        let formData = new FormData()
        for(let i=0; i < state.newComponent.files.length; i++){
          formData.append('files', state.newComponent.files[i])
        }
        state.newComponent.status = state.status
        return new Promise((resolve, reject) => {
          Axios.post('Component/', state.newComponent)
            .then(resp => {
              formData.append('elementId', resp.data.id)
              formData.append('descriminator', 'component')
              commit('ComponentStore/add_own_component', resp.data)
              Axios.post('File/upload-files', formData)
                .then(resp => {
                  commit('ComponentStore/add_own_component', resp.data, { root: true })
                  resolve(resp.data)
                }).catch(err => {
                  reject(err)
                })
            })
        })
      }
      
    },
    uploadFiles ({ state }) {
      Axios.post('File/upload-files', state.newComponent.files)
        .then(resp => {
          console.log(resp);
          // commit('add_own_library', resp.data)
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