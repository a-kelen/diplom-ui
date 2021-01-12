<template>
  <v-container>
    <v-row>
        <v-file-input
            v-model="files"
            color="deep-purple accent-4"
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
                color="deep-purple accent-4"
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
                +{{ files.length - 2 }} File(s)
            </span>
            </template>
        </v-file-input>
    </v-row>
    <v-row>
        <v-list>
            <v-list-item v-for="(f, i) in files" :key="i">
                <v-card class="pa-2">
                    <v-icon>mdi-vuejs</v-icon>
                    {{f.name}}
                </v-card>
            </v-list-item>
        </v-list>
    </v-row>
    <v-row>
        <v-col>
            <v-btn class="ma-2" color="primary">Add prop</v-btn>
        </v-col>
    </v-row>
    <v-row>
        <add-prop-item/>
    </v-row>
    <v-row>
        <v-col>
            <v-btn class="ma-2" color="primary">Add event</v-btn>
        </v-col>
    </v-row>
    <v-row>
        <add-event-item/>
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
        v-model="text"
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
  data: () => ({
      files: []
  })
};
</script>
