<template>
  <v-container>
    <v-row no-gutters>
      <v-col sm="10" class="mx-auto">
        <v-card class="pa-5">
          <v-card-title>Add New Category</v-card-title>
          <v-divider></v-divider>
          <v-form ref="form" class="pa-5" enctype="multipart/form-data" @submit.prevent="submitForm">
            <!-- Name product -->
            <v-text-field
              label="Name Category"
              prepend-icon="mdi-note"
              :rules="rules"
              v-model="category.name"
            >
            </v-text-field>
            <!-- Image -->
            <v-file-input
              :rules="rules"
              show-size
              counter
              multiple
              label="Select Image"
              @change="selectFile"
            ></v-file-input>
            <v-btn type="submit" class="mt-3" color="success">Add Category</v-btn>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

export default {
  data() {
    return {
      rules: [(value)=> !!value || "This field is required!"],
      image: '',
      category: {
        name: '',
      }
    }
  },
  methods: {
    selectFile(file) {
      this.image = file[0];
    },
    async submitForm() {
      const formData = new FormData();
      formData.append('image', this.image);
      formData.append('name', this.category.name);
      if(this.$refs.form.validate()) {
        const response = this.$store.dispatch('createCategory', formData)  
        this.$router.push({name: 'category', params: {message: response.message}})
      }
    },
  }
};
</script>

<style>
</style>