<template>
  <v-container>
    <v-row>
      <v-text-field
        filled
        dense
        v-model.trim="newLibraryName"
        label="Name"
      ></v-text-field>
    </v-row>
    <v-row>
      <v-file-input
        label="Avatar input"
        filled
        dense
        prepend-icon=""
        append-outer-icon="mdi-camera"
        v-model="avatarFile"
      ></v-file-input>
    </v-row>
    <v-row>
      <cropper
        class="cropper"
        :src="image"
        :stencil-props="{
          aspectRatio: 1/1
        }"
        default-boundaries="fill"
        priority="visibleArea"
        @change="changeAvatar"
      />
    </v-row>
    <v-row>
      <Editor
        class="mt-7"
        mode="editor"
        :emoji="false"
        ref="editor"
        :outline="false"
        :render-config="renderConfig"
        v-model="newLibraryDescription"/>
    </v-row>
  </v-container>
</template>

<script>
import { Cropper } from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css'
import { Editor } from 'vuetify-markdown-editor'
export default {
  name: 'DescribeLibraryTab',
  components: {
    Cropper,  
    Editor
  },
  data: () => ({
      text: '',
      avatarFile: null,
      image: null,
      renderConfig: {
        // Mermaid config
        mermaid: {
          theme: 'dark'
        },
        emoji: false
      },
      reader: null
  }),
  watch: {
    avatarFile() {
      this.reader.readAsDataURL(this.avatarFile);
    }
  },
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
    },

    newLibraryAvatar: {
      get () {
        return this.$store.state.ElementStore.newLibraryAvatar
      },
      set (value) {
        this.$store.commit('ElementStore/updateNewLibraryAvatar', value)
      }
    },
    
  },
  methods: {
    changeAvatar({ canvas }) {
      canvas.toBlob(blob => {
        this.newLibraryAvatar = blob
      })
		}
  },
  created() {
    this.reader = new FileReader()
    this.reader.onload = (e) => {
      this.image = e.target.result;
    };
  }
};
</script>

<style scoped>
.cropper {
	max-height: 450px;
	background: #DDD;
}
</style>