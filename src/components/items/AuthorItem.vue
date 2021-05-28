<template>
  <v-card elevation="3" max-width="500px" class="pa-2">
    <router-link :to="{ name: 'UserProfile', params: { username: author.username } }">
        <v-row class="d-flex align-center ma-0 mb-2 flex-nowrap gap">
          <v-avatar
            color="green"
            size="40"
          >
            <img :src="avatar" v-if="avatar">
            <span v-else class="white--text headline">{{ author.name[0] }}</span>
          </v-avatar>
        
          <v-tooltip top nudge-top>
            <template v-slot:activator="{ on, attrs }">
                <div class="text-subtitle-1 text-truncate" v-bind="attrs" v-on="on">
                  {{ author.name }}
                </div>
            </template>
            <span>{{ author.name }}</span>
          </v-tooltip>         
        </v-row>

        <v-row class="d-flex ma-1">
          <v-chip
            dark
            class="green"
          >{{ author.libraryCount + author.componentCount }} elements</v-chip>
      
            <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                    <v-icon v-bind="attrs"
                      v-on="on" class="mx-2">
                        mdi-account-outline
                    </v-icon> 
                </template>
                <span>User</span>
            </v-tooltip>      

        </v-row>
        <v-row>
          <v-col>
            <div class="grey--text  pa-1 text-body-1 text--darken-1">{{ author.username }}</div>
          </v-col>
          <v-spacer/>
          <v-col md="auto">
            <div class="grey--text text-h6 text--darken-3">{{author.followerCount}} 
                <v-icon class="mb-1">mdi-face</v-icon>
              </div>
          </v-col>
        </v-row>
    </router-link>
  </v-card>
</template>

<script>
import axios from '../../store/axios'

export default {
  name: 'AuthorItem',
  props: ['author'],
  data: () => ({
    avatar: ''
  }),
  methods: {
        getAvatar() {
        axios.get(`User/avatar/${this.author.username}`, {
            responseType: 'blob'
        }).then(resp => {
            var reader = new FileReader()
            reader.readAsDataURL(resp.data)
            reader.onload = () => {
                this.avatar = reader.result
            }
            })
            .catch(() => {

            })
        }
    },
    created() {
        if(this.author.hasAvatar)
            this.getAvatar()
    }
};
</script>
