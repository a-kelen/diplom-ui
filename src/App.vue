<template>
  <v-app>
    <navbar />

    <v-main>
      <v-container fluid>
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from './components/Navbar.vue'
import axios from './store/axios'

export default {
  name: 'App',
  components: {
    Navbar
  },
  data: () => ({
    //
  }),
  created() {
    axios.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem('token')
    this.$store.dispatch('UserStore/getCurrentUser')
  }
};
</script>

<style>
#app {
  background-color: #f5fffd;
}
a {
  text-decoration: none !important;
}
.gap {
  gap: 1rem;
}
</style>
