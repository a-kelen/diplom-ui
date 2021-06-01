<template>
  <v-container>
    <v-row>
      <v-col md="6" offset="3">
          <v-card class="pa-9">
            <div class="d-flex align-center">
                <v-btn color="primary" to="register" class="mr-auto" small rounded outlined>Register</v-btn>
                <div class="text-h4">Login</div>
            </div>

            <v-form v-model="valid" ref="form">
              <v-text-field
                  v-model="user.email"
                  :rules="[rules.required]"
                  label="Email"
              ></v-text-field>
              <v-text-field
                  v-model="user.password"
                  :type="showPass ? 'text' : 'password'"
                  :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="[rules.required, rules.min]"
                  @click:append="showPass = !showPass"
                  label="Password"
              ></v-text-field>
              <v-alert
                v-show="error"
                dense
                outlined
                type="error"
              >
                Invalid email or password
              </v-alert>  
              <v-btn 
                @click="login" 
                :loading="loading"
                :disabled="!valid" 
                :class="[ error ? 'error' : 'primary']" 
                rounded 
                block 
                class="mt-5"
              >
                Login
              </v-btn>
            </v-form>
          </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Login',
  data: () => ({
    showPass: false,
    error: false,
    valid: false,
    loading: false,
    user: {
      email: '',
      password: ''
    },
     rules: {
          required: value => !!value || 'Required.',
          min: v => v.length >= 8 || 'Min 8 characters',
          emailMatch: () => ('The email and password you entered don\'t match')
        },
  }),
  methods: {
    login() {
      this.loading = true
      this.$store.dispatch('UserStore/login', this.user)
        .then(() => {
          this.loading = false
          this.$router.push({ name: 'Home'})
        })
        .catch(() => {
          this.error = true
          this.loading = false
          setTimeout(() => {
            this.error = false
            
          }, 3000);
        })
    }
  },
  computed: {
    ...mapState({
      status: s => s.UserStore.status == 'loading'
    })
  }
};
</script>
