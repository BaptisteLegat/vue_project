<template>
  <div class="pagination">
    <v-btn class="pagination-button" @click="goToPreviousPage" :disabled="currentPage === 1">Précédent</v-btn>
    <v-btn v-for="pageNumber in displayedPages" :key="pageNumber" @click="$emit('page-click', pageNumber)" :class="{ 'pagination-button': true, active: pageNumber === currentPage }">{{ pageNumber }}</v-btn>
    <v-btn class="pagination-button" @click="goToNextPage" :disabled="currentPage === totalPages">Suivant</v-btn>
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
      goToPreviousPage() {
        this.goToPage(this.currentPage - 1);
      },
      goToNextPage() {
        this.goToPage(this.currentPage + 1);
      },
      goToPage(pageNumber) {
        if (pageNumber !== this.currentPage && pageNumber >= 1 && pageNumber <= this.totalPages) {
          this.$emit('page-change', pageNumber);
        }
      }
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