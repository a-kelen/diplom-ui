<template>
  <v-dialog
    v-model="dialog"
    persistent
    max-width="500"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn 
        color="tranparent" 
        icon 
        v-bind="attrs"
        v-on="on">
          <v-icon :class="{ 'on-hover': hover }" class="icon" color="white">mdi-camera</v-icon>
      </v-btn>
    </template>
      <v-sheet class="pa-5">
        <v-file-input
          label="Avatar input"
          filled
          dense
          prepend-icon=""
          append-outer-icon="mdi-camera"
          v-model="avatarFile"
        ></v-file-input>
        
        <cropper
          ref="cropper"
          class="cropper mb-3"
          :src="image"
          :stencil-props="{
          aspectRatio: 1/1
          }"
          default-boundaries="fill"
          priority="visibleArea"
        />

        <v-btn
          color="green darken-1"
          text
          @click="dialog = false"
        >
          Close
        </v-btn>

        <v-btn
          color="green darken-1"
          text
          v-if="image != null"
          @click="changeAvatar"
        >
          Update
        </v-btn>

      </v-sheet>
    </v-dialog>
</template>

<script>
import { Cropper } from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css'
export default {
  name: 'LibraryAvatarDialog',
  props: ['hover'],
  components: {
      Cropper
  },

  data () {
    return {
      dialog: false,
      avatarFile: null,
      image: null,
      reader: null
    }
  },

  methods: {
    changeAvatar() {
      const { canvas } = this.$refs.cropper.getResult()
      this.$emit('saveAvatar', canvas)
      this.dialog = false
    }
  },

  created() {
    this.reader = new FileReader()
    this.reader.onload = (e) => {
      this.image = e.target.result;
    };
  },

  watch: {
    avatarFile() {
      if(this.avatarFile)
        this.reader.readAsDataURL(this.avatarFile);
    }
  },
}
</script>

<style scoped>
.cropper {
	max-height: 450px;
	background: #DDD;
}
.transparent-body {
  background: transparent
}
.icon {
  transition: opacity .4s ease-in-out;
}

.icon:not(.on-hover) {
  opacity: 0;
 }
</style>
