import Vue from 'vue'
import Vuex from 'vuex'
import ComponentStore from './modules/ComponentStore'
import ElementStore from './modules/ElementStore'
import LibraryStore from './modules/LibraryStore'
import HistoryStore from './modules/HistoryStore'
import SearchStore from './modules/SearchStore'
import AdminStore from './modules/AdminStore'
import UserStore from './modules/UserStore'
Vue.use(Vuex);

export default new Vuex.Store({
  namespaced: true,
  state: {},
  mutations: {},
  actions: {},
  modules: {
    ComponentStore,
    ElementStore,
    UserStore,
    LibraryStore,
    HistoryStore,
    SearchStore,
    AdminStore
  }
});
