<template>
    <v-row>
      <v-col :key="i" v-for="i in skeletons" cols="4">
        <v-skeleton-loader
          class="mx-auto"
          max-width="300"
          type="article"
        ></v-skeleton-loader>
      </v-col>
      <v-col v-for="component in ownedComponents" :key="component.id" cols="4">
          <component-item :component="component"/>
      </v-col>
    </v-row>
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
  mounted() {
    this.$store.dispatch('ComponentStore/getOwnedComponentList')
      .then(() => this.skeletons = [])
  }, 
};
</script>
