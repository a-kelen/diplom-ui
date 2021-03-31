<template>
  <v-container>
    <v-row>
        <v-col md="5">
            <v-text-field
                v-model="item.name"
                label="Event name"
                filled
                outlined
                rounded
                dense
            />
        </v-col>
        <v-col md="5">
            <v-textarea 
            v-model="item.description"
            label="Event description"
            rows="1"
            auto-grow
            filled/>
        </v-col>
        <v-col md="1">
          <v-btn @click="deleteEvent" icon color="primary" class="ml-2">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'AddEventItem',
  props: ['item'],
  data: () => ({
  }),
  methods: {
    deleteEvent() {
      this.$emit('deleteEvent', this.item.id)
    }
  }
};
</script>
