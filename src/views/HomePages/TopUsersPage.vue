<template>
  <v-container class="pa-0 ma-0">
    <v-row v-if="authors.length == 0">
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
        <author-item v-for="author in authors" :key="author.username"  :author="author"/>
      </div>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import AuthorItem from '../../components/items/AuthorItem.vue'
export default {
  components: { AuthorItem },
  name: 'TopUsersPage',
  data: () => ({
    skeletons: [1, 2, 3, 4, 5, 6, 7]
  }),
  computed: {
    ...mapState({
      authors: s => s.UserStore.topUsers
    }),
  },
  created() {
    this.$store.dispatch('UserStore/getTopUsersList')
      .then(() => this.skeletons = [])
  }
};
</script>
