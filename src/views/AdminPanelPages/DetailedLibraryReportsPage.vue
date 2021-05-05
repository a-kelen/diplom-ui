<template>
  <v-container>
    <v-row class="my-5 mx-0 d-flex">
        <div>
          <div class="text-h5">Library: {{ library.name }}</div>
          <div class="text-title">Author: {{ library.author }}</div>
        </div>
        <v-card width="10rem" color="primary" class="ml-auto d-flex align-center justify-center">
          <span class="text-h6 white--text">Active</span>
        </v-card>
    </v-row>
    <v-row  class="d-flex ma-2">
      <v-btn @click="openNewTab" class="mr-4">Open in new tab</v-btn>
      <v-btn>Block</v-btn>
    </v-row>
      <v-data-table
        :headers="headers"
        :items="page.reports"
        :single-expand="true"
        :expanded.sync="expanded"
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
        <div class="ma-2">
          <v-btn color="primary" class="mx-2">Approve</v-btn>
          <v-btn color="red">Decline</v-btn>
        </div>
        <div class="ma-4">
          {{ item.content }}
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
    expanded: [],
    headers: [
      {
        text: 'Username',
        value: 'username',
      },
      { text: 'Content', value: 'content' },
      { text: 'Status', value: 'status' },
    ],

  }),

  created () {
    this.initialize()
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
    }
  },

  methods: {  
    getColor(status) {
      return status == 'Approved' ? 'grey' : 'primary'   
    },

    initialize () {
      this.$store.dispatch('AdminStore/getLibraryReports', {
        libraryId: this.$route.params.id
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
    }
    
  },
};
</script>
