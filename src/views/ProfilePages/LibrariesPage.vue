<template>
  <v-container class="pa-0 ma-0">
    <v-row >
      <div class="custom-grid ma-4">
        <library-item v-for="library in libraries" :key="library.id" :library="library"/>
      </div>
    </v-row>
    <v-row v-show="noData">
      <no-data-component />
    </v-row>
  </v-container>
</template>

<script>
import LibraryItem from '../../components/items/LibraryItem.vue'
import NoDataComponent from '../../components/NoDataComponent.vue';
export default {
  components: { LibraryItem, NoDataComponent },
  name: 'LibrariesPages',
  props: ['libraries'],
  data: () => ({
      skeletons: [1, 2, 3, 4, 5, 6, 7],
      noData: false
  }),
  
};
</script>
