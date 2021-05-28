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
        dictionary: new Map()
    }),

    methods: {
        search() {
            if(!this.searchQuery) return

            let dispatcher = this.dictionary.get(this.tab)
            this.$store.dispatch(dispatcher, this.searchQuery)
                .then(() => {

                })       
        },

    },

    computed: {
        ...mapState({
          components: s => s.SearchStore.components,
          libraries: s => s.SearchStore.libraries,
          users: s => s.SearchStore.users
        }),
    },

    watch: {
        tab() {
            this.search()
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