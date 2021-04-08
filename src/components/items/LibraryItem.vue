<template>
  <v-container>
    <v-sheet elevation="3" class="px-3">
      <router-link :to="{ name: 'LibraryPage', params: {author: library.author, name: library.name} }">
        <v-row>
          <v-col md="2">
              <v-avatar
              color="green"
              size="40"
              rounded
              >
                <img
                :src="avatar"
                v-if="avatar"
              >
              <span v-else class="white--text headline">{{ library.name[0] }}</span>
            </v-avatar>
          </v-col>
          <v-col md="auto">
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <div class=" text-h6 text-truncate" v-bind="attrs"
                  v-on="on">{{ library.name }}</div>
              </template>
              <span>{{ library.name }}</span>
            </v-tooltip>         
          </v-col>
        </v-row>
        <v-row>
          <v-col md="auto">
            <v-chip
              
              small
              label
              text-color="white"
              class="primary"
            >{{ componentsCount }} components</v-chip>
          </v-col>
          <v-col md="auto">
              <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                      <v-icon v-bind="attrs"
                        v-on="on" class="my-1"
                        small
                      >
                        mdi-library
                      </v-icon> 
                  </template>
                  <span>Library</span>
              </v-tooltip>      
            
          </v-col>
          <v-col>
            <v-icon v-if="status" small class="my-1">mdi-lock-outline</v-icon> 
          </v-col>
        </v-row>
        <v-row class="">
          <v-col>
            <router-link :to="{ name: 'UserProfile', params: {username: library.author} }">
              <div class="grey--text text-body-2 text--darken-2">{{ library.author }}</div>
            </router-link>
          </v-col>
          <v-spacer></v-spacer>
          <v-col md="2">
            <!-- <v-rating
              v-model="rating"
              background-color="purple lighten-3"
              color="green"
              small
            ></v-rating> -->
            <v-layout row class="mt-0">
              <div :class="textColor">{{ library.likes }}</div>
              <v-icon small :color="color">mdi-heart</v-icon>
            </v-layout>
          </v-col>
        </v-row>
      </router-link>
    </v-sheet>
  </v-container>
</template>

<script>
import axios from '../../store/axios';
export default {
  name: 'LibraryItem',
  data: () => ({
    rating: 4.5,
    avatar: ''
  }),
  computed: {
    componentsCount() {
      return this.library.componentsCount
    },
    status() {
      if(this.library.status == 'Private')
        return true
      else 
        return false
    },
    color() {
      return this.library.liked ? 'primary' : 'grey'
    },
    textColor() {
      return this.library.liked ? 'primary--text' : 'grey--text'
    }
  },
  props: ['library'],
  methods: {
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
    }
  },
  created() {
    if(this.library.hasAvatar)
      this.getAvatar()
  }
}
</script>
