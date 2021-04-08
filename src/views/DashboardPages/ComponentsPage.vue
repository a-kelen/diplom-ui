<template>
  <v-container class="pa-0 ma-0">
    <v-row v-if="ownComponents.length == 0">
      <v-col :key="i" v-for="i in skeletons" cols="4">
        <v-skeleton-loader
          class="mx-auto"
          max-width="300"
          type="article"
        ></v-skeleton-loader>
      </v-col>
    </v-row>
    <v-row>
      <v-col v-for="component in ownComponents" :key="component.id" cols="4">
          <component-item :component="component"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import ComponentItem from '../../components/items/ComponentItem.vue'
export default {
  components: { ComponentItem },
  name: 'ComponentsPage',
  data: () => ({
    skeletons: [1, 2, 3, 4, 5, 6, 7]
  }),
  computed: {
    ...mapState({
      ownComponents: s => s.ComponentStore.ownComponents
    }),
  },
  created() {
    this.$store.dispatch('ComponentStore/getOwnComponentList')
      .then(() => this.skeletons = [])
  }
};
</script>
