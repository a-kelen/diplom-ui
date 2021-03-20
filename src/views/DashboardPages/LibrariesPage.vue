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
          v-for="library in ownLibraries" :key="library.id"
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
  name: 'LibrariesPages',
  data: () => ({
      skeletons: [1, 2, 3, 4, 5, 6, 7]
  }),
  computed: {
    ...mapState({
      ownLibraries: s => s.LibraryStore.ownLibraries
    }),
  },
  created() {
    this.$store.dispatch('LibraryStore/getOwnLibraryList')
      .then(() => this.skeletons = [])
  },
};
</script>
