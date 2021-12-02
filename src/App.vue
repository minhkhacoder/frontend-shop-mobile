<template>
  <v-app>
    <Dashboard />
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import Dashboard from "./components/Dashboard.vue";
export default {
  components: {
    Dashboard,
  },
};
</script>