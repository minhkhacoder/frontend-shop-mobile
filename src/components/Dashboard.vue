<template>

    <div v-if="currentUser || userLoggedIn">
      <v-navigation-drawer v-model="drawer" app>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>SMobile</v-list-item-title>
            <v-list-item-subtitle>Shop mobile</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list dense>
          <v-list-item-group color="primary">
            <v-list-item
              v-for="(item, i) in items"
              :key="i"
              :to="item.link"
              link
            >
              <v-list-item-icon>
                <v-icon v-text="item.icon"></v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="item.title"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
      <v-app-bar app>
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title class="ml-20">Dashboard</v-toolbar-title>
        <v-row>
          <v-col class="d-flex justify-end">
            <v-btn
              color="error"
              outlined
              :to="{name: 'home'}"
              @click.prevent="logout"
              >Exit</v-btn
            >
          </v-col>
        </v-row>
      </v-app-bar>
    </div>

    <div v-else>
      <v-app-bar app>
        <v-toolbar-title class="ml-20">Shop Mobile</v-toolbar-title>
        <v-row>
          <v-col class="d-flex justify-end">
            <v-btn
              color="primary"
              outlined
              :to="{ name: 'login' }"
              >Signin</v-btn>
              <v-btn
              color="primary"
              outlined
              :to="{ name: 'register' }"
              >Signup</v-btn>
          </v-col>
        </v-row>
      </v-app-bar>
    </div>
    <!-- <v-main>
      <router-view></router-view>
    </v-main> -->

</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  data: () => ({
    drawer: null,
    items: [
      { title: "Home", icon: "mdi-home", link: "/all-product" },
      { title: "Add Product", icon: "mdi-note-plus", link: "/add-product" },
      { title: "Category", icon: "mdi-shape", link: "/category" },
    ],
  }),
  computed: {
    ...mapGetters({
      currentUser: "loggedInUser",
      userLoggedIn: "userLoggedIn"
    }),
  },
  methods: {
    ...mapMutations(["initAuthState"]),
    logout() {
      this.$store.commit("logout");
      this.$router.push('/')
    },
  },
  mounted() {
    this.initAuthState();
  },
};
</script>