<template>
  <div>
    <v-card elevation="3" max-width="500px" class="pa-3">
      <router-link :to="{ name: 'LibraryPage', params: {author: library.author, name: library.name} }">
        <v-row class="">
          <v-layout class="d-flex ma-3 gap">
            <v-avatar
              color="green"
              size="40"
              rounded
            >
              <img :src="avatar" v-if="avatar">
              <span v-else class="white--text headline">{{ library.name[0] }}</span>
            </v-avatar>
          
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <div class=" text-h6 text-truncate" v-bind="attrs"
                  v-on="on">{{ library.name }}</div>
              </template>
              <span>{{ library.name }}</span>
            </v-tooltip>         
          </v-layout>
        </v-row>
        <v-row>
          <v-col class="d-flex">
            <v-chip
              small
              label
              text-color="white"
              class="primary"
            >
              {{ componentsCount }} components
            </v-chip>
            <v-tooltip  bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon v-bind="attrs"
                    v-on="on" class="mx-2 "
                    small
                  >
                    mdi-library
                  </v-icon> 
                </template>
                <span>Library</span>
            </v-tooltip>      
            <v-icon v-if="status" small class="my-1">mdi-lock-outline</v-icon> 
          </v-col>
        </v-row>

        <v-row > 
          <v-col class="px-3 py-0">
            <v-chip-group
              multiple
            >
              <v-chip
                v-for="label in library.labels"
                :key="label"
                x-small
              >
                {{ label }}
              </v-chip>
            </v-chip-group>
          </v-col>
        </v-row>

        <v-row>
          <v-col class="d-flex">
            <router-link :to="{ name: 'UserProfile', params: {username: library.author} }" >
              <div class=" grey--text text-body-2 text--darken-2">{{ library.author }}</div>
            </router-link>
              <div class="ml-auto" :class="textColor">{{ library.likes }}</div>
              <v-icon class="ml-1" small :color="color">mdi-heart</v-icon>
          </v-col>
        </v-row>
      </router-link>
    </v-card>
  </div>
</template>

<script>
import axios from '../../store/axios'
export default {
  name: 'LibraryItem',
  props: ['library'],
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
