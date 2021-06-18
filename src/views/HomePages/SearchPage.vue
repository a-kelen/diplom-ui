<template>
  <v-container class="ma-0">
    <v-row>
        <v-col>
            <v-text-field
            label="Search"
            placeholder="Input text"
            v-model="searchQuery"
            v-debounce:1500ms="search"
            filled
            rounded
            ></v-text-field>
        </v-col>
    </v-row>
    <v-row>
        <v-col class="pt-0">
            <v-combobox
                :disabled="labelsDisabled"
                v-model="model"
                debounce="1000"
                :items="searchedLabels"
                :search-input.sync="searchLabels"
                hide-selected
                label="Add some labels"
                multiple
                deletable-chips
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
        </v-col>
    </v-row>
    <v-row>
        <v-tabs
                class="mx-4"
                grow
                v-model="tab"
            >
            <v-tab href="#tab-1">
                <v-badge
                    color="primary"
                    :content="users.length"
                >
                Users
                </v-badge>
            </v-tab>

            <v-tab href="#tab-2">
                <v-badge
                    color="primary"
                    :content="components.length"
                >
                Components
                </v-badge>
            </v-tab>

            <v-tab href="#tab-3">
                <v-badge
                color="primary"
                :content="libraries.length"
                >
                Libraries
                </v-badge>
            </v-tab>
        </v-tabs>
        <v-tabs-items class="pa-5 mx-4 transparent-body" v-model="tab">
            <v-tab-item  value="tab-1">
              <users-page :users="users"/>
            </v-tab-item>
            <v-tab-item value="tab-2">
               <components-page :components="components"/>
            </v-tab-item>
            <v-tab-item value="tab-3">
              <libraries-page :libraries="libraries"/>
            </v-tab-item>
          </v-tabs-items>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import ComponentsPage from '../ProfilePages/ComponentsPage.vue'
import LibrariesPage from '../ProfilePages/LibrariesPage.vue'
import UsersPage from './UsersPage.vue'
export default {
    components: { 
        ComponentsPage,
        LibrariesPage,
        UsersPage
    },
    name: 'SearchPage',
    data: () => ({
        tab: null,
        searchQuery: '',
        model: [],
        searchLabels: null,
        dictionary: new Map()
    }),

    methods: {
        search() {
            if(!this.searchQuery && this.model.length == 0) return

            let dispatcher = this.dictionary.get(this.tab)
            console.log(this.searchQuery)
            this.$store.dispatch(dispatcher, {
                searchQuery: this.searchQuery,
                labels: this.model
            })
                .then(() => {
                    
                })       
        },

    },

    computed: {
        ...mapState({
          components: s => s.SearchStore.components,
          libraries: s => s.SearchStore.libraries,
          users: s => s.SearchStore.users,
          searchedLabels: s => s.ElementStore.searchedLabels
        }),

        labelsDisabled() {
            return this.tab == 'tab-1'
        }
    },

    watch: {
        tab() {
            this.search()
        },
        model () {
            this.search()
            this.searchLabels = null
      },
      
      searchLabels() {
        if(this.searchLabels) {
          this.$store.dispatch('ElementStore/searchLabels', this.searchLabels)
        }
      }
    },

    created() {
        this.dictionary.set('tab-1', 'SearchStore/searchUsers')
        this.dictionary.set('tab-2', 'SearchStore/searchComponents')
        this.dictionary.set('tab-3', 'SearchStore/searchLibraries')
        
    }
}
</script>
<style scoped>
.transparent-body {
  background: transparent !important;
}
</style>