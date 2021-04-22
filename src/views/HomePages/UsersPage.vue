<template>
  <v-container class="pa-0 ma-0">
    <v-row>
        <div class="custom-grid">
            <author-item v-for="author in users" :key="author.username" :author="author"/>
        </div>
    </v-row>
  </v-container>
</template>

<script>
import AuthorItem from '../../components/items/AuthorItem.vue'
export default {
  components: { AuthorItem },
  name: 'UsersPage',
  data: () => ({
    
  }),
  props: ['users'],

};
</script>
