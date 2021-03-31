<template>
  <v-container>
    <v-row>
        <v-col>
            <v-btn class="ma-2" color="primary" @click="addProp">Add prop</v-btn>
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
            <v-btn class="ma-2" color="primary" @click="addEvent">Add event</v-btn>
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
        <v-card-text class="text-h5">Description</v-card-text>
    </v-row>
    <v-row>
        <Editor
        mode="editor"
        :emoji="false"
        ref="editor"
        :outline="false"
        :render-config="renderConfig"
        v-model="component.description"
        />
    </v-row>
  </v-container>
</template>

<script>
import { Editor } from 'vuetify-markdown-editor'
import AddEventItem from '../items/AddEventItem.vue'
import AddPropItem from '../items/AddPropItem.vue'
import Sortable from 'vue-drag-sortable'

export default {
  name: 'EditComponent',
  components: {
    Editor,
    AddPropItem,
    AddEventItem,
    Sortable
  },
  props: ['component'],
  data: () => ({
    editMode: false,
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
    componentDescription() {
        return this.component.description
    }
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
