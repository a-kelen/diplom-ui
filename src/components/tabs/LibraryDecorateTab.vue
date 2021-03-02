<template>
  <v-container>
    <v-row>
        <v-col>
            <p class="text-h5">Library Name</p>
        </v-col>
    </v-row>
    <v-row>
        <v-col>
            <v-btn 
              color="primary"
              
              >Add existing component(s)</v-btn>
        </v-col>
    </v-row>
     <v-row>
        <v-col>
            <v-btn 
              color="primary"
              @click="addNewComponent"
              >Add new component</v-btn>
        </v-col>
    </v-row>
     <!-- <v-row>
        <v-col>
            <v-btn color="primary">Browse list</v-btn>
        </v-col>
    </v-row> -->
    <v-row>
        <v-col>
            <primary-component-item v-for="(c, i) in components" :component="c" :key="i"></primary-component-item>
        </v-col>
    </v-row>
  </v-container>
</template>

<script>
import PrimaryComponentItem from '../items/PrimaryComponentItem.vue';
import { mapState} from 'vuex';
export default {
  name: 'DescribeLibraryTab',
  components: {
    PrimaryComponentItem
  },
  data: () => ({
      dialog: false,
      text: '',
      renderConfig: {
        // Mermaid config
        mermaid: {
          theme: 'dark'
        },
        emoji: false
      },

  }),
  computed: {
    ...mapState({
      components: s => s.ElementStore.components
    })
  },
  methods: {
    addNewComponent() {
      this.$store.commit('ElementStore/addNewComponentToLibrary')
    }
  }
};
</script>
