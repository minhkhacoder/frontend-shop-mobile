<template>
  <v-container fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md8>
        <v-card class="elevation-12">
          <v-toolbar dark color="blue">
            <v-toolbar-title><h2>Register</h2></v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-alert
                :value="userExists"
                color="error"
                icon="warning"
              >This user already exists, try a different set of data.</v-alert>

              <v-text-field
                prepend-icon="mdi-account"
                name="firstName"
                v-model="firstName"
                label="First name"
                :rules="[rules.required]"
              ></v-text-field>

              <v-text-field
                prepend-icon="mdi-account"
                name="lastName"
                v-model="lastName"
                label="Last name"
                :rules="[rules.required]"
              ></v-text-field>

              <v-text-field
                prepend-icon="mdi-email"
                name="email"
                v-model="email"
                label="Email"
                :rules="[rules.required, rules.email]"
              ></v-text-field>

              <v-text-field
                prepend-icon="mdi-lock"
                name="password"
                label="Password"
                :rules="[rules.required]"
                type="password"
                v-model="password"
              ></v-text-field>

              <v-text-field
                prepend-icon="mdi-lock"
                name="password"
                label="Confirm Password"
                :rules="[rules.required]"
                type="password"
                v-model="confirm_password"
                :error="!valid()"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-divider light></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="success" @click.prevent="register()">
              Register
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "signup",
  data: () => ({
    userExists: false,
    firstName: '', 
    lastName: '', 
    email: '',
    password: "",
    confirm_password: "",
    rules: {
      required: value => !!value || "Required",
      email: value => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || "Invalid e-mail.";
      }
    }
  }),
  methods: {
    register() {
      if (this.valid()) {
        this.$store.dispatch('REGISTER', {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          password: this.password
        })
        .then(({ status }) => {
          this.$router.push('/login')
        })
        .catch (error => {
          this.userExists = true;
        })
      }
    },
    valid() {
      return this.password === this.confirm_password;
    }
  }
};
</script>