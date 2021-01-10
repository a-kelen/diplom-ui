<template>

 <v-row no-gutters>
      <v-col
        cols="14"
        sm="6"
        md="10"
        class="pa-6"
      >
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
        <v-row v-if="selectedItem == 0">
          <v-col 
            v-for="n in 10" 
            :key="n"
            cols="4">
            <component-item />
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
        <v-row v-if="selectedItem == 2">
          <v-col 
            v-for="n in 10" 
            :key="n"
            cols="4">
            <author-item/>
          </v-col>
        </v-row>
      </v-col>
      <v-col
        cols="2"
        md="2"
      >
        <v-sheet elevation="6">
          <v-list flat>
      <v-list-item-group
        v-model="selectedItem"
        color="primary"
      >
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
        >
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.text"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
        
        </v-sheet>
      </v-col>
    </v-row>

</template>
  

<script>
import AuthorItem from '../components/items/AuthorItem.vue';
import ComponentItem from '../components/items/ComponentItem.vue';
import LibraryItem from '../components/items/LibraryItem.vue';


export default {
  name: "Home",
  components: {
    ComponentItem,
    LibraryItem,
    AuthorItem
  },
  data: () => ({ 
      selectedItem: 1,
      items: [
        { text: 'Components', icon: 'mdi-view-compact' },
        { text: 'Libraries', icon: 'mdi-library' },
        { text: 'Users', icon: 'mdi-account' },
      ],
    })
};
</script>
