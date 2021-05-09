<template>
  <v-container>
    <router-link :to="{ name: 'UserProfile', params: { username: user.username } }">
      <v-sheet max-width="500px" elevation="3" class="d-flex align-center pa-2">
        <v-avatar
            color="green"
            size="40"
        >
            <img :src="avatar" v-if="avatar">
            <span v-else class="white--text headline">{{ user.name[0] }}</span>
        </v-avatar>
        <span class="mx-3">{{ user.name }}</span>
        <span class="ml-auto text-body-1 grey--text">@{{user.username}}</span>
      </v-sheet>
    </router-link>
  </v-container>
</template>

<script>
import axios from '../../store/axios'

export default {
    name: 'SubscriptionItem',
    props: ['user'],
    data: () => ({
        avatar: ''
    }),

    methods: {
        getAvatar() {
        axios.get(`User/avatar/${this.user.username}`, {
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
        if(this.user.hasAvatar)
            this.getAvatar()
    }
};
</script>
