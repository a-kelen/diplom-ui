<template>
  <v-container >
    <v-row class="d-flex mt-5" >
        <v-hover v-slot:default="{ hover }">
          <v-avatar
            
            color="primary"
            size="160"
          class="mx-10"
          > 
            <v-img :src="user.avatar" v-if="user.avatar">
              <v-container class="d-flex">
                <v-row align="center" justify="center">
                   <user-avatar-dialog class="mr-10" absolute="true"  @saveAvatar="saveAvatar" :hover="hover"/>
                </v-row>
              </v-container>
            </v-img>
             <user-avatar-dialog @saveAvatar="saveAvatar" v-else :hover="hover"/>
          </v-avatar>
        </v-hover>
    
        <div class="name_box flex-grow-1 flex-shrink-0">
          <v-text-field
          v-model="userClone.firstname"
          label="Firstname"
          class="my-3"
          ></v-text-field>
          <v-text-field
          v-model="userClone.lastname"
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
      <v-form ref="passwordForm" v-model="passwordsValid" class="name_box ml-4 flex-grow-1 flex-shrink-0">
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
        <v-btn 
          @click="changePassword" 
          :disabled="!passwordsValid" 
          :loading="passwordLoading"
          color="primary"

        
        >Change</v-btn>
        
        <v-alert
          v-show="passwordError"
          dense
          outlined
          type="error"
          class="my-2"
        >
          Error
        </v-alert>
      </v-form>
    </v-row>
    <!-- <v-row class="d-flex my-7 align-content-center flex-wrap">
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
    </v-row> -->
    <v-row>
      <v-col>
        <v-btn 
          :disabled="!isChanged" 
          :loading="loading"
          @click="save"
          color="primary" 
          class="my-3" 
          x-large 
          block
        >
          Save
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import axios from '../store/axios'
import UserAvatarDialog from '../components/dialogs/UserAvatarDialog.vue'
import clone from '../utils/clone'

export default {
  components: { UserAvatarDialog },
  name: 'Settings',
  data: () => ({
    userClone: {},
    loading: false,
    passwordLoading: false,
    passwordsValid: false,
    passwordError: false,
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
    getAvatar() {
      axios.get(`User/avatar/${ this.user.username }`, {
          responseType: 'blob'
      }).then(resp => {
          var reader = new FileReader()
          reader.readAsDataURL(resp.data)
          reader.onload = () => {
            this.user.avatar = reader.result
          }
        })
    },

    saveAvatar(canvas) {
      canvas.toBlob(blob => {
        this.$store.dispatch('UserStore/saveAvatar', { blob })
          .then(() => {
            this.getAvatar()
          })
      })
    },

    save() {
      this.loading = true
      this.$store.dispatch('UserStore/changeProfile', this.userClone)
        .then(() => {
          this.user.firstname = clone(this.userClone.firstname)
          this.user.lastname = clone(this.userClone.lastname)
          this.loading = false
        })
    },

    changePassword() {
      this.passwordLoading = true
      this.$store.dispatch('UserStore/changePassword', {
        oldPassword: this.oldPassword,
        newPassword: this.newPassword,

      })
        .then(() => {
          this.oldPassword = ''
          this.newPassword = ''
          this.$refs.passwordForm.resetValidation()
          this.passwordLoading = false
        })
        .catch(() => {
          this.passwordLoading = false
          this.passwordError = true
          setTimeout(() => {
            this.passwordError = false
          }, 3000)
        })
    }
  },

  computed: {
    ...mapState({
      user: s => s.UserStore.user
    }),

    isChanged() {
      return this.user.firstname != this.userClone.firstname ||
        this.user.lastname != this.userClone.lastname
    },
    
  },

  mounted() {
    this.userClone = clone(this.user)
  }
  
};
</script>

<style scoped>
.name_box {
  max-width: 20em;
}
</style>
