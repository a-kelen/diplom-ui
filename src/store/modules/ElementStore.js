const state = {
    elementSelectType: 0,
    newLibraryName: 'a',
    newLibraryDescription: 'a',
    newComponent: {
      files: [],
      events: [],
      props: [],
      description: ''
    },
    components: []
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
        description: ''
      }
    },
    deleteComponent(state, val) {
      state.components = state.components.filter(x => x.id != val)
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