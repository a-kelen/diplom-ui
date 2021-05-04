import Axios from '../axios'
const state = {
    users: [],
    userReports: [],
    libraryReports: [],
    componentReports: [],
}
// getters
const getters = {
 
}

// mutations
const mutations = {
    set_users(state, val) {
        state.users = val
    },

    set_user_reports(state, val) {
        state.userReports = val
    },

    set_component_reports(state, val) {
        state.componentReports = val
    },
    
    set_library_reports(state, val) {
        state.libraryReports = val
    },

    set_report_status(state, val) {
        if(val.type === 'user') {
            let elem = state.userReports.find(x => x.id === val.elementId)
            elem.status = val.status
        } else if(val.type === 'library') {
            let elem = state.libraryReports.find(x => x.id === val.elementId)
            elem.status = val.status
        } else if(val.type === 'component') {
            let elem = state.componentReports.find(x => x.id === val.elementId)
            elem.status = val.status
        }
    }

}

// actions
const actions = {
    getUsers({ commit }, parameters) {
        return new Promise((resolve, reject) => {
            Axios.get('Admin/users', { 
                    params: parameters 
                })
                .then(resp => {
                    commit('set_users', resp.data)
                    resolve()
                })
                .catch(err => {
                    reject(err)
                })
        })
    },

    getUserReports({ commit }, parameters) {
        return new Promise((resolve, reject) => {
            Axios.get('Admin/user-reports', { 
                    params: parameters 
                })
                .then(resp => {
                    commit('set_user_reports', resp.data)
                    resolve()
                })
                .catch(err => {
                    reject(err)
                })
        })
    },

    getLibraryReports({ commit }, parameters) {
        return new Promise((resolve, reject) => {
            Axios.get('Admin/library-reports', { 
                    params: parameters 
                })
                .then(resp => {
                    commit('set_library_reports', resp.data)
                    resolve()
                })
                .catch(err => {
                    reject(err)
                })
        })
    },

    getComponentReports({ commit }, parameters) {
        return new Promise((resolve, reject) => {
            Axios.get('Admin/component-reports', { 
                    params: parameters 
                })
                .then(resp => {
                    commit('set_component_reports', resp.data)
                    resolve()
                })
                .catch(err => {
                    reject(err)
                })
        })
    },

    admitReport({ commit }, payload) {
        return new Promise((resolve, reject) => {
            Axios.post('Admin/admit-report', payload)
                .then(resp => {
                    if(resp.data) {
                        commit('set_report_status', {
                            type: payload.type,
                            elementId: payload.elementId,
                            status: 'Admited'
                        })
                        resolve()
                    }
                })
                .catch(err => {
                    reject(err)
                })
        })
    },

    rejectReport({ commit }, payload) {
        return new Promise((resolve, reject) => {
            Axios.post('Admin/reject-report', payload)
                .then(resp => {
                    if(resp.data) {
                        commit('set_report_status', {
                            type: payload.type,
                            elementId: payload.elementId,
                            status: 'Rejected'
                        })
                        resolve()
                    }
                })
                .catch(err => {
                    reject(err)
                })
                
        })
    },

    blockElement( _, payload) {
        return new Promise((resolve, reject) => {
            Axios.post('Admin/block-element', payload)
                .then(() => {
                    resolve()
                })
                .catch(err => {
                    reject(err)
                })
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