<template>
  <v-container>
    <v-row class="my-5 mx-0 d-flex">
        <div>
          <div class="text-h4">Component</div>
          <div class="text-title">Username: admin</div>
        </div>
        <v-card width="10rem" color="primary" class="ml-auto d-flex align-center justify-center">
          <span class="text-h6 white--text">Active</span>
        </v-card>
    </v-row>

      <v-data-table
        :headers="headers"
        :items="desserts"
        :single-expand="true"
        :expanded.sync="expanded"
        item-key="username"
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
            <span>43 reports</span>
            <v-divider
              class="mx-4"
              inset
              vertical
            ></v-divider>
            <span> 12 approved </span>
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
export default {
  name: 'UsersTablePage',
  data: () => ({
    expanded: [],
    dialogDelete: false,
    headers: [
      {
        text: 'Username',
        value: 'username',
      },
      { text: 'Content', value: 'content' },
      { text: 'Status', value: 'status' },
    ],
    desserts: [],
    editedIndex: -1,
  }),
  watch: {
    dialog (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    },
  },

  created () {
    this.initialize()
  },

  methods: {  
    getColor(status) {
      return status == 'Approved' ? 'grey' : 'primary'   
    },

    initialize () {
      this.desserts = [
        {
          username: 'admin1@gmail.com',
          content: 'Bla bla',
          status: 'Approved'
        },
        {
          username: 'admin2@gmail.com',
          content: 'Bla bla',
          status: 'Approved'
        },
        {
          username: 'admin3@gmail.com',
          content: 'Bla bla',
          status: 'Active'
        },
      ]
    },

    
  },
};
</script>
