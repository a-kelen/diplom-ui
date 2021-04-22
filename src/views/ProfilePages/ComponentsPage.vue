<template>
  <v-container class="pa-0 ma-0">
    <v-row>
      <div class="custom-grid ma-4">
        <component-item v-for="component in components" :key="component.id" :component="component"/>
      </div>
    </v-row>
    <v-row v-show="noData">
      <no-data-component />
    </v-row>
  </v-container>
</template>

<script>
import ComponentItem from '../../components/items/ComponentItem.vue'
import NoDataComponent from '../../components/NoDataComponent.vue'
export default {
  components: { ComponentItem, NoDataComponent },
  name: 'ComponentsPage',
  props: ['components'],
  data: () => ({
      noData: false
  }),
};
</script>
