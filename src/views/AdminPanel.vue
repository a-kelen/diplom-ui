<template>
  <v-row>  
    <v-col
      md="2"
    >
      <v-sheet elevation="6">              
        <v-navigation-drawer permanent>
          <v-list-item active-class="highlighted" >
            <v-list-item-content>
              <v-list-item-title class="title">
                Admin Panel
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
          <v-list
            dense
            nav
          >
            <v-list-item
              v-for="(item, i) in items"
              :key="i"
              :to="item.path" 
              active-class="highlighted"
              :class="item.path === $route.path ? 'highlighted' : ''"
            >
              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-navigation-drawer>
      </v-sheet>
    </v-col>

    <v-col
      cols="12"
      md="10"
      class="pa-6">
      <v-row>
        <transition name="fade" mode="out-in">
          <router-view></router-view>
        </transition>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>

export default {
  name: 'AdminPanel',
  components: {
    
  },
  data: () => ({
      paginationLength : 6,
      selectedItem: 1,
      dashboardReady: false,
      page: 1,
      items: [
        { title: 'Users Table', icon: 'mdi-account', path: '/admin-panel/users-table'},
        { title: 'Users Reports', icon: 'mdi-account', path: '/admin-panel/user-reports'},
        { title: 'Library Reports', icon: 'mdi-view-compact', path: '/admin-panel/library-reports'},
        { title: 'Component Reports', icon: 'mdi-library', path: '/admin-panel/component-reports' },
      ],
  }),

  computed: {
    
  }
};
</script>


<style scoped>

</style>
