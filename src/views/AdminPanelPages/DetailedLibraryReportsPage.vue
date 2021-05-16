<template>
  <v-container>
    <v-row class="my-5 mx-0 d-flex">
        <div>
          <div class="text-h5">Library: {{ library.name }}</div>
          <div class="text-title">Author: {{ library.author }}</div>
        </div>
        <v-card width="10rem" :color="statusColor" class="ml-auto d-flex align-center justify-center">
          <span class="text-h6 white--text">{{ library.status }}</span>
        </v-card>
    </v-row>
    <v-row  class="d-flex ma-2">
      <v-btn @click="openNewTab" class="mr-4">Open in new tab</v-btn>
      <v-btn v-if="library.status != 'Blocked'" @click="block" color="red">Block</v-btn>
    </v-row>
      <v-data-table
        :headers="headers"
        :items="page.reports"
        :single-expand="true"
        :options.sync="pagination"
        :footer-props="footerOptions"
        :server-items-length="pagination.totalItems"
        :expanded.sync="expanded"
        :loading="loading"
        item-key="id"
        disable-sort
        show-expand
        class="elevation-1"
        
    >
        <template v-slot:top>
          <v-toolbar
              flat
          >
            <v-toolbar-title>Reports</v-toolbar-title>
            <v-divider
              class="mx-4"
              inset
              vertical
            ></v-divider>
            <span>{{ page.totalReports }} reports</span>
            <v-divider
              class="mx-4"
              inset
              vertical
            ></v-divider>
            <span> {{ page.admittedReports }} admitted </span>
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
        <template v-slot:item.date="{ item }"> 
          <span>
            {{ dateFormat(item.date) }}
          </span>
        </template>  
        <!-- <template v-slot:item.status="{ item }"> 
          <v-chip
            :color="getColor(item.status)"
            dark
          >
            {{ item.status }}
          </v-chip>
        </template> -->
      <template class="elevation-0" v-slot:expanded-item="{ headers, item }">
        <td  :colspan="headers.length">
          <div v-if="item.status == 'Active'" class="ma-2">
            <v-btn @click="admit(item)" color="primary" class="mx-2">Admit</v-btn>
            <v-btn @click="reject(item)" color="red">Reject</v-btn>
          </div>
          <div class="mt-3">
            Id: {{item.id}}
          </div>
          <div class="ma-4">
           Content: {{ item.content }}
          </div>
        </td>
      </template>

    </v-data-table>

  </v-container>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'DetailedLibraryReportsPage',
  data: () => ({
    pagination: {
      page: 1,
      totalItems: 0,
    },
    footerOptions : {
      'items-per-page-options': [ 10, 15, 20]
    },
    loading: false,
    expanded: [],
    headers: [
      {
        text: 'Username',
        value: 'username',
      },
      { text: 'Content', value: 'content' },
      { text: 'Date', value: 'date' },
      { text: 'Status', value: 'status' },
    ],

  }),

  created () {
    this.initialize()
  },

  watch: {
    pagination() {
      this.loading = true
      this.$store.dispatch('AdminStore/getLibraryReports', {
        libraryId: this.$route.params.id,
        numberPage: this.pagination.page - 1,
        pageSize: this.pagination.itemsPerPage
      }).then(() => {
        this.pagination.totalItems = this.page.totalReports
        this.loading = false
      })
    }
  },

  computed: {
    ...mapState({
      page: s => s.AdminStore.libraryReportsPage
    }),

    ...mapGetters({
      element: 'AdminStore/getLibraryById'
    }),

    library() {
      return this.element(this.$route.params.id)
    },
    
    statusColor(){
      return this.library.status === 'Active' ? 'primary' : 'red'
    },
    
    

    
  },

  methods: {  
    dateFormat(dateJSON) {
      let date = new Date(dateJSON)
      return date.toLocaleDateString()
    },

    getColor(status) {
      return status == 'Approved' ? 'grey' : 'primary'   
    },

    nextPage(e) {
      console.log(e)
    },

    admit(item) {
      this.$store.dispatch('AdminStore/admitReport', {
        reportId: item.id,
        reportType: 'library'
      })
    },

    reject(item) {
      this.$store.dispatch('AdminStore/rejectReport', {
        reportId: item.id,
        reportType: 'library'
      })
    },

    initialize () {
      this.loading = true
      this.$store.dispatch('AdminStore/getLibraryReports', {
        libraryId: this.$route.params.id
      }).then(() => {
        this.pagination.totalItems = this.page.totalReports
        this.loading = false
      })
    },

    openNewTab() {
      let routeData = this.$router.resolve(
        {
          name: 'LibraryPage',
          params: {
            author: this.library.author, 
            name: this.library.name
          }
        })
      open(routeData.href, '_blank');
    },

    block() {
      this.$store.dispatch('AdminStore/blockElement', {
        reportId: this.library.id,
        reportType: 'library'
      })
    }
    
  },
};
</script>
