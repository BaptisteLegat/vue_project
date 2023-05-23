<template>
  <div>
    <Header></Header>
    <main>
      <Card v-for="product in products" :key="product.id" :product="product"></Card>
    </main>
  </div>
</template>

<script>
import Header from './components/Header.vue';
import Card from "./components/Card.vue";
import { fetchProducts } from "./stores/api.js";

export default {
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