<template>
  <v-container class="pa-0 ma-0">
    <v-row v-if="components.length == 0">
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
        <component-item v-for="component in components" :key="component.id" :component="component"/>
      </div>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import ComponentItem from '../../components/items/ComponentItem.vue'
export default {
  components: { ComponentItem },
  name: 'TopComponentsPage',
  data: () => ({
    skeletons: [1, 2, 3, 4, 5, 6, 7]
  }),
  computed: {
    ...mapState({
      components: s => s.ComponentStore.topComponents
    }),
  },
  created() {
    this.$store.dispatch('ComponentStore/getTopComponentList')
      .then(() => this.skeletons = [])
  }
};
</script>
