<template>
  <v-container class="pa-0 ma-0">
    <v-row v-if="ownedComponents.length == 0">
      <v-col :key="i" v-for="i in skeletons" cols="4">
        <v-skeleton-loader
          class="mx-auto"
          max-width="300"
          type="article"
        ></v-skeleton-loader>
      </v-col>
    </v-row>
    <v-row>
      <v-col v-for="component in ownedComponents" :key="component.id" cols="4">
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
  name: 'OwnedComponentsPage',
  data: () => ({
    skeletons: [1, 2, 3, 4, 5, 6, 7]
  }),
  computed: {
    ...mapState({
      ownedComponents: s => s.ComponentStore.ownedComponents
    }),
  },
  created() {
    this.$store.dispatch('ComponentStore/getOwnedComponentList')
      .then(() => this.skeletons = [])
  }, 
};
</script>
