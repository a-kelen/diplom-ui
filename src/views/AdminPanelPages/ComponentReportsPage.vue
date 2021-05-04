<template>
  <v-container>
    <v-data-table
        :headers="headers"
        :items="desserts"
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
        <v-btn class="ma-3">Open Details</v-btn>
        <div class="ma-2">
          Registred {{item.name}}
        </div>
      </td>
    </template>
    </v-data-table>
  </v-container>
</template>

<script>
export default {
  name: 'ComponentReportsPage',
  data: () => ({
    expanded: [],
    dialogDelete: false,
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
        return status == 'Active' ? 'primary' : 'red' 
    },

    initialize () {
      this.desserts = [
        {
          name: 'LibName1',
          author: 'admin1@gmail.com',
          reportsCount: 23,
          status: 'Active'
        },
        {
          name: 'LibName2',
          author: 'admin2@gmail.com',
          reportsCount: 23,
          status: 'Active'
        },
        {
          name: 'LibName3',
          author: 'admin3@gmail.com',
          reportsCount: 23,
          status: 'Blocked'
        },
        
      ]
    },

    editItem (item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm () {
      this.desserts.splice(this.editedIndex, 1)
      this.closeDelete()
    },

    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem)
      } else {
        this.desserts.push(this.editedItem)
      }
      this.close()
    },
  },
};
</script>
