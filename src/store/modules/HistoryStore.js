import Axios from '../axios'
const state = {
    historyItems: []
}
// getters
const getters = {
 
}

// mutations
const mutations = {
    set_history_items(state, val) {
        let mapped = val.map(x => {
            return {
                id: x.id,
                name: x.elementName,
                date: new Date(x.date),
                type: x.type,
                action: x.action
            }
        })
        let historyByDay = mapped.reduce((acc, value) => {
            let key = value.date.toLocaleDateString()

            if (!acc[key]) {
              acc[key] = [];
            }
            acc[key].push(value);
           
            return acc;
        }, {});

        state.historyItems = []

        for(let group of Object.keys(historyByDay).reverse()) {
            state.historyItems.push({ header: group})
            state.historyItems.push({ divider: true })
            for(let i of historyByDay[group]) {
                state.historyItems.push(i)
            }
        }
    },
}

// actions
const actions = {
    getHistoryItems({ commit }) {
        
        return new Promise((resolve, reject) => {
            Axios.get('User/history')
                .then(resp => {
                    commit('set_history_items', resp.data)
                    resolve(resp.data)
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