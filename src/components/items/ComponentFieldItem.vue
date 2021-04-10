<template>
  <v-container>
    <v-row>
      <v-col class="d-flex" md="3">
          <div class="font-weight-medium">{{item.name}}</div>
      </v-col>
      <v-col>
        <v-card elevation="0" class="pa-2" color="grey lighten-3">{{item.description}}</v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-divider :islast="true"></v-divider>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'ComponentFieldItem',
  props: [
      'isLast',
      'item'
  ],
  data: () => ({
  })
}
</script>
