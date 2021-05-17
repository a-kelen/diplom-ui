<template>
  <v-container>
    <v-row>
      <v-col>
      <v-card elevation="3" class="d-flex pa-2 align-center">
        <v-icon size="30" color="blue" >mdi-vuejs</v-icon>
        <v-chip color="blue" class="mx-2" dark  label>{{ frameworkType }}</v-chip>
        <div class="mx-2">{{ componentName }}</div>
        <v-icon v-show="component.isDone" color="primary">mdi-checkbox-marked-circle-outline</v-icon>
        <v-btn icon color="primary" @click="addNewComponent" class="ml-auto">
          <v-icon>mdi-pen</v-icon>
        </v-btn>
        <v-btn @click="deleteComponent" icon color="primary" class="ml-2">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card>
      </v-col>
    </v-row>
    <v-dialog
      v-if="dialog"
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar
          dark
          color="primary"
        >
          <v-btn
            icon
            dark
            @click="dialog = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Describe component</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn
              dark
              icon
              @click="dialog = false"
            >
              <v-icon>mdi-pen</v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <describe-component-tab :component="component" class="py-10"/>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import DescribeComponentTab from '../dialogs/DescribeComponentTab.vue'

export default {
  name: 'PrimaryComponentItem',
  components: {
    DescribeComponentTab
  },
  props: ['component'],
  data: () => ({
    dialog: false
  }),
  computed: {
    ...mapState({
       frameworkType: s => s.ElementStore.elementType
    }),

    componentName() {
      return this.component.name ? this.component.name : '(Empty)' 
    }
  },
  methods: {
    addNewComponent() {
      this.dialog = !this.dialog
    },
    
    deleteComponent() {
      this.$store.commit('ElementStore/deleteComponent', this.component.id)
    }
  },
}
</script>

<style scoped>
.gap {
  gap: 1rem;
}
</style>
