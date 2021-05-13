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
          <add-component-field
            @deleteItem="deleteProp"
            :descriptionTitle="'Prop Description'" 
            :nameTitle="'Prop name'" 
            :item="prop"/>
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
        <add-component-field
          @deleteItem="deleteEvent"
          :descriptionTitle="'Event Description'" 
          :nameTitle="'Event name'" 
          :item="event"/>
      </sortable>
    </v-row>

    <v-row>
        <v-col>
          <v-btn class="ma-2" color="primary" @click="addSlot">Add slot</v-btn>
        </v-col>
    </v-row>
    <v-row>
      <sortable v-for="(slot, index) in component.slots"
        v-model="dragSlotData"
        :key="slot.id"
        :index="index"
        drag-direction="vertical"
        replace-direction="vertical"
        @sortend="sortSlots" 
      >
        <add-component-field
          :descriptionTitle="'Slot Description'" 
          :nameTitle="'Slot name'" 
          :item="slot"/>
      </sortable>
    </v-row>
    <v-row>
      <v-textarea class="my-5" filled no-resize label="Dependencies" v-model="component.dependencies"/>
    </v-row>
    <v-row>
      <v-switch :label="component.status" v-model="savedStatus"></v-switch>
    </v-row>
    <v-row>
        <v-card-text class="text-h5">Description</v-card-text>
    </v-row>
    <v-row>
        <Editor
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
import Sortable from 'vue-drag-sortable'
import AddComponentField from '../items/AddComponentField.vue'

export default {
  name: 'EditComponent',
  components: {
    Editor,
    Sortable,
    AddComponentField
  },
  props: ['component'],
  data: () => ({
    editMode: false,
    savedStatus: false,
    renderConfig: {
    mermaid: {
        theme: 'dark' 
    },
    emoji: false
    },
    dragEventData: {},
    dragPropData: {},
    dragSlotData: {},
  }),
  computed: {
    componentDescription() {
        return this.component.description
    },
  },
  watch: {
    savedStatus() {
      this.component.status = this.savedStatus ? 'Public' : 'Private'
    }
  },
  mounted() {
    this.savedStatus = this.component.status == 'Public'
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

    addSlot() {
      this.component.slots.push({
      id: this.component.slots.length + 1,
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

    deleteSlot(id) {
      this.component.slots = this.component.slots.filter(x => x.id != id)
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
    },

    sortSlots(e) {
        this.sortend(e, this.component.slots)
    }
    
  }
}
</script>
