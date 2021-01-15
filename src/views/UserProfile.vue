<template>
    <v-container fluid>
      <v-row>
        <v-col md="2">
          <v-avatar
            size="180"
            color="teal"
          >
            RR
          </v-avatar>
        </v-col>
        <v-col md="10">
          <v-row>
            <v-col>
              <v-sheet class="transparent d-flex align-center">
                <div><v-card-text class="py-2 px-0 text-h4">
                  Name
                </v-card-text>
                <p class="body-2">
                  Firstname Lastname
                </p></div>
                <v-btn color="primary" class="ml-auto" x-large>Follow</v-btn>
              </v-sheet>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="py-2">
              <v-sheet class="transparent gap d-flex align-center">
                <v-chip>129 followers</v-chip>
                <v-chip>231 stars</v-chip>
                <v-chip>2 components</v-chip>
                <v-chip>5 libraries</v-chip>
              </v-sheet>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
</template>

<script>
export default {
  name: "UserProfile",
  data: () => ({
  })
};
</script>

<style scoped>

</style>
