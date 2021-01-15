<template>
  <v-app>
    <navbar/>

    <v-main>
       <v-container fluid>
      <router-view></router-view>
    </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from "./components/Navbar.vue"



export default {
  name: "App",
  components: {
    Navbar
  },
  data: () => ({
    //
  })
};
</script>

<style >
#app {
    background-color: #f5fffd;
}
a {
    text-decoration: none !important;;
}
.gap {
  gap: 1rem;
}
</style>