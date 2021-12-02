<template>
  <v-container>
    <v-row no-gutters>
      <v-col sm="8" class="pa-4 mx-auto">
        <v-card class="pa-2">
          <v-img :src="`http://localhost:5000/${product.image}`"></v-img>
          <v-card-actions class="pb-0">
            <v-row class="mt-1 mx-1">
              <v-col sm="2" class="d-flex justify-start">
                <v-btn class="ml-3" outlined color="green">
                  {{ product.price.toLocaleString() }} vnđ
                </v-btn>
                <v-btn color="primary" class="ml-8">
                  {{ product.category }}
                </v-btn>
              </v-col>
              <v-col sm="10" class="d-flex justify-end">
                <v-btn color="success" text :to="{name: 'edit-product', params: {id: product._id}}">Edit</v-btn>
                <v-btn color="red" class="ml-3" text @click="removeProduct(product._id)">Delete</v-btn>
              </v-col>
            </v-row>
          </v-card-actions>
          <v-card-subtitle class="headline">
            <h3>{{ product.name }}</h3>
          </v-card-subtitle>
          <v-card-text class="grey--text">
            <p>{{ product.description }}</p>
            <p>{{ product.createdAt }}</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["product"]),
  },
  methods: {
    removeProduct(id) {
      const response = this.$store.dispatch('deleteProduct', id)
      this.$router.push({name :'home', params: {message: response.message }})
    }
  },
  mounted() {
    this.$store.dispatch("getProductById", this.$route.params.id);
  },
};
</script>

<style>
</style>