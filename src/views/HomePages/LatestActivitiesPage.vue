<template>
  <v-container class="pa-0 ma-0">
    asdasd
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
export default {
  components: {  },
  name: 'LatestActivitiesPage',
  data: () => ({
  }),
  computed: {
    ...mapState({
    }),
  },
  created() {
    // this.$store.dispatch('ComponentStore/getOwnComponentList')
    //   .then(() => this.skeletons = [])
  }
};
</script>
