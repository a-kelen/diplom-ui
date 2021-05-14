import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import vueDebounce from 'vue-debounce'
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)

// set default config
Vue.$cookies.config('7d')

// set global cookie
Vue.$cookies.set('theme','default')
Vue.$cookies.set('hover-time','1s')

Vue.config.productionTip = false;
Vue.prototype.$eventHub = new Vue();
Vue.use(vueDebounce)
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app');
