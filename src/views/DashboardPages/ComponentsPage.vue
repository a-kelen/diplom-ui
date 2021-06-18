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
      <div class="custom-grid mx-4">
        <component-item v-for="component in components" :key="component.id" :component="component"/>
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
import NoDataComponent from '../../components/NoDataComponent.vue'
export default {
  components: { ComponentItem, NoDataComponent },
  name: 'ComponentsPage',
  data: () => ({
    skeletons: [1, 2, 3, 4, 5, 6, 7],
    noData: false
  }),
  computed: {
    ...mapState({
      ownComponents: s => s.ComponentStore.ownComponents,
      filter: s => s.SearchStore.dashboardSearchQuery,
    }),
    components() {
      if(this.filter)
        return this.ownComponents.filter(x => x.name.toLowerCase().includes(this.filter.toLowerCase()))
      else
        return this.ownComponents
    }
  },
  created() {
    this.$store.dispatch('ComponentStore/getOwnComponentList')
      .then(() => {
        this.skeletons = []
        if(!this.ownComponents.length > 0)
          this.noData = true
      })
  }
};
</script>
