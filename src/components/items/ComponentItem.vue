<template>
    <v-sheet elevation="3" class="pa-3">
      <router-link :to="link">
        <v-row>
          <v-col md="auto">
            <v-tooltip top nudge-top :position-y="100">
              <template v-slot:activator="{ on, attrs }">
                <div class="text-h5 text-truncate" v-bind="attrs"
                  v-on="on">{{ component.name }}</div>
              </template>
              <span>{{ component.name }}</span>
            </v-tooltip>
          </v-col>
        </v-row>

        <v-row>
          <v-col class="d-flex">
            <v-chip
              label
              dark
              small
              class="green"
            >{{ component.format }}</v-chip>
            <v-icon v-if="status" class="mx-2" small>mdi-lock-outline</v-icon> 
          </v-col>
        </v-row>
        <v-row > 
          <v-col class="px-3 py-0">
            <v-chip-group
              multiple
            >
              <v-chip
                v-for="label in component.labels"
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
              <div class=" grey--text text-body-2 text--darken-2">{{ component.author }}</div>
              <div class="ml-auto" :class="textColor">{{ component.likes  }}</div>
              <v-icon class="ml-1" small :color="color">mdi-heart</v-icon>
          </v-col>
        </v-row>
      </router-link>
    </v-sheet>
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
    },

    link() {
      return { name: 'ComponentPage', params: {author: this.component.author, name: this.component.name } }
    },

    color() {
      return this.component.liked ? 'primary' : 'grey'
    },
    
    textColor() {
      return this.component.liked ? 'primary--text' : 'grey--text'
    }
  },
}
</script>
