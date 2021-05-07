<template>
  <v-container class="pa-0 ma-0">
    <v-row v-if="libraries.length == 0">
      <v-col :key="i" v-for="i in skeletons" cols="4">
        <v-skeleton-loader
          class="mx-auto"
          max-width="300"
          type="article"
        ></v-skeleton-loader>
      </v-col>
    </v-row>
    <v-row>
      <div class="custom-grid ma-4">
        <library-item v-for="library in libraries" :key="library.id" :library="library"/>
      </div>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import LibraryItem from '../../components/items/LibraryItem.vue'
export default {
  components: { LibraryItem },
  name: 'TopLibrariesPages',
  data: () => ({
      skeletons: [1, 2, 3, 4, 5, 6, 7]
  }),
  computed: {
    ...mapState({
      libraries: s => s.LibraryStore.topLibraries
    }),
  },
  created() {
    this.$store.dispatch('LibraryStore/getTopLibraryList')
      .then(() => this.skeletons = [])
  },
};
</script>
