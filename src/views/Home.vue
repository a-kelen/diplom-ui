<template>
 <v-row no-gutters>
    <v-col
      cols="14"
      sm="6"
      md="10"
      class="pa-6"
    >
      <v-row>
        <transition name="fade" mode="out-in">
          <router-view></router-view>
        </transition>
      </v-row>
    </v-col>
      <v-col
        cols="3"
        md="2"
        class="ml-auto"
      >
        <v-sheet elevation="6">
          <v-navigation-drawer permanent>
            <v-list-item active-class="highlighted" >
              <v-list-item-content>
                <v-list-item-title class="title">
                  Home Page
                </v-list-item-title>
                <v-list-item-subtitle>
                  
                </v-list-item-subtitle>
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
                <v-list-item-icon>
                  <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-navigation-drawer>
        </v-sheet>
      </v-col>
    </v-row>

</template>
  

<script>

export default {
  name: 'Home',
  components: {
    
  },
  data: () => ({ 
      selectedItem: 1,
      items: [
        { title: 'Latest Activities', icon: 'mdi-view-compact', path: '/'},
        { title: 'Components', icon: 'mdi-view-compact', path: 'top-components'},
        { title: 'Libraries', icon: 'mdi-library', path: 'top-libraries' },
        { title: 'Users', icon: 'mdi-account', path: 'top-users' },
        { title: 'Search', icon: 'mdi-magnify', path: 'search' },
      ],
    }),
    methods: {
      listHandler(em) {
        console.log(em);
      }
    }
};
</script>
