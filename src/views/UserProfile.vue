<template>
    <v-container fluid>
      <v-row>
        <v-col md="2">
          <v-avatar
            size="180"
            color="teal"
          >
            RR
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
                <v-chip>129 followers</v-chip>
                <v-chip>231 stars</v-chip>
                <v-chip>{{ componentsCount }} components</v-chip>
                <v-chip>{{ librariesCount }} libraries</v-chip>
              </v-sheet>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
</template>

<script> 
import { mapState } from 'vuex'
export default {
  name: 'UserProfile',
  data: () => ({
    loading: false
  }),
  methods: {
    fetch() {
      this.$store.dispatch('UserStore/getProfile', this.$route.params.username)
    },
    follow() {
      this.loading = true
      this.$store.dispatch('UserStore/followUser', this.profile.username)
        .then(() => {
          this.loading = false
        })
    }
  },
  computed: {
    ...mapState({
      profile: s => s.UserStore.activeProfile
    }),
    componentsCount() {
      return this.profile.components ? this.profile.components.length : 0
    },
    librariesCount() {
       return this.profile.libraries ? this.profile.libraries.length : 0
    },
    followBtnColor() {
      return this.profile.followed ? 'white' : 'primary'
    },
    followBtnText() {
      return this.profile.followed ? 'unfollow' : 'follow'
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

</style>
