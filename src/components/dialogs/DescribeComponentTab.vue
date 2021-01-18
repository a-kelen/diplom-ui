<template>
  <v-container>
    <v-row>
        <v-file-input
            v-model="component.files"
            color="primary"
            counter
            multiple
            placeholder="Select your files"
            prepend-icon="mdi-paperclip"
            outlined
            :show-size="1000"
        >
            <template v-slot:selection="{ index, text }">
            <v-chip
                v-if="index < 2"
                color="primary"
                dark
                label
                small
            >
                {{ text }}
            </v-chip>

            <span
                v-else-if="index === 2"
                class="overline grey--text text--darken-3 mx-2"
            >
                +{{ component.files.length - 2 }} File(s)
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
import AddEventItem from '../items/AddEventItem.vue';
import AddPropItem from '../items/AddPropItem.vue';
import { Editor } from "vuetify-markdown-editor";

export default {
  name: "DescribeComponentTab",
  components: {
    AddEventItem,
    AddPropItem,
      Editor
  },
  props: ['component'],
  data: () => ({
    renderConfig: {
    // Mermaid config
    mermaid: {
        theme: "dark"
    },
    emoji: false
    }
  }),
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
