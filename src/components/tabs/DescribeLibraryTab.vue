<template>
  <v-container>
    <v-row>
        <v-text-field
            name="name"
            label="Name"
            id="id"
        ></v-text-field>
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
import { Editor } from "vuetify-markdown-editor";
export default {
  name: "DescribeLibraryTab",
  components: {
      Editor
  },
  data: () => ({
      text: "",
      renderConfig: {
        // Mermaid config
        mermaid: {
          theme: "dark"
        },
        emoji: false
      }
  })
};
</script>
