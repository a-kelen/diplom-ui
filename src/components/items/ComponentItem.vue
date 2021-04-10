<template>
  <v-container>
    <v-sheet elevation="3" class="px-3">
      <router-link :to="{ name: 'ComponentPage', params: {id: component.id} }">
        <v-row>
          <v-col md="auto">
            <v-tooltip top nudge-top :position-y="100">
              <template v-slot:activator="{ on, attrs }">
                <div class="text-h5 text-truncate" v-bind="attrs"
                  v-on="on">Component</div>
              </template>
              <span>Component</span>
            </v-tooltip>
          </v-col>
        </v-row>

        <v-row>
          <v-col md="auto">
            <v-chip
              label
              dark
              small
              class="green"
            >Format</v-chip>
          </v-col>
          <v-col>
            <v-icon v-if="status" class="my-1" small>mdi-lock-outline</v-icon> 
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <div class="grey--text text--darken-1">{{ component.author }}</div>
          </v-col>
          <v-spacer></v-spacer>
          <v-col md="2">
            <!-- <v-rating
              v-model="rating"
              background-color="purple lighten-3"
              color="green"
              small
            ></v-rating> -->
            <v-layout row wrap class="mt-0">
              {{component.likes}}
              <v-icon small color="primary">mdi-heart</v-icon>
            </v-layout>
          </v-col>
        </v-row>
      </router-link>
    </v-sheet>
  </v-container>
</template>

<script>
export default {
  name: 'ComponentItem',
  props: ['component'],
  data: () => ({
    rating: 4.5
  }),
  computed: {
    status() {
      if(this.component.status == 'Private')
        return true
      else 
        return false
    }
  },
}
</script>
