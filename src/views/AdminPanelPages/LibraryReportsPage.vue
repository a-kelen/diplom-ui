<template>
  <v-container>
    <v-data-table
        :headers="headers"
        :items="page.libraries"
        :single-expand="true"
        :expanded.sync="expanded"
        item-key="author"
        disable-sort
        show-expand
        class="elevation-1"
    >
        <template v-slot:top>
        <v-toolbar
            flat
        >
            <v-toolbar-title>Library Reports</v-toolbar-title>
            
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
  name: 'LibraryReportsPage',
  data: () => ({
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
    computed: {
      ...mapState({
        page: s => s.AdminStore.reportedLibrariesPage
      })
    },

    methods: {  
      getColor(status) {
          return status == 'Active' ? 'primary' : 'red' 
      },

      initialize () {
        this.$store.dispatch('AdminStore/getReportedLibraries', {})
      },

      open(item) {
        this.$router.push({ name: 'DetailedLibraryReportsPage', params: { id: item.id } })
      }
      
    },
};
</script>
