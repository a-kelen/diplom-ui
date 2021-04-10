<template>
  <v-container class="pa-0 ma-0">
    <v-row v-if="liked.length == 0">
      <v-col :key="i" v-for="i in skeletons" cols="4">
        <v-skeleton-loader
        class="mx-auto"
        max-width="300"
        type="article"
        ></v-skeleton-loader>
      </v-col>
    </v-row>
    <v-row>
      <v-col 
        v-for="like in liked" :key="like.id"
        cols="4"
      >
        <library-item v-if="like.library != null" :library="like.library"/>
        <component-item v-if="like.component != null" :component="like.component"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import ComponentItem from '../../components/items/ComponentItem.vue'
import LibraryItem from '../../components/items/LibraryItem.vue'
export default {
  components: { LibraryItem, ComponentItem },
  name: 'LikesPage',
  data: () => ({
      skeletons: [1, 2, 3, 4, 5, 6, 7]
  }),
  computed: {
    ...mapState({
      liked: s => s.ElementStore.likedList
    }),
  },
  created() {
    this.$store.dispatch('ElementStore/getLikedLibraries')
        .then(() => this.skeletons = [])
  }
};
</script>
