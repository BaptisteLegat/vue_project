<template>
  <div class="pagination">
    <v-btn
      :disabled="currentPage === 1"
      @click="goToPage(currentPage - 1)"
    >
      Précédent
    </v-btn>
    <v-btn
      v-for="pageNumber in displayedPages"
      :key="pageNumber"
      :class="['pagination-button', { active: pageNumber === currentPage }]"
      @click="goToPage(pageNumber)"
    >
      {{ pageNumber }}
    </v-btn>
    <v-btn
      :disabled="currentPage === totalPages"
      @click="goToPage(currentPage + 1)"
    >
      Suivant
    </v-btn>
  </div>
</template>

<script>
export default {
  props: {
    currentPage: {
      type: Number,
      required: true
    },
    totalPages: {
      type: Number,
      required: true
    }
  },
  methods: {
    goToPage(pageNumber) {
      this.$emit("page-click", pageNumber);
    },
  },
  computed: {
    displayedPages() {
      const pageCount = 5;
      const startPage = Math.max(this.currentPage - Math.floor(pageCount / 2), 1);
      const endPage = Math.min(startPage + pageCount - 1, this.totalPages);
      return Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);
    },
  },
};
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.pagination-button {
  margin: 0 5px;
}

.pagination-button.active {
  background-color: #ccc;
}
</style>
