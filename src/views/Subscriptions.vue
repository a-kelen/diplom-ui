<template>
<v-container>
    <subscription-item v-for="user in users" :key="user.username" :user="user"/>
</v-container>
</template>
  

<script>
import { mapState } from 'vuex';
import SubscriptionItem from '../components/items/SubscriptionItem.vue';

export default {
    name: 'Subscriptions',
    components: {
        SubscriptionItem
    },
    data: () => ({  

    }),
    
    computed: {
        ...mapState({
            users: s => s.UserStore.followedUsers
        })
    },

    methods: {

    },
    created() {
        this.$store.dispatch('UserStore/getFollowedUsers')
    }
};
</script>
