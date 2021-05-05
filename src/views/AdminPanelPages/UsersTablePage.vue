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
            <v-toolbar-title>Users Table</v-toolbar-title>
            <v-divider
              class="mx-4"
              inset
              vertical
            ></v-divider>
            <span>72934 users</span>
            <v-divider
              class="mx-4"
              inset
              vertical
            ></v-divider>
            <span>301 blocked </span>
            <v-divider
              class="mx-4"
              inset
              vertical
            ></v-divider>
            <div class="mt-6">
              <v-text-field
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
        </template>  d
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
          class="ma-3"
          :color="item.status == 'Active' ? 'red' : 'primary' "
        >
          {{item.status == 'Active' ? 'Block': 'Enable'}}
        </v-btn>
        <v-btn class="ma-3">Open Profile</v-btn>
        <div class="ma-2">
          Reports: {{item.reportsCount}}
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
      this.$store.dispatch('AdminStore/getUsers', {})
    },

      
  },
};
</script>
