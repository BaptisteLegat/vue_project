<template>
  <div class="content-container">
    <Filter @filter-selected="updateSelectedFilter" @page-change="handlePageChange"></Filter>    
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
    <Pagination class="p-4" :current-page="currentPage" :total-pages="totalPages" @page-click="handlePaginationClick"></Pagination>
  </div>
</template>

<script>
import Card from "./myCard.vue";
import { fetchProducts } from "../stores/api";
import Filter from "./Filter.vue";
import Pagination from "./Pagination.vue";

export default {
  name: "Home",
  components: {
    Card,
    Filter,
    Pagination,
  },
  data() {
    return {
      products: [],
      selectedColor: '',
      selectedSize: '',
      searchQuery: '',
      currentPage: 1,
      totalPages: 1, 
      itemsPerPage: 30,
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
          return colorMatch && sizeMatch && searchQueryMatch;
        })
      }
    },
    
  },
  mounted() {
    this.fetchProducts("/api/products?page=1");
  },
  methods: {
    fetchFilteredProductsColors(colorId) {
      const apiUrl = colorId ? `/api/products?color=/api/colors/${colorId}` : "/api/products";
      this.fetchProducts(apiUrl);
    },
    
    fetchFilteredProductsSizes(sizeId) {
      const apiUrl = sizeId ? `/api/products?size=/api/sizes/${sizeId}` : "/api/products";
      this.fetchProducts(apiUrl);
    },
    fetchProducts(apiUrl) {
      this.$emit("loading");
      fetchProducts(apiUrl)
        .then((response) => {
          this.products = response["hydra:member"];
          this.totalPages = Number(response["hydra:view"]["hydra:last"].match(/page=(\d+)/)[1]);
          this.$emit("loaded");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    updateSelectedFilter(selections) {
      const { colors, sizes } = selections;
      this.selectedColor = colors;
      this.selectedSize = sizes;
      const colorId = this.selectedColor.length > 0 ? this.selectedColor[0] : null;
      const sizeId = this.selectedSize.length > 0 ? this.selectedSize[0] : null;
      this.fetchFilteredProductsSizes(sizeId);
      this.fetchFilteredProductsColors(colorId);
    },
    performSearch(searchQuery) {
      this.searchQuery = searchQuery;
    },
    handlePageChange(page) {
      this.currentPage = page;
      const apiUrl = `/api/products?page=${page}`;
    },
    handlePaginationClick(pageNumber) {
      this.currentPage = pageNumber;
      const apiUrl = `/api/products?page=${pageNumber}`;
      this.fetchProducts(apiUrl);
      this.scrollToTop();
    },
    scrollToTop() {
      const scrollToTop = () => {
        if (document.documentElement.scrollTop > 0) {
          window.requestAnimationFrame(scrollToTop);
          window.scrollTo(0, document.documentElement.scrollTop - (document.documentElement.scrollTop / 8));
        }
      };
      scrollToTop();
    },
  }
}
</script>

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
