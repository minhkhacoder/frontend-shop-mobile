<template>
  <v-container>
    <v-row no-gutters>
      <v-col sm="10" class="mx-auto">
        <v-card class="pa-5">
          <v-card-title>Add New Product</v-card-title>
          <v-divider></v-divider>
          <v-form ref="form" class="pa-5" enctype="multipart/form-data" @submit.prevent="submitForm">
            <!-- Name product -->
            <v-text-field
              label="Name Product"
              prepend-icon="mdi-note"
              :rules="rules"
              v-model="product.name"
            >
            </v-text-field>
            <v-row>
              <v-col cols="12" md="6">
                <!-- Price -->
                <v-text-field
                  label="Price"
                  prepend-icon="mdi-currency-usd"
                  :rules="rules"
                  v-model="product.price"
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <!-- Quantity -->
                <v-text-field
                  label="Quantity"
                  prepend-icon="mdi-numeric-9-plus-box"
                  :rules="rules"
                  v-model="product.quantity"
                >
                </v-text-field>
              </v-col>
            </v-row>
            <!-- Category -->
            <v-text-field
              label="Category"
              prepend-icon="mdi-shape"
              :rules="rules"
              v-model="product.category"
            >
            </v-text-field>
            <!-- Description -->
            <v-textarea
              label="Description"
              prepend-icon="mdi-note-plus"
              :rules="rules"
              v-model="product.description"
            >
            </v-textarea>
            <!-- Image -->
            <v-file-input
              :rules="rules"
              show-size
              counter
              multiple
              label="Select Image"
              @change="selectFile"
            ></v-file-input>
            <v-btn type="submit" class="mt-3" color="success">Add Product</v-btn>
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
      product: {
        name: '',
        price: '',
        quantity: '',
        category: '',
        description: '',
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
      formData.append('name', this.product.name);
      formData.append('price', this.product.price);
      formData.append('quantity', this.product.quantity);
      formData.append('category', this.product.category);
      formData.append('description', this.product.description);
      if(this.$refs.form.validate()) {
        const response = this.$store.dispatch('createProduct', formData)  
        this.$router.push({name: 'home', params: {message: response.message}})
      }
    },
  }
};
</script>

<style>
</style>