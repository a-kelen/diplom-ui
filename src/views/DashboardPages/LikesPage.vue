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
      <div class="custom-grid mx-4">
        <div v-for="like in liked" :key="like.id">
          <library-item v-if="like.library != null" :library="like.library"/>
          <component-item v-if="like.component != null" :component="like.component"/>
        </div>
      </div>
    </v-row>
    <v-row v-show="noData">
      <no-data-component />
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import ComponentItem from '../../components/items/ComponentItem.vue'
import LibraryItem from '../../components/items/LibraryItem.vue'
import NoDataComponent from '../../components/NoDataComponent.vue';
export default {
  components: { LibraryItem, ComponentItem, NoDataComponent },
  name: 'LikesPage',
  data: () => ({
      skeletons: [1, 2, 3, 4, 5, 6, 7],
      noData: false
  }),
  computed: {
    ...mapState({
      liked: s => s.ElementStore.likedList,
      filter: s => s.SearchStore.dashboardSearchQuery
    }),
    filteredLiked() {
      return this.liked.filter(x => {
        if(x.component)
          return x.component.name.toLowerCase().includes(this.filter.toLowerCase())
        else 
          return x.library.name.toLowerCase().includes(this.filter.toLowerCase())

      })
    }
  },
  created() {
    this.$store.dispatch('ElementStore/getLikedLibraries')
        .then(() => {
        this.skeletons = []
        if(!this.liked.length > 0)
          this.noData = true
      })
  }
};
</script>
