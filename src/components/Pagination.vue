<template>
  <div class="pagination">
    <!-- on désactive le bouton précédent si on est sur la première page
      sinon on émet un événement page-click avec le numéro de la page précédente -->
    <v-btn
      :disabled="currentPage === 1"
      @click="goToPage(currentPage - 1)"
    >
      Précédent
    </v-btn>
    <!-- on affiche les numéros de page en fonction du nombre de pages total et de la page courante,
      on change la classe du bouton si on est sur la page courante 
      et on émet un événement page-click avec le numéro de la page cliquée -->
    <v-btn
      v-for="pageNumber in displayedPages"
      :key="pageNumber"
      :class="['pagination-button', { active: pageNumber === currentPage }]"
      @click="goToPage(pageNumber)"
    >
      {{ pageNumber }}
    </v-btn>
    <!-- on désactive le bouton suivant si on est sur la dernière page
      sinon on émet un événement page-click avec le numéro de la page suivante -->
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
  // on définit les propriétés currentPage et totalPages qui seront passées au composant
  // currentPage est la page courante
  // totalPages est le nombre total de pages
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
    // on émet un événement page-click avec le numéro de la page cliquée
    // ce numéro sera récupéré dans le composant Home
    goToPage(pageNumber) {
      this.$emit("page-click", pageNumber);
    },
  },
  computed: {
    // on calcule les numéros de page à afficher
    // on retourne un tableau avec les numéros de page
    displayedPages() {
      const pageCount = 7;
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
