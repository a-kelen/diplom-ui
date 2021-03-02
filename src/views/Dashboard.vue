<template>
      <v-row>  
          <v-col
            md="2">
            <v-btn 
            class="my-6 " 
            rounded 
            block
            dark
            color="teal darken-3" :to="{ name: 'CreateElementPage' }">Create element</v-btn>
            <v-sheet elevation="6">
              <v-list flat>
                <v-list-item-group
                  v-model="selectedItem"
                  color="primary">
                  <v-list-item
                    v-for="(item, i) in items"
                    :key="i">
                    <v-list-item-content>
                      <v-list-item-title v-text="item.text"></v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-sheet>
          </v-col>

          <v-col
          cols="12"
          md="10"
          class="pa-6">
          <v-row>
            <v-col>
              <v-text-field
              label="Search"
              placeholder="Input text"
              filled
              rounded
            ></v-text-field>
            </v-col>
          </v-row>
          <v-row v-show="!dashboardReady">
            <v-col :key="i" v-for="i in 7" cols="4">
                <v-skeleton-loader
                  
                  
                  class="mx-auto"
                  max-width="300"
                  type="article"
                ></v-skeleton-loader>
            </v-col>
          </v-row>
           <v-row v-if="selectedItem == 0">
            <v-col 
              v-for="(like, index) in liked" :key="index"
              cols="4">
              
              <library-item v-if="like.library != null" :library="like.library"/>
              <component-item v-if="like.component != null" :component="like.component"/>
            </v-col>
          </v-row>
          <v-row v-if="selectedItem == 1">
            <v-col 
              v-for="(library, index) in ownLibraries" :key="index"
              cols="4">
              <library-item :library="library"/>
            </v-col>
          </v-row>
          <v-row v-if="selectedItem == 2">
            <v-col v-for="(component, index) in ownComponents" :key="index" cols="4">
              <component-item :component="component"/>
            </v-col>
          </v-row>
          <v-row v-if="selectedItem == 3">
            <v-col 
              v-for="(library, index) in ownedLibraries" :key="index"
              cols="4">
              <library-item :library="library"/>
            </v-col>
          </v-row>
          <v-row v-if="selectedItem == 4">
            <v-col v-for="(component, index) in ownedComponents" :key="index" cols="4">
              <component-item :component="component"/>
            </v-col>
          </v-row>
          
          <v-row justify="center">
        <v-col cols="8">
          <v-container class="max-width">
            <!-- <v-pagination
              v-model="page"
              class="my-4"
              color="teal darken-3"
              :length="paginationLength"
              circle
            ></v-pagination> -->
          </v-container>
        </v-col>
      </v-row>
        </v-col>
      </v-row>
</template>

<script>
import ComponentItem from '../components/items/ComponentItem.vue';
import LibraryItem from '../components/items/LibraryItem.vue';
import { mapState } from 'vuex'

export default {
  name: 'Dashboard',
  components: {
    LibraryItem,
    ComponentItem
  },
  data: () => ({
      paginationLength : 6,
      selectedItem: 1,
      dashboardReady: false,
      page: 1,
      items: [
        { text: 'Likes', icon: 'mdi-view-compact' },
        { text: 'Libraries', icon: 'mdi-view-compact' },
        { text: 'Components', icon: 'mdi-library' },
        { text: 'Owned Libraries', icon: 'mdi-account' },
        { text: 'Owned Components', icon: 'mdi-account' },
      ],
  }),
  mounted() {
    this.dashboardReady = false
    this.$store.dispatch('ComponentStore/getOwnComponentList')
    this.$store.dispatch('ComponentStore/getOwnedComponentList')
    this.$store.dispatch('LibraryStore/getOwnedLibraryList')
    this.$store.dispatch('LibraryStore/getOwnLibraryList')
      .then(() => this.dashboardReady = true)
    this.$store.dispatch('ElementStore/getLikedLibraries')
      

  }, 
  computed: {
    ...mapState({
      ownComponents: s => s.ComponentStore.ownComponents,
      ownLibraries: s => s.LibraryStore.ownLibraries,
      ownedComponents: s => s.ComponentStore.ownedComponents,
      ownedLibraries: s => s.LibraryStore.ownedLibraries,
      liked: s => s.ElementStore.likedList
    }),
  }
};
</script>


<style scoped>

</style>
