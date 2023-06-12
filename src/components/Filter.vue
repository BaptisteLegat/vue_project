<template>
  <div class="text-center">
    <label>Filtrer par couleur :</label>
    <div class="color-buttons d-flex justify-content-center flex-wrap mb-3">
      <button
        v-for="color in uniqueColors"
        :key="color.id"
        :class="['btn', 'btn-color', 'me-2', 'mb-2', { 'active': isSelectedColor(color.id) }]"
        @click="toggleColor(color.id)"
      >
        <div class="color-circle d-inline-block me-1" :style="{ backgroundColor: color.name }"></div>
        {{ color.name }}
      </button>
    </div>
    <label>Filtrer par taille :</label>
    <div class="size-buttons d-flex justify-content-center flex-wrap mb-3">
      <button
        v-for="size in uniqueSizes"
        :key="size.id"
        :class="['btn', 'btn-size', 'me-2', 'mb-2', { 'active': isSelectedSize(size.id) }]"
        @click="toggleSize(size.id)"
      >
        {{ size.label }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.btn-color {
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 14px;
}

.btn-size {
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 14px;
}

.btn-color.active {
  background-color: #e2e2e2;
}

.btn-size.active {
  background-color: #e2e2e2;
}

.color-circle {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  display: inline-block;
  vertical-align: middle;
}
</style>

<script>
import { fetchProducts } from "../stores/api";

export default {
  data() {
    return {
      products: [],
      colors: [],
      sizes: [],
      selectedColors: [],
      selectedSizes: [],
      filteredProducts: []
    };
  },
  computed: {
    uniqueColors() {
      const colorSet = new Set(this.colors.map(color => color.name));
      return Array.from(colorSet).map(name => {
        return this.colors.find(color => color.name === name);
      });
    },
    uniqueSizes() {
      const sizeSet = new Set(this.sizes.map(size => size.label));
      return Array.from(sizeSet).map(label => {
        return this.sizes.find(size => size.label === label);
      });
    }
  },
  methods: {
    toggleColor(colorId) {
      const index = this.selectedColors.indexOf(colorId);
      if (index > -1) {
        this.selectedColors.splice(index, 1);
      } else {
        this.selectedColors.push(colorId);
      }
      this.filterProducts();
    },
    toggleSize(sizeId) {
      const index = this.selectedSizes.indexOf(sizeId);
      if (index > -1) {
        this.selectedSizes.splice(index, 1);
      } else {
        this.selectedSizes.push(sizeId);
      }
      this.filterProducts();
    },
    isSelectedColor(colorId) {
      return this.selectedColors.includes(colorId);
    },
    isSelectedSize(sizeId) {
      return this.selectedSizes.includes(sizeId);
    },
    filterProducts() {
      if (this.selectedColors.length === 0 && this.selectedSizes.length === 0) {
        this.$emit('color-selected', { colors: [], sizes: [] });
      } else {
        this.$emit('color-selected', {
          colors: this.selectedColors,
          sizes: this.selectedSizes
        });
      }
    },
    loadProducts() {
      fetchProducts()
      .then(response => {
        this.products = response['hydra:member'].map(item => item);
        this.colors = response['hydra:member'].map(item => item.color);
        this.sizes = response['hydra:member'].map(item => item.size);
        this.filteredProducts = this.products;
      })
      .catch(error => {
        console.error(error);
      });
    } 
  },
  mounted() {
    this.loadProducts();
  }
};
</script>