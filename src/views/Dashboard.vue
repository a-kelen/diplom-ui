<template>
      <v-row>  
          <v-col
            md="2">
            <v-btn 
            class="my-6 " 
            rounded 
            block
            dark
            color="teal darken-3">Create element</v-btn>
            <v-sheet elevation="6">
              <v-list flat>
                <v-list-item-group
                  v-model="selectedItem"
                  color="primary">
                  <v-list-item
                    v-for="(item, i) in items"
                    :key="i">
                    <v-list-item-content>
                      <v-list-item-title v-text="item.text"></v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-sheet>
          </v-col>

          <v-col
          cols="12"
          md="10"
          class="pa-6">
          <v-row>
            <v-col>
              <v-text-field
              label="Search"
              placeholder="Input text"
              filled
              rounded
            ></v-text-field>
            </v-col>
          </v-row>
          <v-row v-if="selectedItem == 2">
            <v-col 
              v-for="n in 10" 
              :key="n"
              cols="4">
              <component-item/>
            </v-col>
          </v-row>
          <v-row v-if="selectedItem == 1">
            <v-col 
              v-for="n in 10" 
              :key="n"
              cols="4">
              <library-item/>
            </v-col>
          </v-row>
          <v-row justify="center">
        <v-col cols="8">
          <v-container class="max-width">
            <v-pagination
              v-model="page"
              class="my-4"
              color="teal darken-3"
              length="5"
              circle
            ></v-pagination>
          </v-container>
        </v-col>
      </v-row>
        </v-col>
      </v-row>
</template>

<script>
import ComponentItem from '../components/items/ComponentItem.vue';
import LibraryItem from '../components/items/LibraryItem.vue';

export default {
  name: "Dashboard",
  components: {
    LibraryItem,
    ComponentItem
  },
  data: () => ({
      selectedItem: 1,
      page: 1,
      items: [
        { text: 'Likes', icon: 'mdi-view-compact' },
        { text: 'Libraries', icon: 'mdi-view-compact' },
        { text: 'Components', icon: 'mdi-library' },
        { text: 'Owned Libraries', icon: 'mdi-account' },
        { text: 'Owned Components', icon: 'mdi-account' },
      ],
  })
};
</script>


<style scoped>

</style>
