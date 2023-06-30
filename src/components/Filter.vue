<template>
  <div class="text-center">
    <p color="black" class="p-3">Filtrer par couleur :</p>
    <v-row class="color-buttons d-flex justify-content-center flex-wrap mb-3">
      <v-btn
        v-for="color in colors"
        :key="color.id"
        :class="['btn-color', 'me-2', 'mb-2', { 'active': isSelectedColor(color.id) }]"
        @click="toggleColor(color.id)"
      >
        <v-chip class="color-circle d-inline-block me-1" :style="{ backgroundColor: color.name }"></v-chip>
        {{ color.name }}
      </v-btn>
    </v-row>
    <p class="p-3">Filtrer par taille :</p>
    <v-row class="size-buttons d-flex justify-content-center flex-wrap mb-4">
      <v-btn
        v-for="size in sizes"
        :key="size.id"
        :class="['btn-size', 'me-2', 'mb-2', { 'active': isSelectedSize(size.id) }]"
        @click="toggleSize(size.id)"
      >
        {{ size.label }}
      </v-btn>
    </v-row>
  </div>
</template>

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
    };
  },
  computed: {
  },
  methods: {
    toggleColor(colorId) {
      if (this.isSelectedColor(colorId)) {
        this.selectedColors = this.selectedColors.filter(id => id !== colorId);
      } else {
        this.selectedColors.push(colorId);
      }
      this.$emit("filter-selected", { colors: this.selectedColors, sizes: this.selectedSizes });
    },
    toggleSize(sizeId) {
      if (this.isSelectedSize(sizeId)) {
        this.selectedSizes = this.selectedSizes.filter(id => id !== sizeId);
      } else {
        this.selectedSizes.push(sizeId);
      }
      this.$emit("filter-selected", { colors: this.selectedColors, sizes: this.selectedSizes });
    },
    isSelectedColor(colorId) {
      return this.selectedColors.includes(colorId);
    },
    isSelectedSize(sizeId) {
      return this.selectedSizes.includes(sizeId);
    },
    loadProducts() {
      fetchProducts("/api/products/")
        .then(response => {
          this.products = response['hydra:member'].map(item => item);
        })
        .catch(error => {
          console.error(error);
        });
    },
    loadColors() {
      fetchProducts("/api/colors/")
        .then(response => {
          this.colors = response['hydra:member'].map(item => item);
        })
        .catch(error => {
          console.error(error);
        });
    },
    loadSizes() {
      fetchProducts("/api/sizes/")
        .then(response => {
          this.sizes = response['hydra:member'].map(item => item);
        })
        .catch(error => {
          console.error(error);
        });
    }
  },
  mounted() {
    this.loadColors();
    this.loadSizes();
    this.loadProducts();
  }
};
</script>

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
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: inline-block;
  border: 1px solid #e2e2e2;
  margin-right: 5px;
}
</style>
