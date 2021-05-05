<template>
  <v-container>
    <v-data-table
        :headers="headers"
        :items="page.users"
        :single-expand="true"
        :expanded.sync="expanded"
        item-key="email"
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
import { mapState } from 'vuex'

export default {
  name: 'UserReportsPage',
  data: () => ({
      expanded: [],
     headers: [
        {
          text: 'Name',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'Email', value: 'email' },
        { text: 'Reports', value: 'reportsCount' },
      ],
  }),

    created () {
      this.initialize()
    },

    computed: {
    ...mapState({
      page: s => s.AdminStore.reportedUsersPage
    })
  },

  methods: {
    getColor(status) {
        return status == 'Active' ? 'primary' : 'red' 
    },

    initialize () {
      this.$store.dispatch('AdminStore/getReportedUsers', {})
    },

    open( item ) {
      this.$router.push({ name: 'DetailedUserReportsPage', params: { email : item.email} })
    }

  },
};
</script>
