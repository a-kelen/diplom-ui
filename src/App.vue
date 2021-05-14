<template>
  <v-app>
    <navbar />

    <v-main>
      <v-container fluid>
        <keep-alive>
          <transition name="fade" mode="out-in">
            <router-view></router-view>
          </transition>
        </keep-alive>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from './components/Navbar.vue'
// import axios from './store/axios'

export default {
  name: 'app',
  components: {
    Navbar
  },
  created() {
    
    // axios.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem('token')

    this.$store.dispatch('UserStore/getCurrentUser')
      .then(() => {
        this.$store.dispatch('UserStore/getRole')
          .then(() => {
            
          })
          .catch(() => {
          })
      })
  }
}
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

.custom-grid {
  display: grid;
  width: 100em;
  grid-gap: 20px;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
}

.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0
}
</style>
