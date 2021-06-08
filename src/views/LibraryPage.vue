<template>
  <v-container>
    <v-row>
      <v-col md="2">
        <v-hover v-slot:default="{ hover }" :disabled="!editMode">
          <v-avatar
            rounded
            size="150"
            color="primary"
          >
            <v-img
              :src="avatar"
              v-if="avatar"
            >
              <v-container class="d-flex">
                <v-row align="center" justify="center">
                  <library-avatar-dialog @saveAvatar="saveAvatar" v-if="editMode" :hover="hover"/>
                </v-row>
              </v-container>
            
            </v-img>
            <library-avatar-dialog @saveAvatar="saveAvatar" v-if="editMode && !avatar" :hover="hover"/>
          </v-avatar>
        </v-hover>
      </v-col>
      <v-col md="10">
        <v-row>
          <v-col>
            <v-sheet class="transparent d-flex gap align-center">
              <v-card-text class="text-h4">
                {{ library.name }}
              </v-card-text>
              <!-- <v-rating class="ml-auto"></v-rating> -->
              <v-switch
                v-if="editMode"
                v-model="savedStatus"
                :label="libraryStatus"                
            ></v-switch>
              <v-icon class="" v-if="!statusIcon && !editMode">mdi-lock-outline</v-icon>
              <report-bottom-sheet v-if="!userIsOwner" @submit="reportToLibrary"  :visibility.sync="reportSheet"/>
            </v-sheet>
          </v-col>
        </v-row>

        <v-row > 
          <v-col class=" pl-6 py-0">
            <v-chip-group
              multiple
            >
              <v-chip
                v-for="label in library.labels"
                :key="label"
                small
              >
                {{ label }}
              </v-chip>
            </v-chip-group>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-sheet class="transparent gap d-flex align-center">
              <v-card-text>
                {{ library.author }}
              </v-card-text>
              <div class="text-body-1 mr-n4 primary--text">{{ library.likes }}</div>
              <v-btn @click="like" :loading="likeBtnLoading" color="primary" icon>
                <v-icon>{{ likeIcon }}</v-icon>
              </v-btn>
              <!-- <v-btn :href="downloadHref" color="primary" icon>
                <v-icon>mdi-download-outline</v-icon>
              </v-btn> -->
              <v-btn 
                v-if="!userIsOwner && !library.owned"
                @click="getOwn"
                :loading="getOwnBtnLoading"
                :color="getOwnBtnColor"
              >
                {{ getOwnBtnText }}
              </v-btn>
              <div class="title teal--text text--darken-3" v-if="library.owned">
                Owned
              </div>
              <v-btn v-if="userIsOwner" color="primary" icon @click="changeEditMode">
                <v-icon>{{ editButtonIcon }}</v-icon>
              </v-btn>
              <v-btn v-if="isChanged" color="primary" :loading="saveLoading" @click="saveChanges" icon>
                <v-icon>mdi-content-save-outline</v-icon>
              </v-btn>
            </v-sheet>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-row>
      <v-col offset="2" >
        <v-card class="px-2">
          <v-tabs v-model="tab" grow>
            <v-tab href="#tab-1">Description</v-tab>
            <v-tab href="#tab-2">Components</v-tab>
            <!-- <v-tab href="#tab-3">Dependencies</v-tab> -->
          </v-tabs>
          <v-tabs-items class="transparent-body" v-model="tab">
            <v-tab-item background-opacity="0" value="tab-1">
              <Editor 
                :mode="editMode ? 'preview' : 'viewer'"
                v-model="library.description"
              />
            </v-tab-item>
            <v-tab-item value="tab-2">
                <component-row v-for="(c, i) in library.components" :key="i" :component="c" :libname="library.name" />
            </v-tab-item>
            <v-tab-item value="tab-3">
              sdfsdfsdf
            </v-tab-item>
          </v-tabs-items>
        </v-card>
      </v-col>
    </v-row>

    <default-snakbar :snackbar.sync="snackbarShow" :text="snackbarText"/>
  </v-container>
</template>

<script>
import ComponentRow from '../components/items/ComponentRow.vue'
import { Editor } from 'vuetify-markdown-editor'
import { mapState } from 'vuex'
import DefaultSnakbar from '../components/snackbars/DefaultSnakbar.vue'
import LibraryAvatarDialog from '../components/dialogs/LibraryAvatarDialog.vue'
import ReportBottomSheet from '../components/sheets/ReportBottomSheet.vue'
import axios from '../store/axios'
export default {
  name: 'Library',
  components: {
    ComponentRow,
    Editor,
    DefaultSnakbar,
    LibraryAvatarDialog,
    ReportBottomSheet
  },
  data: () => ({
    tab: 'tab-1',
    avatar: '',
    editMode: false,
    reportSheet: false,
    savedDescription: '',
    savedStatus: null,
    saveLoading: false,
    likeBtnLoading: false,
    snackbarShow: false,
    snackbarText: 'Library updated successfully',
    getOwnBtnLoading: false
  }),

  computed: {
    ...mapState({
      library: s => s.LibraryStore.activeLibrary,
      user: s => s.UserStore.user
    }),

    statusIcon() {
      return this.library.status == 'Public'
    },

    libraryStatus() {
      return this.savedStatus ? 'Public' : 'Private'
    },

    likeIcon() {
      return this.library.liked ? 'mdi-heart' : 'mdi-heart-outline'
    },

    getOwnBtnText() {
      return this.library.owned ? 'Owned' : 'Get'
    },

    getOwnBtnColor() {
      return this.library.owned ? 'white' : 'primary'
    },

    userIsOwner() {
      return this.library.author == this.user.username
    },

    libraryDescription() {
      return this.library.description
    },

    isChanged() {
      return this.savedDescription != this.library.description || this.savedStatus != this.statusIcon
    },

    editButtonIcon() {
      return this.editMode ? 'mdi-pencil' : 'mdi-pencil-outline'
    }
  },
  watch: {
    library() {
      this.savedDescription = this.library.description
      this.savedStatus = this.library.status == 'Public'
      this.editMode = false
      if(this.library.hasAvatar)
        this.getAvatar()
      else 
        this.avatar = null
      
    },
    
    libraryDescription() {
      if(this.savedDescription == '') 
        this.savedDescription = this.library.description
        this.savedStatus = this.library.s
    },

    
  },
  
  methods: {
    fetch() {
      let payload = {
        author: this.$route.params.author,
        name: this.$route.params.name
      }
      this.$store.dispatch('LibraryStore/getLibrary', payload)
        .then(() => {
          this.savedDescription = this.library.description 
          this.savedStatus = this.library.status == 'Public'
        })
    },

    saveAvatar(canvas) {
      canvas.toBlob(blob => {
        this.$store.dispatch('LibraryStore/saveAvatar', { libraryId: this.library.id,  blob: blob })
          .then(() => {
            this.getAvatar()
          })
      })
    },

    getAvatar() {
      axios.get(`Library/avatar/${this.library.id}`, {
          responseType: 'blob'
      }).then(resp => {
          var reader = new FileReader()
          reader.readAsDataURL(resp.data)
          reader.onload = () => {
            this.avatar = reader.result
          }
        })
    },

    like() {
      this.likeBtnLoading = true
      this.$store.dispatch('LibraryStore/like')
        .then(() => this.likeBtnLoading = false)
    },

    getOwn() {
      this.getOwnLoading = true
      this.$store.dispatch('LibraryStore/getOwn')
        .then(() => this.getOwnLoading = false)
    },

    changeEditMode() {
      this.editMode = !this.editMode
    },

    saveChanges() {
      let payload = {
        id: this.library.id,
        description: this.library.description,
        status: this.savedStatus
      }
      this.saveLoading = true
      this.$store.dispatch('LibraryStore/updateLibrary', payload)
        .then(() => {
          this.savedDescription = payload.description
          this.library.status = this.libraryStatus
          this.snackbarShow = true
          this.saveLoading = false
          this.editMode = false
        })
        .catch(() => {
          this.library.description = this.savedDescription
          
          this.saveLoading = false
        })
    },

    reportToLibrary(content) {
      this.$store.dispatch('LibraryStore/report', {
        id: this.library.id,
        content
      }).then(() => {
        this.reportSheet = false
      })
    }
  },
  
  beforeRouteUpdate (to, from, next) {
      this.fetch()  
      next()
  },
  beforeRouteEnter (to, from, next) {
      next(vm => vm.fetch())
  },
};
</script>

<style scoped>
.gap {
  gap: 1rem;
}
.max {
  max-width: 150px;
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

.breakFlexRow {
  flex-basis: 100%;
  height: 0;
}
</style>
