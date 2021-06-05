<template>
    
  <v-card  elevation="3" class="pa-3 block">
    <router-link :to="link">
      <v-row class="d-flex align-center ma-0 flex-nowrap gap">
        <v-avatar
          color="teal"
          size="40"
        >
          <img :src="avatar" v-if="avatar">
          <span v-else class="white--text headline">{{ item.author[0] }}</span>
        </v-avatar>
        <div class="text-body-1 text-truncate" >
          @{{ item.author }}
        </div>
        <v-chip
          small
          label
          text-color="white"
          class="ml-auto primary"
        >
          NEW
        </v-chip>
      </v-row>

      <v-row class="d-flex ma-0 my-2">
          <v-chip
              small
              label
              text-color="white"
              class="mr-3 grey"
            >
              {{ item.type }} 
            </v-chip>

          <span>{{ item.name }}</span>
        
          <span class="ml-auto">{{ dateFormatted }}</span>
        
      </v-row>
    </router-link>
  </v-card>
</template>

<script>
import axios from '../../store/axios'

export default {
  name: 'Activityitem',
  props: ['item'],
  data: () => ({
    avatar: ''
  }),
  computed: {
    dateFormatted() {
      let date = new Date(this.item.date)
      return date.toLocaleDateString()
    },
    link() {
      let path = this.item.type === 'library' ? 'LibraryPage' : 'ComponentPage'
      return { name: path, params: {author: this.item.author, name: this.item.name} }
    }
  },

  methods: {
    getAvatar() {
      axios.get(`User/avatar/${this.item.author}`, {
          responseType: 'blob'
      }).then(resp => {
        var reader = new FileReader()
        reader.readAsDataURL(resp.data)
        reader.onload = () => {
            this.avatar = reader.result
        }
      }).catch(() => {

      })
    }
  },
  created() {
    if(this.item.hasAvatar)
      this.getAvatar()
  }
};
</script>
