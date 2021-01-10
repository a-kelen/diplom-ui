<template>
  <v-container>
    <v-sheet elevation="5" class="pa-3">
      <v-row>
        <v-col md="auto">
          <v-tooltip top nudge-top>
            <template v-slot:activator="{ on, attrs }">
               <div class="text-h5 text-truncate" v-bind="attrs"
                v-on="on">Title </div>
            </template>
            <span>Title DFG assdsdfsdfsdfsasdwerw </span>
          </v-tooltip>
         
        </v-col>
      </v-row>
      <v-row>
        <v-col md="auto">
          <v-chip
            label
            dark
            class="green"
          >Format</v-chip>
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
  name: "ComponentItem",
  data: () => ({
    rating: 4.5
  })
};
</script>
