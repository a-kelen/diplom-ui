<template>
  <v-container class="mb-6">
    <v-row>
      <v-col>
        <p class="text-h5">{{ libraryName }}</p>
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
    <v-row>
      <v-alert
        v-show="hasDuplicates"
        type="error"
      >Component List has duplicates</v-alert>
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
      components: s => s.ElementStore.components,
      libraryName: s => s.ElementStore.newLibraryName
    }),

    hasDuplicates() {
      let array = this.components.map(x => x.name)
      return new Set(array).size !== array.length && array.every(x => x.name != '')
    }
  },
  watch: {
    hasDuplicates(val) {
      this.$store.commit('ElementStore/updateNewLibraryHasDuplicates', val)
    }
  },
  methods: {
    addNewComponent() {
      console
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
