<template>
  <v-container >
    <v-row class="d-flex mt-5" >
        <v-hover v-slot:default="{ hover }">
          <v-avatar
            
            color="primary"
            size="160"
          class="mx-10"
          >
            <user-avatar-dialog :hover="hover"/>
          </v-avatar>
        </v-hover>
    
        <div class="name_box flex-grow-1 flex-shrink-0">
          <v-text-field
          label="Firstname"
          class="my-3"
          ></v-text-field>
          <v-text-field
          label="Lastname"
          class="my-3"
          ></v-text-field>
        </div>
    
    </v-row>
    <v-row class="d-flexm mt-5 align-content-center flex-wrap">
      <span class="mr-5 text-button">
        Password
      </span>
      <v-divider class="my-5"></v-divider>
    </v-row>
    <v-row class="mb-5">
      <div class="name_box ml-4 flex-grow-1 flex-shrink-0">
          <v-text-field
            v-model="oldPassword"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min]"
            :type="show1 ? 'text' : 'password'"
            label="Old password"
            hint="At least 8 characters"
            @click:append="show1 = !show1"
          ></v-text-field>
          <v-text-field
            v-model="newPassword"
            :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min]"
            :type="show2 ? 'text' : 'password'"
            label="New password"
            hint="At least 8 characters"
            @click:append="show2 = !show2"
          ></v-text-field>
          <v-btn color="primary">Change</v-btn>
        </div>
    </v-row>
    <v-row class="d-flex my-7 align-content-center flex-wrap">
      <span class="mr-5 text-button">
        Others
      </span>
      <v-divider class="my-5"></v-divider>
    </v-row>
    <v-row>
      <div class="name_box ml-4 flex-grow-1 flex-shrink-0">
        <v-select
          filled
          label="Language"
        ></v-select>
        <v-select
          filled
          label="Theme"
        ></v-select>
        </div>
    </v-row>
    <v-row>
      <v-col>
        <v-btn color="primary" class="my-3" x-large block>Save</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import UserAvatarDialog from '../components/dialogs/UserAvatarDialog.vue';

export default {
  components: { UserAvatarDialog },
  name: 'Settings',
  data: () => ({
    show1: false,
    show2: false,
    oldPassword: '',
    newPassword: '',
    rules: {
      required: value => !!value || 'Required.',
      min: v => v.length >= 8 || 'Min 8 characters',
      emailMatch: () => (`The email and password you entered don't match`),
    },
  }),
  methods: {
    
  },
  computed: {
    
  }
};
</script>

<style scoped>
.name_box {
  max-width: 20em;
}
</style>
