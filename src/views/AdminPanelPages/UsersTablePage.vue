<template>
  <v-container>
    <v-data-table
        :headers="headers"
        :items="page.users"
        :single-expand="true"
        :expanded.sync="expanded"
        :options.sync="pagination"
        :footer-props="footerOptions"
        :server-items-length="pagination.totalItems"
        :loading="loading"
        item-key="email"
        disable-sort
        show-expand
        class="elevation-1"
    >
        <template v-slot:top>
        <v-toolbar
            flat
        >
            <v-toolbar-title>Users Table</v-toolbar-title>
            <v-divider
              class="mx-4"
              inset
              vertical
            ></v-divider>
            <span>{{page.totalUsers}} users</span>
            <v-divider
              class="mx-4"
              inset
              vertical
            ></v-divider>
            <span>{{page.blockedUsers}} blocked </span>
            <v-divider
              class="mx-4"
              inset
              vertical
            ></v-divider>
            <div class="mt-6">
              <v-text-field
                v-model="searchQuery"
                @keydown.enter="searchUsers"
                outlined
                dense
                label="Search"
              ></v-text-field>
            </div>
        </v-toolbar>
        </template>
        <template v-slot:no-data>
            <v-btn
                color="primary"
                @click="initialize"
            >
                Reset
            </v-btn>
        </template>  
        <!-- <template v-slot:item.status="{ item }"> 
      <v-chip
        :color="getColor(item.status)"
        dark
      >
        {{ item.status }}
      </v-chip>
    </template> -->
    <template v-slot:expanded-item="{ headers, item }">
      <td :colspan="headers.length">
        <v-btn
          @click="switchBlock(item)"
          class="ma-3"
          :color="item.status == 'Active' ? 'red' : 'primary' "
        >
          {{item.status == 'Active' ? 'Block': 'Activate'}}
        </v-btn>
        <v-btn @click="openNewTab(item)" class="ma-3">Open Profile</v-btn>
        <v-btn v-if="!item.role" @click="setRole(item)" class="ma-3">Set moderator</v-btn>
        <span class="ma-3" v-else>Moderator</span>
        
        <div class="ma-2">
          Admitted/Total Reports: 
          <span class=" ml-2 font-weight-bold">
            {{ item.admittedReports }}/{{ item.totalReports }}
          </span>
          <span v-if="item.totalReports > 0"  class="ml-4">({{ item.admittedReports / (item.totalReports) * 100 }} %)</span>
        </div>
        
      </td>
    </template>
    </v-data-table>
  </v-container>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'UsersTablePage',
  data: () => ({
    pagination: {
      page: 1,
      totalItems: 12,
    },
    footerOptions : {
      'items-per-page-options': [ 10, 15, 20]
    },
    loading: false,
    searchQuery: '',
    expanded: [],
    headers: [
      { text: 'Name', value: 'name', },
      { text: 'Email', value: 'email' },
      { text: 'Status', value: 'status' },
    ],
  }),

  created () {
    this.initialize()
  },

  computed: {
    ...mapState({
      page: s => s.AdminStore.usersPage
    })
  },
  methods: {
      
    getColor(status) {
      return status == 'Active' ? 'primary' : 'red' 
    },
  

    initialize () {
      this.loading = true
      this.$store.dispatch('AdminStore/getUsers', {})
        .then(() => {
          this.pagination.totalItems = this.page.totalReports
          this.loading = false
        })
    },

    searchUsers() {
      if(this.searchQuery !== '') {
        this.$store.dispatch('AdminStore/searchUsers', {
          searchQuery: this.searchQuery
        })
      } else {
        this.$store.dispatch('AdminStore/getUsers', {})
      }
    },

    openNewTab(item) {
      let routeData = this.$router.resolve({name: 'UserProfile', params: {username: item.username}})
      open(routeData.href, '_blank');
    },

    switchBlock(item) {
      this.$store.dispatch('AdminStore/switchBlockUser', item.email)
    },

    setRole(item) {
      this.$store.dispatch('AdminStore/setRole', item.email)
    }
  },
};
</script>
