<template>
    <v-container>
      <v-row>
        <v-col md="2">
          <v-avatar
            size="150"
            color="teal"
            tile
          >
            RR
          </v-avatar>
        </v-col>
        <v-col md="10">
          <v-row>
            <v-col>
              <v-sheet class="transparent d-flex align-center">
                <v-card-text class="text-h4">
                  Title
                </v-card-text>
                <v-rating class="ml-auto"></v-rating>
              </v-sheet>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-sheet class="transparent gap d-flex align-center">
                <v-card-text>
                  author-a
                </v-card-text>
                <v-btn color="primary" icon>
                  <v-icon>mdi-heart-outline</v-icon>
                </v-btn>
                <v-btn color="primary" icon>
                  <v-icon>mdi-download-outline</v-icon>
                </v-btn>
                <v-btn color="primary">Get</v-btn>
              </v-sheet>
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <v-row>
        <v-col offset="2" >
          <v-card class="px-2">
            <v-tabs v-model="tab" grow>
              <v-tab href="#tab-1">Description</v-tab>
              <v-tab href="#tab-2">Components</v-tab>
              <v-tab href="#tab-3">Dependencies</v-tab>
            </v-tabs>
            <v-tabs-items class="transparent-body tabs-item-focus-opacity" v-model="tab">
              <v-tab-item background-opacity="0" value="tab-1">
                sdfsdfsdf
              </v-tab-item>
              <v-tab-item value="tab-2">
                  <component-row/>
                  <component-row/>
                  <component-row/>
                  <component-row/>
              </v-tab-item>
              <v-tab-item value="tab-3">
                sdfsdfsdf
              </v-tab-item>
            </v-tabs-items>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
</template>

<script>
import ComponentRow from '../components/items/ComponentRow.vue';
export default {
  name: "Library",
  components: {
    ComponentRow
  },
  data: () => ({
    tab: 'tab-1'
  })
};
</script>

<style scoped>
.gap {
  gap: 1rem;
}
.transparent-body {
  background: transparent
}
</style>
