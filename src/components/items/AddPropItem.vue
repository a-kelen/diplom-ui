<template>
  <v-container>
    <v-row>
        <v-col md="3">
            <v-text-field
                name="name"
                label="Prop name"
                id="id"
                filled
                outlined
                rounded
            />
        </v-col>
        <v-col>
            <v-textarea 
            label="Prop description"
            rows="1"
            auto-grow
            filled/>
        </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "AddPropItem",
  data: () => ({
  })
};
</script>
