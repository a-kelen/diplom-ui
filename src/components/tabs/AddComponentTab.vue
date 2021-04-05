<template>
  <v-container>
    <v-row class="d-flex">
      <v-text-field
        label="Name"
        outlined
        dense
        class="my-1"
      ></v-text-field>
    </v-row>
    <v-row>
        <v-file-input
            v-model="component.files"
            color="primary"
            counter
            multiple
            placeholder="Select your files"
            append-outer-icon="mdi-paperclip"
            prepend-icon=""
            outlined
            dense
            :show-size="1000">
            <template v-slot:selection="{ index, text }">
                <v-chip
                    v-if="index < 3"
                    color="primary"
                    dark
                    label
                    small>
                    {{ text }}
                </v-chip>

                <span
                    v-else-if="index === 2"
                    class="overline grey--text text--darken-3 mx-2">
                    + {{ component.files.length - 2 }} File(s)
                </span>
            </template>
        </v-file-input>
    </v-row>
    <v-row>
        <v-list>
            <v-list-item v-for="(f, i) in component.files" :key="i">
                <v-card class="rounded-pill pa-1 pr-3">
                    <v-icon class="mx-1">mdi-vuejs</v-icon>
                    {{f.name}}
                </v-card>
            </v-list-item>
        </v-list>
    </v-row>
    <v-row>
        <v-col>
            <v-btn @click="addProp" class="ma-2" color="primary">Add prop</v-btn>
        </v-col>
    </v-row>
    <v-row>
      <sortable v-for="(prop, index) in component.props"
          v-model="dragPropData"
          :key="prop.id"
          :index="index"
          drag-direction="vertical"
          replace-direction="vertical"
          @sortend="sortProps" 
      >
          <add-prop-item @deleteProp="deleteProp" :item="prop"/>
      </sortable>
    </v-row>
    <v-row>
        <v-col>
            <v-btn @click="addEvent" class="ma-2" color="primary">Add event</v-btn>
        </v-col>
    </v-row>
    <v-row>
      <sortable v-for="(event, index) in component.events"
        v-model="dragEventData"
        :key="event.id"
        :index="index"
        drag-direction="vertical"
        replace-direction="vertical"
        @sortend="sortEvents" 
      >
        <add-event-item @deleteEvent="deleteEvent" :item="event"/>
      </sortable>
    </v-row>
    <v-row>
        <v-card-text class="text-h5" v-model="component.description">Description</v-card-text>
    </v-row>
    <v-row>
        <!-- <Editor
        mode="editor"
        :emoji="false"
        ref="editor"
        :outline="false"
        :render-config="renderConfig"
        v-model="component.description"
        /> -->
        <!-- <vue-editor v-model="component.description" /> -->
    </v-row>
  </v-container>
</template>

<script>
import AddEventItem from '../items/AddEventItem.vue';
import AddPropItem from '../items/AddPropItem.vue';
// import { Editor } from "vuetify-markdown-editor";
// import { VueEditor } from "vue2-editor";
import { mapState } from 'vuex';
import Sortable from 'vue-drag-sortable'

export default {
  name: 'AddComponentTab',
  components: {
    AddEventItem,
    AddPropItem,
    Sortable,
    // Editor
    // VueEditor 
  },
  data: () => ({
    renderConfig: {
    // Mermaid config
    mermaid: {
        theme: 'dark'
    },
    emoji: false
    },
    dragEventData: {},
    dragPropData: {},

  }),
  computed: {
      ...mapState({
          component: s => s.ElementStore.newComponent
      })
  },
  methods: {
      addProp() {
        this.component.props.push({
        id: this.component.props.length + 1,
        name: '',
        desciption: ''  
        })
    },
    addEvent() {
        this.component.events.push({
        id: this.component.events.length + 1,
        name: '',
        desciption: ''  
        })
    },
    deleteEvent(id) {
      console.log(id)
      this.component.events = this.component.events.filter(x => x.id != id)
    },
    deleteProp(id) {
      this.component.props = this.component.props.filter(x => x.id != id)
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
    sortEvents(e) {
        this.sortend(e, this.component.events)
    },
    sortProps(e) {
        this.sortend(e, this.component.props)
    }
  }
}
</script>
<style lang="css">
@import "~vue2-editor/dist/vue2-editor.css";

/* Import the Quill styles you want */
@import '~quill/dist/quill.core.css';
@import '~quill/dist/quill.bubble.css';
@import '~quill/dist/quill.snow.css';
</style>
