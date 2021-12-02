<template>
  <div class="container">
    <div class="row justify-content-center">
      <div col-md-12>
        <div class="card">
          <div
            class="
              card-header
              d-flex
              justify-content-between
              align-items-center
            "
          >
            <h5 class="mb-0">Categories Table</h5>
            <v-btn
              to="/category/add-category"
              color="success"
              outlined
              >Add category</v-btn>
          </div>
          <div class="card-body">
            <table class="table">
              <thead>
                <tr>
                  <th>Stt</th>
                  <th>Name</th>
                  <th>Image</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(category, index) in categories" :key="category.id">
                  <td>{{ index }}</td>
                  <td>{{ category.name }}</td>
                  <td>
                    <v-img
                      height="30"
                      width="100"
                      :src="`http://localhost:5000/${category.image}`"
                    ></v-img>
                  </td>
                  <td>
                    <v-btn
                      color="primary"
                      :to="{
                        name: 'edit-category',
                        params: { id: category._id },
                      }"
                    >
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                    <v-btn color="error" class="ml-2" @click="removeCategory(category._id)">
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Home",
  computed: {
    ...mapGetters(["categories", "product"]),
  },
  created() {
    this.$store.dispatch("getAllCategories");
  },
  methods: {
    removeCategory(id) {
      const response = this.$store.dispatch("deleteCategory", id);
      this.$router.push({
        name: "category",
        message: response.message,
      });
    },
  },
};
</script>