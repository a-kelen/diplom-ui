<template>
  <v-container>
    <v-row>
      <v-col>
        <router-view app></router-view>  
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card
        class="d-flex gap pa-3 rounded-pill">
          <v-btn 
            color="teal darken-3" 
            large 
            rounded 
            dark>Back
          </v-btn>
          <v-btn 
            color="teal darken-3" 
            large 
            rounded
            dark 
            class="ml-auto">Create
          </v-btn>
          <v-btn
            color="teal darken-3" 
            large 
            rounded
            dark>Next
          </v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

export default {
  name: "CreateElementPage",
  components: {
  }
};
</script>

<style scoped>
.gap {
  gap: 1rem;
}
</style>
