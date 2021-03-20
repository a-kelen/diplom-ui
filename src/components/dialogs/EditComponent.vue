<template>
  <v-container>
    <v-row>
        <v-col>
            <v-btn class="ma-2" color="primary" @click="addProp">Add prop</v-btn>
        </v-col>
    </v-row>
    <v-row>
        <add-prop-item :key="index" v-for="(prop, index) in component.props" :item="prop"/>
    </v-row>
    <v-row>
        <v-col>
            <v-btn class="ma-2" color="primary" @click="addEvent">Add event</v-btn>
        </v-col>
    </v-row>
    <v-row>
        <add-event-item :key="index" v-for="(event, index) in component.events" :item="event"/>
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

export default {
  name: 'EditComponent',
  components: {
    Editor,
    AddPropItem,
    AddEventItem
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
    }
  }),
  computed: {
    componentDescription() {
        return this.component.description
    }
  },
  watch: {
      componentDescription() {
          console.log('A    ')
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
        id: this.component.props.length + 1,
        name: '',
        desciption: ''  
        })
    }
  }
}
</script>
