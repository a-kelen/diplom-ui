<template>
  <v-container>
    <v-row>
        <v-col md="6" offset="3">
            <v-card class="pa-9">
                <div class="d-flex align-center">
                    <div class="text-h4">Register</div>
                    <v-btn color="primary" class="ml-auto" to="login" small rounded outlined>Login</v-btn>
                </div>
                <v-form v-model="valid" ref="form">
                    <v-text-field
                        v-model="user.email"
                        label="Email"
                        :rules="emailRules"
                    ></v-text-field>
                    <v-text-field
                        v-model="user.username"
                        label="Username"
                        :rules="nameRules"
                    ></v-text-field>
                    <v-text-field
                        v-model="user.firstname"
                        label="Firstname"
                        :rules="nameRules"
                    ></v-text-field>
                    <v-text-field
                        v-model="user.lastname"
                        label="Lastname"
                        :rules="nameRules"
                    ></v-text-field>
                    <v-text-field
                        :type="showPass1 ? 'text' : 'password'"
                        :append-icon="showPass1 ? 'mdi-eye' : 'mdi-eye-off'"
                        @click:append="showPass1 = !showPass1"
                        v-model="user.password"
                        label="Password"
                        :rules="passwordRules"
                    ></v-text-field>
                    <v-text-field
                        type="password"
                        v-model="user.passwordConfirm"
                        label="Password Confirmation"
                        :rules="passwordConfirmRules"
                    ></v-text-field>
                    <v-alert
                        v-show="error"
                        dense
                        outlined
                        type="error"
                    >
                        Incorect data
                    </v-alert>  
                    <v-btn 
                        :disabled="!valid" 
                        :loading="loading"
                        @click="register"
                        rounded 
                        block 
                        :class="[ error ? 'error' : 'primary']" 
                        class="mt-5"
                        >
                        Register
                    </v-btn>
                </v-form>
            </v-card>
        </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
    name: 'Register', 
    data: () => ({
        valid: false,
        loading: false,
        error: false,
        showPass1: false,
        user: {
            email: '',
            username: '',
            firstname: '',
            lastname: '',
            password: '',
            passwordConfirm: ''
        },
        rules: {
            required: value => !!value || 'Required.',
            min: v => v.length >= 8 || 'Min 8 characters',
            minTwo: v => v.length >= 2 || 'Min 2 characters',
            emailRequired: v => !!v || 'E-mail is required',
            emailMatch: v => /.+@.+/.test(v) || 'E-mail must be valid',
            noSpace: v => (v || '').indexOf(' ') < 0 ||'No spaces are allowed',
        },
    }),

    computed: {
        nameRules() {
            return [this.rules.required ,this.rules.noSpace]
        },
        emailRules() {
            return [this.rules.emailRequired, this.rules.emailMatch, this.rules.noSpace]
        },
        passwordRules() {
            return [this.rules.min]
        },
        passwordConfirmRules() {
            return [this.rules.min, () => (this.user.password === this.user.passwordConfirm) || 'Password must match']
        },

    },
    methods: {
        register() {
            this.loading = true
            this.$store.dispatch('UserStore/register', this.user)
                .then(() => {
                    this.loading = false
                    this.$router.push({ name: 'Home'})
                })
                .catch(() => {
                    this.error = true
                    this.loading = false
                    setInterval(() => {
                        this.error = false
                    }, 3000);
                })
            }
    }
};
</script>
