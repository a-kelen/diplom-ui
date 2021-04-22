<template>
  <v-container class="pa-0 ma-0">
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
            grow
            v-model="tab"
            >
            <v-tab href="#tab-1">
                <v-badge
                color="primary"
                dot
                >
                Users
                </v-badge>
            </v-tab>

            <v-tab href="#tab-2">
                <v-badge
                color="primary"
                content="6"
                >
                Components
                </v-badge>
            </v-tab>

            <v-tab href="#tab-3">
                <v-badge
                color="primary"
                content="2"
                >
                Libraries
                </v-badge>
            </v-tab>
        </v-tabs>
        <v-tabs-items class="transparent-body pa-3" v-model="tab">
            <v-tab-item background-opacity="0" value="tab-1">
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
            let dispatcher = this.dictionary.get(this.tab)
            this.$store.dispatch(dispatcher, this.searchQuery)
                .then(() => {

                })       
        }
    },
    computed: {
        ...mapState({
          components: s => s.SearchStore.components,
          libraries: s => s.SearchStore.libraries,
          users: s => s.SearchStore.users
        }),
    },
    created() {
        this.dictionary.set('tab-1', 'SearchStore/searchUsers')
        this.dictionary.set('tab-2', 'SearchStore/searchComponents')
        this.dictionary.set('tab-3', 'SearchStore/searchLibraries')
        // this.$store.dispatch('ComponentStore/getTopComponentList')
        //   .then(() => this.skeletons = [])
    }
}
</script>
