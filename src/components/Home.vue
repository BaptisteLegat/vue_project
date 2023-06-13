Copy code
<template>
  <div class="content-container">
    <Filter @color-selected="updateSelectedColor"></Filter>
    <v-row class="card-grid">
      <template v-if="filteredProducts.length > 0">
        <Card v-for="product in filteredProducts" :key="product.id" :product="product"></Card>
      </template>
      <template v-else>
        <div class="centered-message">
          <div class="no-results-message">Aucun produit ne correspond à votre recherche.</div>
        </div>
      </template>
    </v-row>
  </div>
</template>

<style>
.content-container {
  margin-top: 75px;
}
.card-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 20px;
  padding: 20px;
}
.no-results-message {
  text-align: center;
  font-size: 20px;
  margin-top: 50px;
}

.no-results-message::before {
  content: "😢";
  display: block;
  font-size: 50px;
  margin-bottom: 20px;
}

.centered-message {
  grid-column: 1 / -1;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

<script>
import Card from "./myCard.vue";
import { fetchProducts } from "../stores/api";
import Filter from "./Filter.vue";

export default {
  name: "Home",
  components: {
    Card,
    Filter,
  },
  data() {
    return {
      products: [],
      selectedColor: '',
      selectedSize: '',
      searchQuery: '',
    };
  },
  computed: {
    filteredProducts() {
      if (this.selectedColor === '' && this.selectedSize === '' && this.searchQuery === '') {
        return this.products;
      } else {
        return this.products.filter(product => {
          const selectedColors = this.selectedColor;
          const selectedSizes = this.selectedSize;
          const colorMatch = selectedColors.length === 0 || selectedColors.some(colorId => product.color["@id"] === `/api/colors/${colorId}`);
          const sizeMatch = selectedSizes.length === 0 || selectedSizes.some(sizeId => product.size["@id"] === `/api/sizes/${sizeId}`);
          const searchQueryMatch = this.searchQuery === '' || product.name.toLowerCase().includes(this.searchQuery.toLowerCase());
          console.log(searchQueryMatch);
          return colorMatch && sizeMatch && searchQueryMatch;
        });
      }
    },
  },
  mounted() {
    this.fetchProducts();
  },
  methods: {
    fetchProducts() {
      fetchProducts()
        .then(response => {
          this.products = response['hydra:member'].map(item => item);
        })
        .catch(error => {
          console.error(error);
        });
    },
    updateSelectedColor(selections) {
      const { colors, sizes } = selections;
      this.selectedColor = colors;
      this.selectedSize = sizes;
    },
    performSearch(searchQuery) {
      this.searchQuery = searchQuery;
    },
  }
}
</script>