import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import vueDebounce from 'vue-debounce'


// import Vue2Editor from "vue2-editor";

// Vue.use(Vue2Editor);
Vue.config.productionTip = false;
Vue.prototype.$eventHub = new Vue();
Vue.use(vueDebounce)
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app');
