<template>
<v-container>
  <v-card elevation="3" class="d-flex pa-2 align-center">
      <v-icon size="30" color="blue" >mdi-vuejs</v-icon>
      <v-chip color="blue" class="mx-2" dark  label>Format</v-chip>
      <div class="mx-2">Component</div>
      
      <v-btn  icon color="primary" class="ml-auto">
        <v-icon>mdi-pen</v-icon>
      </v-btn>
      <v-btn  icon color="primary" class="ml-2">
        <v-icon>mdi-close</v-icon>
      </v-btn>
  </v-card>
  </v-container>
</template>

<script>
export default {
  name: "PrimaryComponentItem",
  data: () => ({
  })
};
</script>

<style scoped>
.gap {
  gap: 1rem;
}
</style>
