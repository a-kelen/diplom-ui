<template>
  <v-container>
    <v-row>
        <v-col md="6" offset="3">
            <v-card class="pa-9">
                <div class="d-flex align-center">
                    <div class="text-h4">Register</div>
                    <v-btn color="primary" class="ml-auto" to="login" small rounded outlined>Login</v-btn>
                </div>
                <v-text-field
                    name="name"
                    label="Email"
                    id="id"
                ></v-text-field>
                <v-text-field
                    name="name"
                    label="Username"
                    id="id"
                ></v-text-field>
                <v-text-field
                    name="name"
                    label="Firstname"
                    id="id"
                ></v-text-field>
                <v-text-field
                    name="name"
                    label="Lastname"
                    id="id"
                ></v-text-field>
                <v-text-field
                    name="name"
                    label="Password"
                    id="id"
                ></v-text-field>
                 <v-text-field
                    name="name"
                    label="Password Confirmation"
                    id="id"
                ></v-text-field>
                <v-btn color="primary" rounded block class="mt-5">Register</v-btn>
            </v-card>
        </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Register",
  data: () => ({
  })
};
</script>
