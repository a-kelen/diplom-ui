import Axios from '../axios'
const state = {
    usersPage: [],
    userReportsPage: [],
    libraryReportsPage: [],
    componentReportsPage: [],
    reportedUsersPage: [],
    reportedLibrariesPage: [],
    reportedComponentsPage: []
}
// getters
const getters = {
    getUserById: state => id => {
        return state.reportedUsersPage.users.find(x => x.id === id)
    },

    getLibraryById: state => id => {
        return state.reportedLibrariesPage.libraries.find(x => x.id === id)
    },

    getComponentById: state => id => {
        return state.reportedComponentsPage.components.find(x => x.id === id)
    }
}

// mutations
const mutations = {
    set_users(state, val) {
        state.usersPage = val
    },

    set_user_reports(state, val) {
        state.userReportsPage = val
    },

    set_component_reports(state, val) {
        state.componentReportsPage = val
    },
    
    set_library_reports(state, val) {
        state.libraryReportsPage = val
    },

    set_reported_users(state, val) {
        state.reportedUsersPage = val
    },

    set_reported_libraries(state, val) {
        state.reportedLibrariesPage = val
    },

    set_reported_components(state, val) {
        state.reportedComponentsPage = val
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
    getUsers({ commit }, params) {
        return new Promise((resolve, reject) => {
            Axios.get('Admin/users', { 
                    numberPage: params.numberPage,
                    pageSize: params.pageSize
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

    getReportedUsers({ commit }, params) {
        return new Promise((resolve, reject) => {
            Axios.get('Admin/reported-users', {params})
                .then(resp => {
                    commit('set_reported_users', resp.data)
                    resolve()
                })
                .catch(err => {
                    reject(err)
                })
        })
    },

    getReportedLibraries({ commit }, params) {
        return new Promise((resolve, reject) => {
            Axios.get('Admin/reported-libraries', {params})
                .then(resp => {
                    commit('set_reported_libraries', resp.data)
                    resolve()
                })
                .catch(err => {
                    reject(err)
                })
        })
    },

    getReportedComponents({ commit }, params) {
        return new Promise((resolve, reject) => {
            Axios.get('Admin/reported-components', {params})
                .then(resp => {
                    commit('set_reported_components', resp.data)
                    resolve()
                })
                .catch(err => {
                    reject(err)
                })
        })
    },

    getUserReports({ commit }, params) {
        return new Promise((resolve, reject) => {
            Axios.get('Admin/user-reports', {params})
                .then(resp => {
                    commit('set_user_reports', resp.data)
                    resolve()
                })
                .catch(err => {
                    reject(err)
                })
        })
    },

    getLibraryReports({ commit }, params) {
        return new Promise((resolve, reject) => {
            Axios.get('Admin/library-reports', {params})
                .then(resp => {
                    commit('set_library_reports', resp.data)
                    resolve()
                })
                .catch(err => {
                    reject(err)
                })
        })
    },

    getComponentReports({ commit }, params) {
        return new Promise((resolve, reject) => {
            Axios.get('Admin/component-reports', {params})
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