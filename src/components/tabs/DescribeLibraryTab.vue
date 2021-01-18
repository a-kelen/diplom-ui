<template>
  <v-container>
    <v-row>
        <v-text-field
            v-model="newLibraryName"
            label="Name"
        ></v-text-field>
    </v-row>
    <v-row>
        <Editor
        mode="editor"
        :emoji="false"
        ref="editor"
        :outline="false"
        :render-config="renderConfig"
        v-model="newLibraryDescription"
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
  }),
  computed: {
    newLibraryName: {
      get () {
        return this.$store.state.ElementStore.newLibraryName
      },
      set (value) {
        this.$store.commit('ElementStore/updateNewLibraryName', value)
      }
    },
    newLibraryDescription: {
      get () {
        return this.$store.state.ElementStore.newLibraryDescription
      },
      set (value) {
        this.$store.commit('ElementStore/updateNewLibraryDescription', value)
      }
    }
  },
  created() {
    
  }
};
</script>
