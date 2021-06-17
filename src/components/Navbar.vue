<template>
  <nav>
    <v-navigation-drawer
      v-model="drawer"
      app
      :dark="theme"
      :mini-variant="mini"
      :permanent="drawer"
    >
      <v-list >
        <v-list-item>
          <v-list-item-avatar class="ml-n2" @click="mini = !mini">
            <v-img  :src="user.avatar"></v-img>
          </v-list-item-avatar>

          <v-list-item-title>{{ user.name }}</v-list-item-title>

          <v-btn
            icon
            @click.stop="mini = !mini"
          >
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
        </v-list-item>

        <v-divider></v-divider>
       
        <v-list-item v-for="(item, i) in items"
          :key="i"
          :to="item.path" 
          active-class="highlighted"
          :class="item.path === $route.path ? 'highlighted' : ''"
        >
          <v-list-item-action >
            <v-icon>{{item.icon}}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{item.title}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item 
          v-show="adminPanelAccess"
          :to="adminPanelPath" 
          active-class="highlighted"
          
        >
          <v-list-item-action >
            <v-icon>mdi-security</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Admin Panel</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      color="teal darken-3"
      dense
      dark
    >
      <v-app-bar-nav-icon v-if="isLogged" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>
        <div class="d-flex">
          compos <span class="devicon font-weight-bold px-1">dev</span>
        </div>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu offset-y v-if="isLogged">
        <template v-slot:activator="{ on }">
          <v-chip
            color="teal darken-3"
            dark
            medium
            v-on="on"
          >
            {{ user.email }}
            <v-icon class="ml-2">mdi-chevron-down</v-icon>
          </v-chip>
        </template>
        <v-list>
          <v-list-item
            @click="logout"
          >
            <v-list-item-title>Log Out</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
  </nav>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data: () => ({
    isLogged: false,
    drawer : false,
    mini : false,
    theme : false,
     items: [
          { title: 'Home', icon: 'mdi-home', path : '/'},
          { title: 'Dashboard', icon: 'mdi-view-dashboard' , path : '/dashboard' },
          { title: 'Subscriptions', icon: 'mdi-account-multiple' , path : '/subscriptions'},
          { title: 'History', icon: 'mdi-history' , path : '/history'},
          { title: 'Settings', icon: 'mdi-account-settings' , path : '/settings'},
        ],
  }),
  computed: {
    ...mapState({
      user: s => s.UserStore.user
    }),

    adminPanelAccess() {
      return ['admin', 'moderator'].includes(this.user.role) 
    },
    adminPanelPath() {
      if(this.user.role === 'admin')
        return { name: 'AdminPanel' }
      
      return { name: 'UserReports' }
    }
  },

  watch: {
    user() {
      if(this.user.name)
        this.isLogged = true
    }
  },


  methods: {
    logout() {
      this.$router.push({ name: 'Login' })
        .then(() => {
          console.log('s')
          this.$store.dispatch('UserStore/logout').then((() => {
            location.reload()
          }))
        })
    }
  }
}
</script>

<style scoped>
.devicon {
  
  border-color: white !important;
  border-bottom: .2em solid;
  
}
</style>