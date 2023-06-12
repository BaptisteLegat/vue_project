<template>
<div>
  <Filter @color-selected="updateSelectedColor"></Filter>
  <div class="card-grid">
    <Card v-for="product in filteredProducts" :key="product.id" :product="product"></Card>
    <div v-if="filteredProducts.length === 0 && products.length !== 0" class="no-results-message">Aucun produit correspondant aux couleurs sélectionnées.</div>
  </div>
  <div v-if="products.length === 0" class="no-results-message">Aucun produit disponible.</div>
</div>
</template>

<style>

.card-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 20px;
}
.no-results-message {
  text-align: center;
  font-weight: bold;
  margin-top: 20px;
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
      selectedColor: '',
      selectedSize: '',
    };
  },
  computed: {
    filteredProducts() {
      if (this.selectedColor === '' && this.selectedSize === '') {
        return this.products;
      } else {
        return this.products.filter(product => {
          const selectedColors = this.selectedColor instanceof Array ? this.selectedColor : [this.selectedColor];
          const selectedSizes = this.selectedSize instanceof Array ? this.selectedSize : [this.selectedSize];
          const colorMatch = selectedColors.length === 0 || selectedColors.some(colorId => product.color["@id"] === `/api/colors/${colorId}`);
          const sizeMatch = selectedSizes.length === 0 || selectedSizes.some(sizeId => product.size["@id"] === `/api/sizes/${sizeId}`);
          return colorMatch && sizeMatch;
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
          const ValidProducts = response['hydra:member'].map(item => item);
          this.products = ValidProducts;
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
  }
}
</script>