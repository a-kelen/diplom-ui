<template>
  <v-container>
    <v-data-table
        :headers="headers"
        :items="page.components"
        :single-expand="true"
        :options.sync="pagination"
        :footer-props="footerOptions"
        :server-items-length="pagination.totalItems"
        :loading="loading"

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
            <v-toolbar-title>Component Reports</v-toolbar-title>
            
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
    <template v-slot:expanded-item="{ headers, item }">
      <td :colspan="headers.length">
        <v-btn @click="open(item)" class="ma-3">Open Details</v-btn>
        <div class="ma-2">
          Registred {{item.name}}
        </div>
      </td>
    </template>
    </v-data-table>
  </v-container>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'ComponentReportsPage',
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
        text: 'Author',
        align: 'start',
        sortable: false,
        value: 'author',
      },
      { text: 'Name', value: 'name' },
      { text: 'Reports', value: 'reportsCount' },
    ],
  }),

  created () {
    this.initialize()
  },

   watch: {
    pagination() {
      this.loading = true
      this.$store.dispatch('AdminStore/getReportedComponents', {
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
      page: s => s.AdminStore.reportedComponentsPage
    })
  },

  methods: {
    getColor(status) {
        return status == 'Active' ? 'primary' : 'red' 
    },

    initialize () {
      this.loading = true
      this.$store.dispatch('AdminStore/getReportedComponents', {}).then(() => {
        this.pagination.totalItems = this.page.totalReports
        this.loading = false
      })
    },
    
    open(item) {
      this.$router.push({ name: 'DetailedComponentReportsPage', params: { id: item.id } })
    }
    
  },
};
</script>
