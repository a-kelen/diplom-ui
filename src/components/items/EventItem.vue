<template>
  <v-container>
    <v-row>
        <v-col class="d-flex" md="3">
            <div class="font-weight-medium">{{ event.name }}</div>
            
        </v-col>
        <v-col>
            <v-card elevation="0" class="pa-2" color="grey lighten-3">{{event.description}}</v-card>
        </v-col>
    </v-row>
    <v-row>
        <v-col>
            <v-divider v-if="!isLast"></v-divider>
        </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'EventItem',
  props: [
    'isLast',
    'event'
  ],
  data: () => ({
  })
};
</script>
