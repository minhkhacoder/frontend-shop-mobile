<template>
  <v-container>
    <v-row no-gutters>
      <v-col sm="4" class="pa-3" v-for="product in products" :key="product._id">
        <v-card
          class="pa-1"
          :to="{ name: 'product', params: { id: product._id } }"
        >
          <v-img
            height="250"
            :src="`http://localhost:5000/${product.image}`"
          ></v-img>
          <v-btn class="ml-4 mt-3" small outlined color="green">
            {{ product.price.toLocaleString()}} vnđ
          </v-btn>
          <v-btn class="ml-3 mt-3 justify-end" small color="primary">
            {{ product.category }}
          </v-btn>
          <v-card-title class="headline">
            <h3>{{ product.name }}</h3>
          </v-card-title>
          <v-card-text class="py-0">
            <p>{{ product.description.substring(0, 100) + "..." }}</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-alert
      border="top"
      color="green lighten-2"
      dark
      v-if="this.$route.params.message"
    >
      {{this.$route.params.message}}
    </v-alert>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "AllProduct",
  computed: {
    ...mapGetters(["products"]),
  },
  created() {
    this.$store.dispatch("getAllProducts");
  },
};
</script>
