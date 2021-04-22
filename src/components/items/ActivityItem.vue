<template>
  <v-container>
    
      <v-card  elevation="3" class="pa-3 block">
        <v-row class="d-flex align-center ma-0 flex-nowrap gap">
          <v-avatar
          color="green" 
          size="40"
          >
            <span class="white--text headline">AU</span>
          </v-avatar>
          <div class="text-body-1 text-truncate" >
            @{{ item.author }}
          </div>
        </v-row>

        <v-row class="d-flex ma-0 my-2">
            <span class="mx-2">Added new {{ item.type }}</span>
          
            <span>{{ item.name }}</span>
          
            <span class="ml-auto">{{ dateFormatted }}</span>
          
        </v-row>
      </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'Activityitem',
  props: ['item'],
  data: () => ({
    
  }),
  computed: {
    dateFormatted() {
      let date = new Date(this.item.date)
      return date.toLocaleDateString()
    }
  }
};
</script>
