<template>
  <v-container class="pa-0 ma-0">
    <v-row v-if="activitiesPage.activities == 0">
      <v-col :key="i" v-for="i in skeletons" cols="4">
        <v-skeleton-loader
          class="mx-auto"
          max-width="300"
          type="article"
        ></v-skeleton-loader>
      </v-col>
    </v-row>
    <v-row v-else>
      <activities-page :activities="activitiesPage.activities"/>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import ActivitiesPage from '../ProfilePages/ActivitiesPage.vue'
export default {
  components: {ActivitiesPage},
  name: 'LatestActivitiesPage',
  data: () => ({
     skeletons: [1, 2, 3, 4, 5, 6, 7]
  }),
  computed: {
    ...mapState({
      activitiesPage: s => s.UserStore.activitiesPage
    }),
  },
  created() {
    this.$store.dispatch('UserStore/getActivities')
      .then(() => this.skeletons = [])
  }
};
</script>
