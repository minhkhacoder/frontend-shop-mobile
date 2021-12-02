<template>
  <v-container fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md8>
        <v-form>
          <v-card class="elevation-12">
            <v-toolbar dark color="blue">
              <v-toolbar-title><h2>Login</h2></v-toolbar-title>
            </v-toolbar>
            <v-alert color="error" :value="error" icon="mdi-close">
              The email or the password are incorrect.
            </v-alert>
            <!-- <v-alert color="success" :value="success" icon="mdi-close">
              Login was successful
            </v-alert> -->
            <v-card-text>
              <v-text-field
                v-model="email"
                prepend-icon="mdi-email"
                name="email"
                label="Email"
                type="email"
              ></v-text-field>

              <v-text-field
                v-model="password"
                prepend-icon="mdi-lock"
                name="password"
                label="Password"
                type="password"
              ></v-text-field>
            </v-card-text>
            <v-divider light></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" dark @click.prevent="login()" :to="{name: 'all-product'}">
                Login
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "login",
  data: () => ({
    email: "",
    password: "",
    success: false,
    error: false,
  }),
  computed: {
    ...mapGetters(["userLoggedIn"]),
  },
  created() {
    if (this.userLoggedIn) {
      this.$router.push("/");
    }
  },
  methods: {
    login() {
      this.$store
        .dispatch("LOGIN", {
          email: this.email,
          password: this.password,
        })
        .then(() => {
          this.$router.push("/all-product") 
        })
        .catch(() => {
          this.error = true;
        });
    },
  },
};
</script>