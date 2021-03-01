<template>
    <v-container>
      <v-row>
        <v-col md="2">
          <v-avatar
            size="150"
            color="teal"
            tile
          >
            RR
          </v-avatar>
        </v-col>
        <v-col md="10">
          <v-row>
            <v-col>
              <v-sheet class="transparent d-flex align-center">
                <v-card-text class="text-h4">
                  {{ library.name }}
                </v-card-text>
                <v-rating class="ml-auto"></v-rating>
              </v-sheet>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-sheet class="transparent gap d-flex align-center">
                <v-card-text>
                  {{ library.author }}
                </v-card-text>
                <v-btn @click="like" :loading="likeBtnLoading" color="primary" icon>
                  <v-icon>{{ likeIcon }}</v-icon>
                </v-btn>
                <v-btn color="primary" icon>
                  <v-icon>mdi-download-outline</v-icon>
                </v-btn>
               <v-btn 
                  v-if="!userIsOwner"
                  @click="getOwn" 
                  :color="getOwnBtnColor"
                  >
                    {{ getOwnBtnText }}
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
              <v-tab href="#tab-3">Dependencies</v-tab>
            </v-tabs>
            <v-tabs-items class="transparent-body" v-model="tab">
              <v-tab-item background-opacity="0" value="tab-1">
                {{ library.description }}
              </v-tab-item>
              <v-tab-item value="tab-2">
                  <component-row v-for="(c, i) in library.components" :key="i" :component="c" />
              </v-tab-item>
              <v-tab-item value="tab-3">
                sdfsdfsdf
              </v-tab-item>
            </v-tabs-items>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
</template>

<script>
import ComponentRow from '../components/items/ComponentRow.vue'
import { mapState } from 'vuex'
export default {
  name: "Library",
  components: {
    ComponentRow
  },
  data: () => ({
    tab: 'tab-1',
    likeBtnLoading: false,
    getOwnBtnLoading: false
  }),
  computed: {
    ...mapState({
      library: s => s.LibraryStore.activeLibrary,
      user: s => s.UserStore.user
    }),
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
    }
  },
  methods: {
    fetch() {
      this.$store.dispatch('LibraryStore/getLibrary', this.$route.params.id)
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
.transparent-body {
  background: transparent
}
</style>
