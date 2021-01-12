<template>
  <v-container>
    <v-row>
        <v-col>
            <p class="text-h5">Library Name</p>
        </v-col>
    </v-row>
    <v-row>
        <v-col>
            <v-btn color="primary">Add existing component(s)</v-btn>
        </v-col>
    </v-row>
     <v-row>
        <v-col>
            <v-btn color="primary">Add new component</v-btn>
        </v-col>
    </v-row>
     <v-row>
        <v-col>
            <v-btn color="primary">Browse list</v-btn>
        </v-col>
    </v-row>
    <v-row>
        <v-col>
            <primary-component-item></primary-component-item>
            <primary-component-item></primary-component-item>
            <primary-component-item></primary-component-item>
        </v-col>
    </v-row>
  </v-container>
</template>

<script>
import PrimaryComponentItem from '../items/PrimaryComponentItem.vue';
export default {
  name: "DescribeLibraryTab",
  components: {
    PrimaryComponentItem
  },
  data: () => ({
      text: "",
      renderConfig: {
        // Mermaid config
        mermaid: {
          theme: "dark"
        },
        emoji: false
      }
  })
};
</script>
