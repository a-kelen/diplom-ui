<template>
    <v-container v-if="component">
      <v-row>
        <v-col>
          <v-row>
            <v-col class="pb-0">
              <v-sheet class="transparent d-flex gap align-center">
                <v-card-text class="text-h4">
                  {{ component.name }}
                </v-card-text>
                <v-chip label >{{ component.format }}</v-chip>
                <v-icon v-if="statusIcon">mdi-lock-outline</v-icon>
                <report-bottom-sheet v-if="!userIsOwner" @submit="reportToComponent" :visibility.sync="reportSheet"/>
              </v-sheet>
            </v-col>
          </v-row>

          <v-row > 
            <v-col class=" pl-6 py-0">
              <v-chip-group
                multiple
                v-if="componentIsIndepended"
              >
                <v-chip
                  v-for="label in component.labels"
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
                  {{ componentAuthor }}
                </v-card-text>
                <div 
                  v-if="componentIsIndepended"
                  class="text-body-1 mr-n4 primary--text"
                >
                  {{ component.likes }}
                </div>
                <v-btn 
                  v-if="componentIsIndepended" 
                  @click="like" 
                  :loading="likeBtnLoading" 
                  color="primary" 
                  icon
                >
                  <v-icon>{{ likeIcon }}</v-icon>
                </v-btn>
                <v-btn v-if="userIsOwner" color="primary" icon @click="changeEditMode">
                  <v-icon>mdi-pencil-outline</v-icon>
                </v-btn>
                <v-btn 
                  v-if="!userIsOwner && !component.owned && componentIsIndepended"
                  @click="getOwn"
                  :loading="getOwnBtnLoading"
                  :color="getOwnBtnColor"
                >
                  {{ getOwnBtnText }}
                </v-btn>
                <div class="title teal--text text--darken-3" v-if="component.owned">
                  Owned
                </div>
              </v-sheet>
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-card class="px-2">
            <v-tabs v-model="tab" grow>
              <v-tab href="#tab-1">Description</v-tab>
              <v-tab v-show="component.events.length" href="#tab-2">Events</v-tab>
              <v-tab v-show="component.props.length" href="#tab-3">Props</v-tab>
              <v-tab v-show="component.slots.length" href="#tab-4">Slots</v-tab>
              <v-tab v-show="component.dependencies" href="#tab-5">Dependencies</v-tab>
            </v-tabs>
            <v-tabs-items class="transparent-body" v-model="tab">
              <v-tab-item background-opacity="0" value="tab-1">
                <Editor 
                  mode="viewer"
                  v-model="component.description"
                />
              </v-tab-item>
              <v-tab-item  value="tab-2">
                <component-field-item
                  v-for="(e, i) in component.events" 
                  :key="i"
                  :item="e"
                  :isLast="component.events.length - 1 == i"/>
              </v-tab-item>
              <v-tab-item value="tab-3">
                <component-field-item
                  v-for="(p, i) in component.props" 
                  :key="i"
                  :item="p"
                  :isLast="component.props.length - 1 == i"/>
              </v-tab-item>
              <v-tab-item value="tab-4">
                <component-field-item
                  v-for="(s, i) in component.slots" 
                  :key="i"
                  :item="s"
                  :isLast="component.slots.length - 1 == i"/>
              </v-tab-item>
              <v-tab-item value="tab-5" class="py-3 px-7">
                <div v-for="line in dependencies" :key="line"> {{ line }}</div>
              </v-tab-item>
            </v-tabs-items>
          </v-card>
        </v-col>
      </v-row>
      <v-dialog
        v-if="editMode"
        v-model="editMode"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition">
        <v-card>
          <v-toolbar
            dark
            color="primary"
          >
            <v-btn
              icon
              dark
              @click="closeUpdateDialog"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>Edit component</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn
                dark
                icon
                @click="saveChanges"
                :loading="saveLoading"
              >
                <v-icon>mdi-content-save</v-icon>
              </v-btn>
            </v-toolbar-items>
          </v-toolbar>
          <edit-component :component="cloneComponent" class="py-10"/>
        </v-card>
      </v-dialog>

      <v-dialog
        v-model="agreeDialog"
        persistent
        max-width="290"
      >
        <v-card>
          <v-card-title class="headline">
            Discharge changes?
          </v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="green darken-1"
              text
              @click="agreeDialog = false"
            >
              No
            </v-btn>
            <v-btn
              color="green darken-1"
              text
              @click="dischargeUpdates"
            >
              Yes
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
</template>

<script>
import clone from '../utils/clone'
import compare from '../utils/compare'
import EditComponent from '../components/dialogs/EditComponent.vue'
import { Editor } from 'vuetify-markdown-editor'
import ReportBottomSheet from '../components/sheets/ReportBottomSheet.vue'
import { mapState } from 'vuex'
import ComponentFieldItem from '../components/items/ComponentFieldItem.vue'
export default {
  name: 'ComponentPage',
  components: {
    Editor,
    EditComponent,
    ReportBottomSheet,
    ComponentFieldItem
  },
  data: () => ({
    tab: 'tab-1',
    editMode: false,
    reportSheet: false,
    likeBtnLoading: false,
    saveLoading: false,
    agreeDialog: false,
    getOwnBtnLoading: false,
    cloneComponent: null
  }),
  watch: {
    component() {
      this.cloneComponent = clone(this.component)
    }
  },
  computed: {
    ...mapState({
      component: s => s.ComponentStore.activeComponent,
      user: s => s.UserStore.user
    }),

    statusIcon() {
      return this.component.status == 'Private' && this.componentIsIndepended
    },

    likeIcon() {
      return this.component.liked ? 'mdi-heart' : 'mdi-heart-outline'
    },

    getOwnBtnText() {
      return this.component.owned ? 'Owned' : 'Get'
    },

    getOwnBtnColor() {
      return this.component.owned ? 'white' : 'primary'
    },

    userIsOwner() {
      return this.component?.author == this.user.username || this.component.library?.author == this.user.username
    },

    componentAuthor() {
      return this.component.library != null ? `From library: ${this.component.library.name }` : `Author: ${this.component.author}`
    },

    componentIsIndepended() {
      return this.component.library == null
    },

    dependencies() {
      return this.component.dependencies?.split('\n')
    }
  },
  methods: {
    fetch() {
      let params = {}
      if(this.$route.name === 'ComponentPage')
        params = { dependent: false, name: this.$route.params.name, owner: this.$route.params.author}
      if(this.$route.name === 'LibComponentPage')
        params = { dependent: true, name: this.$route.params.name, owner: this.$route.params.libname}

      this.$store.dispatch('ComponentStore/getComponent', params)
    },

    like() {
      this.likeBtnLoading = true
      this.$store.dispatch('ComponentStore/like')
        .then(() => this.likeBtnLoading = false)
    },

    getOwn() {
      this.getOwnLoading = true
      this.$store.dispatch('ComponentStore/getOwn')
        .then(() => this.getOwnLoading = false)
    },

    changeEditMode() {
      this.editMode = !this.editMode
    },

    closeUpdateDialog() {
      if(!compare(this.component, this.cloneComponent))
        this.agreeDialog = true
      else
        this.editMode = false
    },

    saveChanges() {
      this.saveLoading = true

      let payload = {
        id: this.cloneComponent.id,
        description: this.cloneComponent.description,
        status: this.cloneComponent.status == 'Public',
        dependencies: this.cloneComponent.dependencies,
        events: this.cloneComponent.events,
        props: this.cloneComponent.props,
      }
      this.$store.dispatch('ComponentStore/updateComponent', payload)
        .then(() => {
          this.editMode = false
          this.saveLoading = false
          this.component.description = clone(this.cloneComponent.description)
          this.component.status = clone(this.cloneComponent.status)
          this.component.dependencies = clone(this.cloneComponent.dependencies)
          this.component.events = clone(this.cloneComponent.events)
          this.component.props = clone(this.cloneComponent.props)
        })
        .catch(() => {
          this.saveLoading = false
        })
    },

    dischargeUpdates() {
      this.cloneComponent = clone(this.component)
      this.editMode = false
      this.agreeDialog = false
    },

    reportToComponent(content) {
      this.$store.dispatch('ComponentStore/report', {
        id: this.component.id,
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

</style>
