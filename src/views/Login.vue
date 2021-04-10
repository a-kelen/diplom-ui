<template>
  <v-container>
    <v-row>
      <v-col md="6" offset="3">
          <v-card class="pa-9">
            <div class="d-flex align-center">
                <v-btn color="primary" to="register" class="mr-auto" small rounded outlined>Register</v-btn>
                <div class="text-h4">Login</div>
            </div>
            <v-text-field
                v-model="user.email"
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
              
            <v-btn @click="login" :loading="status" color="primary" rounded block class="mt-5">Login</v-btn>
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
      this.$store.dispatch('UserStore/login', this.user)
        .then(() => this.$router.push({ name: 'Home'}))
    }
  },
  computed: {
    ...mapState({
      status: s => s.UserStore.status == 'loading'
    })
  }
};
</script>
