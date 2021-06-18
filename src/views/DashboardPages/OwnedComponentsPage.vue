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
      <div class="custom-grid mx-4">
        <component-item  v-for="component in components" :key="component.id" :component="component"/>
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
import NoDataComponent from '../../components/NoDataComponent.vue';
export default {
  components: { ComponentItem, NoDataComponent },
  name: 'OwnedComponentsPage',
  data: () => ({
    skeletons: [1, 2, 3, 4, 5, 6, 7],
    noData: false
  }),
  computed: {
    ...mapState({
      ownedComponents: s => s.ComponentStore.ownedComponents,
      filter: s => s.SearchStore.dashboardSearchQuery
    }),
    components() {
      if(this.filter)  
        return this.ownedComponents.filter(x => x.name.toLowerCase().includes(this.filter.toLowerCase()))
      else
        return this.ownedComponents
    }
  },
  created() {
    this.$store.dispatch('ComponentStore/getOwnedComponentList')
      .then(() => {
        this.skeletons = []
        if(!this.ownedComponents.length > 0)
          this.noData = true
      })
  }, 
};
</script>
