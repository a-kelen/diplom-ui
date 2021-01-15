<template>
    <v-container>
      <v-row>
        <v-col>
          <v-row>
            <v-col>
              <v-sheet class="transparent d-flex align-center">
                <v-card-text class="text-h4">
                  Title
                </v-card-text>
                <v-chip label>Format</v-chip>
              </v-sheet>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-sheet class="transparent gap d-flex align-center">
                <v-card-text>
                  From library: VueLib
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
        <v-col>
          <v-card class="px-2">
            <v-tabs v-model="tab" grow>
              <v-tab href="#tab-1">Description</v-tab>
              <v-tab href="#tab-2">Events</v-tab>
              <v-tab href="#tab-3">Props</v-tab>
              <v-tab href="#tab-4">Dependencies</v-tab>
            </v-tabs>
            <v-tabs-items class="transparent-body" v-model="tab">
              <v-tab-item background-opacity="0" value="tab-1">
                sdfsdfsdf
              </v-tab-item>
              <v-tab-item value="tab-2">
                <event-item/>
                <event-item :isLast="true"/>
              </v-tab-item>
              <v-tab-item value="tab-3">
                <prop-item/>
              </v-tab-item>
              <v-tab-item value="tab-4">
                sdfsdfsdf
              </v-tab-item>
            </v-tabs-items>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
</template>

<script>
import EventItem from '../components/items/EventItem.vue';
import PropItem from '../components/items/PropItem.vue';

export default {
  name: "ComponentPage",
  components: {
    EventItem,
    PropItem
  },
  data: () => ({
    tab: 'tab-2'
  })
};
</script>

<style scoped>

</style>
