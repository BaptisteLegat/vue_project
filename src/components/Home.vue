<template>
  <div>
    <Filter @color-selected="updateSelectedColor"></Filter>
    <div class="card-grid">
      <Card v-for="product in filteredProducts" :key="product.id" :product="product"></Card>
    </div>
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
import Filter from "./Filter.vue";

export default {
  name: "Home",
  components: {
    Card,
    Header,
    Filter,
  },
  data() {
    return {
      products: [],
      selectedColor: ''
    };
  },
  computed: {
    filteredProducts() {
      if (this.selectedColor === '') {
        return this.products;
      } else {
        return this.products.filter(product => product.color["@id"] === `/api/colors/${this.selectedColor}`);
      }
    }
  },
  mounted() {
    this.fetchProducts();
  },
  methods: {
    fetchProducts() {
      fetchProducts()
        .then(response => {
          const ValidProducts = response['hydra:member'].map(item => item);
          this.products = ValidProducts;
        })
        .catch(error => {
          console.error(error);
        });
    },
    updateSelectedColor(color) {
      this.selectedColor = color;
    }
  }
}
</script>