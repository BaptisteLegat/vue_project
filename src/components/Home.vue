<template>
  <div>
    <body class="card-grid">
      <Card v-for="product in products" :key="product.id" :product="product"></Card>
    </body>
  </div>
</template>

<style>
.card-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 20px;
}
</style>

<script>

import Card from "./myCard.vue";
import Header from "./Header.vue";
import { fetchProducts } from "../stores/api";

export default {
  name: "Home",
  components: {
    Card,
    Header,
  },
  data() {
    return {
      products: []
    };
  },
  mounted() {
    this.fetchProducts();
  },
  methods: {
    fetchProducts() {
      fetchProducts()
        .then(products => {
          this.products = products;
        })
        .catch(error => {
          console.error(error);
        });
    }
  }
}
</script>