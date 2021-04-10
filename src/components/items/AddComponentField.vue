<template>
  <v-container>
    <v-row>
        <v-col md="5">
          <v-text-field
            v-model="item.name"
            :label="nameTitle"
            filled
            outlined
            rounded
            dense
          />
        </v-col>
        <v-col md="5">
          <v-textarea 
          v-model="item.description"
          :label="descriptionTitle"
          rows="1"
          auto-grow
          filled/>
        </v-col>
        <v-col md="1">
          <v-btn @click="deleteItem" icon color="primary" class="ml-2">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'AddComponentField',
  props: ['item', 'nameTitle', 'descriptionTitle'],
  data: () => ({
  }),
  methods: {
    deleteItem() {
      this.$emit('deleteItem', this.item.id)
    }
  }
};
</script>
