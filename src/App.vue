<template>
  <v-app>
    <navbar v-show="initialized"/>

    <v-main v-show="initialized">
      <v-container fluid>
        <keep-alive>
          <transition name="fade" mode="out-in">
            <router-view></router-view>
          </transition>
        </keep-alive>
      </v-container>
    </v-main>
    <v-progress-linear
      v-show="!initialized"
      indeterminate
      height="10"
      class="my-10"
      color="primary"
    ></v-progress-linear>
  </v-app>
  
</template>

<script>
import Navbar from './components/Navbar.vue'
import 'vue-loading-overlay/dist/vue-loading.min.css';

export default {
  name: 'app',
  components: {
    Navbar
  },

  data: () => ({
    initialized: false
  }),

  created() {
    this.$store.dispatch('UserStore/getCurrentUser') 
      .then(() => {
        this.initialized = true
      })
      .catch(() => {
        this.$router.push({ name: 'Login' })
        this.initialized = true
      })
  },
  
  methods: {
    
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
