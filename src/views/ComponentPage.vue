<template>
    <v-container v-if="component">
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
                {{component.description}}
              </v-tab-item>
              <v-tab-item  value="tab-2">
                <event-item 
                  v-for="(e, i) in component.events" 
                  :key="i"
                  :event="e"
                  :isLast="component.events.length - 1 == i"/>
              </v-tab-item>
              <v-tab-item value="tab-3">
                <prop-item 
                  v-for="(p, i) in component.props" 
                  :key="i"
                  :prop="p"
                  :isLast="component.props.length - 1 == i"/>
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
import { mapState } from 'vuex'
export default {
  name: "ComponentPage",
  components: {
    EventItem,
    PropItem
  },
  data: () => ({
    tab: 'tab-1',
  }),
  computed: {
    ...mapState({
      component: s => s.ComponentStore.activeComponent
    })
  },
  // watch: {
  //   c() {
  //     this.component = this.c
  //   }
  // },
  methods: {
    fetch() {
      this.$store.dispatch('ComponentStore/getComponent', this.$route.params.id)
    },
    
  },
  beforeRouteUpdate (to, from, next) {
      this.fetch()
      next()
  },
  beforeRouteEnter (to, from, next) {
      next(vm => vm.fetch())
  },

};
</script>

<style scoped>

</style>
