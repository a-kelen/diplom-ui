<template>
    <v-list rounded color="transparent">  
      <v-list-item-group
        v-model="selectedItem"
      >
        <v-list-item color="primary" outlined class="rounded-xl">
        <v-card
            height="200"
            flat
            tile
            color="transparent"
            class="d-flex mx-auto  align-center " >
            <v-icon class="mb-5" color="teal" size="50">mdi-library</v-icon>
            <p class="text-h4 teal--text ">Library</p>
        </v-card>
        </v-list-item>
        <v-list-item color="primary"  class="rounded-pill">
         <v-card
            height="200"
            flat
            tile
            color="transparent"
            class="d-flex mx-auto align-center " >
            <v-icon class="mb-5" color="teal" size="50">mdi-view-dashboard</v-icon>
            <p class="text-h4 teal--text">Component</p>
        </v-card>
        </v-list-item>
      </v-list-item-group>
    </v-list>
</template>

<script>
export default {
  name: "SelectTypeTab",
  data: () => ({
      selectedItem: 1
  })
};
</script>

<style scoped>
  .border {
    border: 0.4ch solid teal !important;
  }
  
</style>