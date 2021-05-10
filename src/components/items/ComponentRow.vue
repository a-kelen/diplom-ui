<template>
  <router-link :to="{ name: 'LibComponentPage', params: {libname, name: component.name} }">
    <v-card class="d-flex align-center my-2 pa-2">
      <v-icon color="green">mdi-vuejs</v-icon>
      <div class="mx-3">{{ component.name }}</div>
      <v-chip color="green" class="ml-auto" label>{{ component.format }}</v-chip>
    </v-card>
  </router-link>
</template>

<script>
export default {
  name: 'ComponentRow',
  data: () => ({
  }),
  props: ['component', 'libname']
}
</script>
