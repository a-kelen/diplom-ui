<template>
  <v-container class="mb-6">
    <v-row>
      <v-col>
        <p class="text-h5">Library Name</p>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-btn 
          color="primary"
        >
          Add existing component(s)
        </v-btn>
      </v-col>
    </v-row>
     <v-row>
      <v-col>
        <v-btn 
          color="primary"
          @click="addNewComponent"
        >
          Add new component
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <sortable v-for="(c, index) in components"
          v-model="dragComponentData"
          :key="c.id"
          :index="index"
          drag-direction="vertical"
          replace-direction="vertical"
          @sortend="sortComponents" 
        >
          <primary-component-item :component="c" ></primary-component-item>
        </sortable>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import PrimaryComponentItem from '../items/PrimaryComponentItem.vue'
import Sortable from 'vue-drag-sortable'
import { mapState} from 'vuex'
export default {
  name: 'DescribeLibraryTab',
  components: {
    PrimaryComponentItem,
    Sortable
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
      dragComponentData:{}

  }),
  computed: {
    ...mapState({
      components: s => s.ElementStore.components
    })
  },
  methods: {
    addNewComponent() {
      this.$store.commit('ElementStore/addNewComponentToLibrary')
    },

    sortend (e, list) {
      const { oldIndex, newIndex } = e
      this.rearrange(list, oldIndex, newIndex)
    },

    rearrange (array, oldIndex, newIndex) {
      if (oldIndex > newIndex) {
        array.splice(newIndex, 0, array[oldIndex])
        array.splice(oldIndex + 1, 1)
      }
      else {
        array.splice(newIndex + 1, 0, array[oldIndex])
        array.splice(oldIndex, 1)
      }
    },
    
    sortComponents(e) {
        this.sortend(e, this.components)
    },
  }
};
</script>
