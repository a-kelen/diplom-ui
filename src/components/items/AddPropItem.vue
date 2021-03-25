<template>
  <v-container>
    <v-row>
        <v-col md="5">
            <v-text-field
                v-model="item.name"
                label="Prop name"
                filled
                outlined
                rounded
            />
        </v-col>
        <v-col md="5">
            <v-textarea 
            v-model="item.description"
            label="Prop description"
            rows="1"
            auto-grow
            filled/>
        </v-col>
        <v-col md="1">
          <v-btn @click="deleteProp" icon color="primary" class="ml-2">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'AddPropItem',
  props: ['item'],
  data: () => ({
  }),
  methods: {
    deleteProp() {
      this.$emit('deleteProp', this.item.id)
    }
  }
};
</script>
