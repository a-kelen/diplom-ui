<template>
  <v-container class="pa-0 ma-0">
    <v-row v-if="ownedLibraries.length == 0">
      <v-col :key="i" v-for="i in skeletons" cols="4">
        <v-skeleton-loader
          class="mx-auto"
          max-width="300"
          type="article"
        ></v-skeleton-loader>
      </v-col>
    </v-row>
    <v-row>
      <div class="custom-grid mx-4">
        <library-item v-for="library in libraries" :key="library.id" :library="library"/>
      </div>
    </v-row>
    <v-row v-show="noData">
      <no-data-component />
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import LibraryItem from '../../components/items/LibraryItem.vue'
import NoDataComponent from '../../components/NoDataComponent.vue'
export default {
  components: { LibraryItem, NoDataComponent },
  name: 'OwnedLibrariesPage',
  data: () => ({
    skeletons: [1, 2, 3, 4, 5, 6, 7],
    noData: false
  }),
  computed: {
    ...mapState({
      ownedLibraries: s => s.LibraryStore.ownedLibraries,
      filter: s => s.SearchStore.dashboardSearchQuery
    }),
    libraries() {
      if(this.filter)  
        return this.ownedLibraries.filter(x => x.name.toLowerCase().includes(this.filter.toLowerCase()))
      else
        return this.ownedLibraries
    }
  },
  created() {
    this.$store.dispatch('LibraryStore/getOwnedLibraryList')
      .then(() => {
        this.skeletons = []
        if(!this.ownedLibraries.length > 0)
          this.noData = true
      })
  }, 
};
</script>
