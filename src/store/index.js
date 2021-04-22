import Vue from 'vue'
import Vuex from 'vuex'
import ComponentStore from './modules/ComponentStore'
import ElementStore from './modules/ElementStore'
import LibraryStore from './modules/LibraryStore'
import SearchStore from './modules/SearchStore'
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
    SearchStore
  }
});
