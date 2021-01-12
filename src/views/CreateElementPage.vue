<template>
  <v-container>
    <v-row>
      <v-col>
        <router-view></router-view>  
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-sheet 
        class="d-flex gap pa-1">
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
        </v-sheet>
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
