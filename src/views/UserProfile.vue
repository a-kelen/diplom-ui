<template>
    <v-container fluid>
      <v-row>
        <v-col md="2">
          <v-avatar
            color="teal"
            size="180"
        >
            <img :src="avatar" v-if="avatar">
            <span v-else class="white--text text-h2">{{ profileAbrev }}</span>
        </v-avatar>
        </v-col>
        <v-col md="10">
          <v-row>
            <v-col>
              <v-sheet class="transparent d-flex align-center">
                <div><v-card-text class="py-2 px-0 text-h4">
                  {{ profile.username }}
                </v-card-text>
                <p class="body-2">
                  {{ profile.name }}
                </p></div>
                <v-btn
                  v-if="!ownProfile"
                  @click="follow" 
                  class="ml-auto" 
                  x-large
                  :color="followBtnColor"
                  :loading="loading"
                  >
                    {{ followBtnText }}
                  </v-btn>
              </v-sheet>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="py-2">
              <v-sheet class="transparent gap d-flex align-center">
                <v-chip>{{ profile.followersCount }} followers</v-chip>
                <!-- <v-chip>231 stars</v-chip> -->
                <v-chip>{{ componentsCount }} components</v-chip>
                <v-chip>{{ librariesCount }} libraries</v-chip>
                <report-bottom-sheet v-if="currentUser.username != profile.username" @submit="reportToUser"  :visibility.sync="reportSheet"/>
              </v-sheet>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field
          label="Search"
          placeholder="Input text"
          filled
          rounded
          dense
          v-model="searchQuery"

          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-tabs v-model="tab" grow>
            <v-tab href="#tab-1">Activities</v-tab>
            <v-tab href="#tab-2">Components ({{ componentsCount }})</v-tab>
            <v-tab href="#tab-3">Libraries ({{ librariesCount }})</v-tab>
          </v-tabs>
          <v-tabs-items class="transparent-body pa-3" v-model="tab">
            <v-tab-item background-opacity="0" value="tab-1">
              <activities-page :activities="activities"/>
            </v-tab-item>
            <v-tab-item value="tab-2">
               <components-page :components="profile.components"/>
            </v-tab-item>
            <v-tab-item value="tab-3">
              <libraries-page :libraries="profile.libraries"/>
            </v-tab-item>
          </v-tabs-items>
        </v-col>  
      </v-row>
    </v-container>
</template>

<script> 
import { mapState } from 'vuex'
import ReportBottomSheet from '../components/sheets/ReportBottomSheet.vue'
import ActivitiesPage from './ProfilePages/ActivitiesPage.vue'
import ComponentsPage from './ProfilePages/ComponentsPage.vue'
import LibrariesPage from './ProfilePages/LibrariesPage.vue'
import axios from '../store/axios'
export default {
  components: { ReportBottomSheet, LibrariesPage, ComponentsPage, ActivitiesPage },
  name: 'UserProfile',
  data: () => ({
    avatar: '',
    loading: false,
    reportSheet: false,
    tab: null,
        items: [
          'web', 'shopping', 'videos', 'images', 'news',
        ],
  }),
  methods: {
    fetch() {
      this.avatar = ''
      this.$store.dispatch('UserStore/getProfile', this.$route.params.username)
        .then(() => {
          if(this.profile.hasAvatar)
            this.getAvatar()
        })
    },
    
    follow() {
      this.loading = true
      this.$store.dispatch('UserStore/followUser', this.profile.username)
        .finally(() => {
          this.loading = false
        })
    },

    reportToUser(content) {
      this.$store.dispatch('UserStore/report', {
        username: this.profile.username,
        content
      }).then(() => {
        this.reportSheet = false
      })
    },

    getAvatar() {
      axios.get(`User/avatar/${this.profile.username}`, {
          responseType: 'blob'
      }).then(resp => {
          var reader = new FileReader()
          reader.readAsDataURL(resp.data)
          reader.onload = () => {
            this.avatar = reader.result
          }
        })
    }

  },

  computed: {
    ...mapState({
      profile: s => s.UserStore.activeProfile,
      currentUser: s => s.UserStore.user
      
    }),

    searchQuery: {
      get () {
        return this.$store.state.SearchStore.userProfileSearchQuery
      },
      set (value) {
        this.$store.commit('SearchStore/updateUserProfileSearchQuery', value)
      }
    },

    componentsCount() {
      return this.profile.components ? this.profile.components.length : 0
    },

    profileAbrev() {
      return this.profile.name ? this.profile.name[0] : ''
    },

    librariesCount() {
       return this.profile.libraries ? this.profile.libraries.length : 0
    },

    activities() {
      if(!this.profile.components)
        return null
      let arr = []
      this.profile.components.forEach(element => {
        arr.push({
          type: 'component',
          author: element.author,
          name: element.name || '',
          date: element.created,
          hasAvatar: this.profile.hasAvatar
        })
      })
      this.profile.libraries.forEach(element => {
        arr.push({
          type: 'library',
          author: element.author,
          name: element.name,
          date: element.created,
          hasAvatar: this.profile.hasAvatar
        })
      })

      arr = arr.sort((a, b) => {
          let d1 = new Date(a.date)
          let d2 = new Date(b.date)
          return d2 - d1
        })
      
      return arr
    },

    followBtnColor() {
      return this.profile.followed ? 'white' : 'primary'
    },

    followBtnText() {
      return this.profile.followed ? 'unfollow' : 'follow'
    },

    ownProfile() {
      return this.profile.username == this.currentUser.username
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
