<template>
  <div>
    <Header></Header>
    <main>
      <Card v-for="product in products" :key="product.id" :product="product"></Card>
    </main>
  </div>
</template>

<script>

import Card from "./Card.vue";
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