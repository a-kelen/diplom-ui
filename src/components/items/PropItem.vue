<template>
  <v-container>
    <v-row>
        <v-col class="d-flex" md="3">
            <div class="font-weight-medium">Name_SDFSD</div>
            
        </v-col>
        <v-col>
            <v-card elevation="0" class="pa-2" color="grey lighten-3">{{description}}</v-card>
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
  name: "PropItem",
  props: [
      'isLast'
  ],
  data: () => ({
      description: "Desciption sdlkfjsdl ksvisdj lsdj sln slf ld sdsf sdlfsdlf lsdnf adkfn val Desciption sdlkfjsdl ksvisdj lsdj sln slf ld sdsf sdlfsdlf lsdnf adkfn val Desciption sdlkfjsdl ksvisdj lsdj sln slf ld sdsf sdlfsdlf lsdnf adkfn val"
  })
};
</script>
