<template>
  <v-container>
    <v-sheet elevation="5" class="pa-3">
      <v-row class="mt-1">
        <v-col md="2">
            <v-avatar
            color="green"
            size="40"
            tile
            >
                <span class="white--text headline">LIB</span>
            </v-avatar>
        </v-col>
        <v-col md="auto">
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
               <div class="text-h5 text-truncate" v-bind="attrs"
                v-on="on">Title DFG</div>
            </template>
            <span>Title DFG assdsdfsdfsdfsasdwerw </span>
          </v-tooltip>         
        </v-col>
      </v-row>
      <v-row>
        <v-col md="auto">
          <v-chip
            dark
            class="green"
          >12 components</v-chip>
        </v-col>
        <v-col md="auto">
            <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                    <v-icon v-bind="attrs"
                        v-on="on" class="my-1">
                        mdi-library
                    </v-icon> 
                </template>
                <span>Library</span>
            </v-tooltip>      
          
        </v-col>
        <v-col>
          <v-icon class="my-1">mdi-lock-outline</v-icon> 
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <div class="grey--text pa-1 text--darken-1">author-a</div>
        </v-col>
        <v-col>
          <v-rating
            v-model="rating"
            background-color="purple lighten-3"
            color="green"
            small
          ></v-rating>
        </v-col>
      </v-row>
    </v-sheet>
  </v-container>
</template>

<script>
export default {
  name: "LibraryItem",
  data: () => ({
    rating: 4.5
  }),
  props: ['library']
};
</script>
