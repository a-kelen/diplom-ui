<template>
  <v-sheet>
    <v-list rounded color="transparent">  
      <v-list-item-group
        v-model="selectedItem"
      >
        <v-list-item color="primary" outlined class="rounded-xl">
          <v-card
            height="120"
            flat
            tile
            color="transparent"
            class="d-flex mx-auto py-10"
          >
            <v-icon color="teal" size="50">mdi-library</v-icon>
            <p class="text-h4 teal--text ">Library</p>
          </v-card>
        </v-list-item>
        <v-list-item color="primary"  class="rounded-pill">
          <v-card
              height="120"
              flat
              tile
              color="transparent"
              class="d-flex mx-auto py-10 " 
            >
              <v-icon color="teal" size="50">mdi-view-dashboard</v-icon>
              <p class="text-h4 teal--text">Component</p>
          </v-card>
        </v-list-item>
      </v-list-item-group>
    </v-list>
    <div>
      <v-combobox
        v-model="model"
        debounce="1000"
        :items="searchedLabels"
        :search-input.sync="search"
        hide-selected
        hint="Maximum of 5 tags"
        label="Add some tags"
        multiple
        persistent-hint
        small-chips
      >
        <template v-slot:no-data>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>
                No results matching "<strong>{{ search }}</strong>". Press <kbd>enter</kbd> to create a new one
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-combobox>
    </div>
    <div class="d-flex">
      <v-select
        :items="typeItems"
        v-model="selectedType"
        outlined
        label="Element type"
      ></v-select>
      <v-spacer></v-spacer>
      <v-checkbox
        class="mx-2"
        v-model="status"
        label="Public"
      ></v-checkbox>
    </div>
    
  </v-sheet>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'SelectTypeTab',
  data: () => ({
    typeItems: [
      'VueJS',
      'VueTS',
      'ReactJS',
      'ReactTS',
      'AngularJS',
      'AngularTS',
    ],
    model: [],
    search: null,
  }),

  methods: {

  },

  computed: {
    selectedItem: {
      get () {
        return this.$store.state.ElementStore.elementSelectType
      },
      set (value) {
        this.$store.commit('ElementStore/updateElementType', value)
      }
    },

    selectedType: {
      get () {
        return this.$store.state.ElementStore.elementType
      },
      set (value) {
        this.$store.commit('ElementStore/updateType', value)
      }
    },

    status: {
      get () {
        return this.$store.state.ElementStore.status
      },
      set (value) {
        this.$store.commit('ElementStore/updateStatus', value)
      }
    },

    ...mapState({
      searchedLabels: s => s.ElementStore.searchedLabels
    })
  },

  watch: {
      model (val) {
        if (val.length > 5) {
          this.$nextTick(() => this.model.pop())
        }
        this.$store.commit('ElementStore/set_labels', this.model)
      },
      
      search() {
        if(this.search) {
          this.$store.dispatch('ElementStore/searchLabels', this.search)
        }
      }
    },
}
</script>

<style scoped>
  .border {
    border: 0.4ch solid teal !important;
  }
</style>