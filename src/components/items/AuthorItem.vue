<template>
  <v-container>
    <router-link :to="{ name: 'UserProfile', params: { username: author.username } }">
      <v-sheet min-width="250" elevation="3" class="pa-2">
        <v-row class="d-flex align-center ma-0 mb-2 flex-nowrap gap">
          
              <v-avatar
              color="green" 
              size="40"
              >
                  <span class="white--text headline">AU</span>
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
        <v-row>
          <v-col md="auto">
            <v-chip
              dark
              class="green"
            >{{ author.libraryCount + author.componentCount }} elements</v-chip>
          </v-col>
          <v-col md="auto">
              <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                      <v-icon v-bind="attrs"
                          v-on="on" class="my-1">
                          mdi-account-outline
                      </v-icon> 
                  </template>
                  <span>User</span>
              </v-tooltip>      
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <div class="grey--text  pa-1 text-body-1 text--darken-1">{{ author.username }}</div>
          </v-col>
          <v-spacer/>
          <v-col md="auto">
            <div class="grey--text text-h6 text--darken-3">212 
                <v-icon class="mb-1">mdi-face</v-icon>
              </div>
          </v-col>
        </v-row>
      </v-sheet>
    </router-link>
  </v-container>
</template>

<script>
export default {
  name: 'AuthorItem',
  props: ['author'],
  data: () => ({
    rating: 4.5
  })
};
</script>
