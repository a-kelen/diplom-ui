<template>
    <v-row>
      <v-col :key="i" v-for="i in skeletons" cols="4">
        <v-skeleton-loader
          class="mx-auto"
          max-width="300"
          type="article"
        ></v-skeleton-loader>
      </v-col>
      <v-col 
          v-for="library in ownedLibraries" :key="library.id"
          cols="4">
          <library-item :library="library"/>
      </v-col>
    </v-row>
</template>

<script>
import { mapState } from 'vuex'
import LibraryItem from '../../components/items/LibraryItem.vue'
export default {
  components: { LibraryItem },
  name: 'OwnedLibrariesPage',
  data: () => ({
    skeletons: [1, 2, 3, 4, 5, 6, 7]
  }),
  computed: {
    ...mapState({
      ownedLibraries: s => s.LibraryStore.ownedLibraries
    }),
  },
  mounted() {
    this.$store.dispatch('LibraryStore/getOwnedLibraryList')
      .then(() => this.skeletons = [])
  }, 
};
</script>
