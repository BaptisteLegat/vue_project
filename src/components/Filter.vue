<template>
  <div>
    <label>Filtrer par couleur :</label>
    <div class="color-buttons">
      <button
        v-for="color in uniqueColors"
        :key="color.id"
        :class="['color-button', { 'active': isSelectedColor(color.id) }]"
        @click="toggleColor(color.id)"
      >
        <span class="color-circle" :style="{ backgroundColor: color.name }"></span>
        {{ color.name }}
      </button>
    </div>
  </div>
</template>

<style>
.color-buttons {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 10px;
}

.color-button {
  display: flex;
  align-items: center;
  margin-right: 5px;
  margin-bottom: 5px;
  border: none;
  outline: none;
  background-color: transparent;
  padding: 2px;
  cursor: pointer;
  border-radius: 5px;
}

.color-button.active {
  background-color: #e2e2e2;
}

.color-circle {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-right: 5px;
}
</style>

<script>
import { fetchProducts } from "../stores/api";

export default {
  data() {
    return {
      products: [],
      colors: [],
      selectedColors: [],
      filteredProducts: []
    };
  },
  computed: {
    uniqueColors() {
      const colorSet = new Set(this.colors.map(color => color.name));
      return Array.from(colorSet).map(name => {
        return this.colors.find(color => color.name === name);
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
    isSelectedColor(colorId) {
      return this.selectedColors.includes(colorId);
    },
    filterProducts() {
      if (this.selectedColors.length === 0) {
        this.$emit('color-selected', '');
      } else {
        this.$emit('color-selected', this.selectedColors);
      }
    },
    loadProducts() {
      fetchProducts()
        .then(response => {
          this.products = response['hydra:member'].map(item => item);
          this.colors = response['hydra:member'].map(item => item.color);
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