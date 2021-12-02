<template>
  <v-container>
    <v-row no-gutters>
      <v-col sm="10" class="mx-auto">
        <v-card class="pa-5">
          <v-card-title>Edit Category</v-card-title>
          <v-divider></v-divider>
          <v-form
            ref="form"
            class="pa-5"
            enctype="multipart/form-data"
            @submit.prevent="updateForm"
          >
            <!-- Name category -->
            <v-text-field
              label="Name Category"
              prepend-icon="mdi-note"
              :rules="rules"
              v-model="category.name"
            >
            </v-text-field>
            <!-- Image -->
            <v-file-input
              show-size
              counter
              :rules="rules"
              multiple
              label="Select Image"
              @change="selectFile"
            ></v-file-input>
            <v-img
              :src="`http://localhost:5000/${category.image}`"
              width="120"
            ></v-img>
            <v-btn type="submit" class="mt-3" color="primary"
              >Update Category</v-btn
            >
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import axios from "../helper/axios"
export default {
  data() {
    return {
      rules: [(value) => !!value || "This field is required!"],
      image: "",
    };
  },
  computed: {
    ...mapGetters(["category"]),
  },
  methods: {
    selectFile(file) {
      this.image = file[0];
    },
    async updateForm() {
      const formData = new FormData();
      formData.append("name", this.category.name);
      formData.append("image", this.image);
      // formData.append("old_image", this.product.image);
      const id = this.$route.params.id;
      console.log(id);
      if (this.$refs.form.validate()) {
        const response = await axios.patch(`/category/${id}`, formData);
        this.$router.push({
          name: "category",
          params: { message: response.message },
        });
      }
    },
  },
  mounted() {
    this.$store.dispatch("getCategoryById", this.$route.params.id);
  },
};
</script>

<style>
</style>