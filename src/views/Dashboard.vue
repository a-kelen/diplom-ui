<template>
  <v-row>  
    <v-col
      md="2"
    >
      <v-btn 
        class="my-5 text-caption" 
        rounded 
        block
        dark
        color="teal darken-3" 
        :to="{ name: 'CreateElementPage' }"
      >
        Create element
      </v-btn>
      <v-sheet elevation="6">              
        <v-navigation-drawer permanent>
          <v-list-item active-class="highlighted" >
            <v-list-item-content>
              <v-list-item-title class="title">
                Dashboard
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
        <v-col>
          <v-text-field
          label="Search"
          placeholder="Input text"
          filled
          rounded
          dense
          v-model="searchQuery"

          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <transition name="fade" mode="out-in">
          <router-view></router-view>
        </transition>
      </v-row>
      
      <v-row justify="center">
        <v-col cols="8">
          <v-container class="max-width">
            <!-- <v-pagination
              v-model="page"
              class="my-4"
              color="teal darken-3"
              :length="paginationLength"
              circle
            ></v-pagination> -->
          </v-container>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>

export default {
  name: 'Dashboard',
  components: {
    
  },
  data: () => ({
      paginationLength : 6,
      selectedItem: 1,
      dashboardReady: false,
      page: 1,
      items: [
        { title: 'Likes', icon: 'mdi-view-compact', path: '/dashboard/liked'},
        { title: 'Libraries', icon: 'mdi-view-compact', path: '/dashboard/libraries'},
        { title: 'Components', icon: 'mdi-library', path: '/dashboard/components' },
        { title: 'Owned Libraries', icon: 'mdi-account', path: '/dashboard/owned-libraries'},
        { title: 'Owned Components', icon: 'mdi-account', path: '/dashboard/owned-components'}
      ],
  }),

  computed: {
    searchQuery: {
      get () {
        return this.$store.state.SearchStore.dashboardSearchQuery
      },
      set (value) {
        this.$store.commit('SearchStore/updateDashboardSearchQuery', value)
      }
    },
  }
};
</script>


<style scoped>

</style>
