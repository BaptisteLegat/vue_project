<template>
  <div class="content-container">
    <!-- ici on appelle le composant Filter, @filter-selected 
      permet de passer les valeurs de selectedColors et selectedSizes au composant Home -->
    <Filter @filter-selected="updateSelectedFilter"></Filter>    
    <v-row class="card-grid">
      <!-- Afficher la roue de chargement pendant 2 secondes -->
      <div v-if="loading">
        <v-progress-circular indeterminate class="loading" color="indigo"></v-progress-circular>
      </div>
      <!-- Afficher les produits lorsque loading est faux -->
      <template v-else>
        <template v-if="filteredProducts.length > 0">
          <Card v-for="product in filteredProducts" :key="product.id" :product="product"></Card>
        </template>
        <template v-else>
          <div class="centered-message">
            <div class="no-results-message">Aucun produit ne correspond à votre recherche.</div>
          </div>
        </template>
      </template>
    </v-row>
    <!-- ici on appelle le composant Pagination, @page-click permet de passer la valeur de currentPage au composant Home -->
    <Pagination class="p-4" :current-page="currentPage" :total-pages="totalPages" @page-click="handlePaginationClick"></Pagination>
  </div>
</template>

<script>
import Card from "./Card.vue";
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
      loading: false,
    };
  },
  // props permet de définir des propriétés qui seront passées au composant
  // c'est un objet qui contient les propriétés
  props: {
    searchValue: {
      type: String,
      default: "",
    },
  },
  // watch permet d'appeler une fonction a chaque fois que la valeur d'une propriété change
  watch: {
    searchValue(newValue) {
      this.performSearch(newValue);
    },
  },
  // computed permet de définir des propriétés calculées qui seront utilisées dans le template
  // filteredProducts est une variable calculée qui dépend de selectedColor, selectedSize et searchQuery
  computed: {
    filteredProducts() {
      if (this.selectedColor === '' && this.selectedSize === '' && this.searchQuery === '') {
        return this.products;
      } else {
        // on filtre les produits en fonction des valeurs de selectedColor, selectedSize et searchQuery
        return this.products.filter(product => {
          const selectedColors = this.selectedColor;
          const selectedSizes = this.selectedSize;
          // on vérifie si la couleur et la taille du produit correspondent aux valeurs de selectedColor et selectedSize
          const colorMatch = selectedColors.length === 0 || selectedColors.some(colorId => product.color["@id"] === `/api/colors/${colorId}`);
          const sizeMatch = selectedSizes.length === 0 || selectedSizes.some(sizeId => product.size["@id"] === `/api/sizes/${sizeId}`);
          const searchQueryMatch = this.searchQuery === '' || product.name.toLowerCase().includes(this.searchQuery.toLowerCase());
          return colorMatch && sizeMatch && searchQueryMatch;
        })
      }
    },
    
  },
  // mounted permet d'appeler une fonction au moment ou le composant est monté
  mounted() {
    this.fetchProducts("/api/products?page=1");
  },
  methods: {
    // cette fonction permet de récupérer les produits en fonction de l'url
    fetchProducts(apiUrl) {
      this.loading = true;
      fetchProducts(apiUrl)
        .then((response) => {
          // response est un objet qui contient les données de la réponse de l'api
          this.products = response["hydra:member"];
          const lastPageLink = response["hydra:view"]["hydra:last"];
          if (lastPageLink) {
            // on récupère le numéro de la dernière page
            const matchResult = lastPageLink.match(/page=(\d+)/);
            if (matchResult) {
              // on convertit le numéro de la dernière page en nombre
              this.totalPages = Number(matchResult[1]);
              } else {
              this.totalPages = 1;
            }
          } else {
            this.totalPages = 1;
          }
          setTimeout(() => {
            this.loading = false; // Désactiver le chargement après 2 secondes
          }, 2000);
        })
        .catch((error) => {
          console.log(error);
          this.loading = false;
        });
    },
    // cette fonction permet de mettre à jour les valeurs de selectedColor et selectedSize et
    // de mettre a jour la requête pour récupérer les produits
    updateSelectedFilter(selections) {
      const { colors, sizes } = selections;
      this.selectedColor = colors;
      this.selectedSize = sizes;
      this.currentPage = 1;
      let apiUrl = "/api/products?";
      apiUrl += `page=${this.currentPage}` + '&';
      // on ajoute les paramètres de la requête en fonction des valeurs de selectedColor, selectedSize et searchQuery
      if (this.selectedColor.length > 0) {
        apiUrl += "color[]=" + this.selectedColor.map(colorId => `/api/colors/${colorId}`).join("&color[]=") + '&';
      }
      if (this.searchQuery !== "") {
        apiUrl += "name=" + this.searchQuery + '&';
      }
      if (this.selectedSize.length > 0) {
        apiUrl += "size[]=" + this.selectedSize.map(sizeId => `/api/sizes/${sizeId}`).join("&size[]=") + '&';
      }
      this.fetchProducts(apiUrl);
    },
    // cette fonction permet de mettre à jour la requête pour récupérer les produits avec la page sélectionnée
    handlePaginationClick(pageNumber) {
      this.currentPage = pageNumber;
      let apiUrl = `/api/products?page=${pageNumber}`;
      if (this.selectedColor.length > 0) {
        apiUrl += "&color[]=" + this.selectedColor.map(colorId => `/api/colors/${colorId}`).join("&color[]=") + '&';
      }
      if (this.searchQuery !== "") {
        apiUrl += "&name=" + this.searchQuery + '&';
      }
      if (this.selectedSize.length > 0) {
        apiUrl += "&size[]=" + this.selectedSize.map(sizeId => `/api/sizes/${sizeId}`).join("&size[]=") + '&';
      }
      this.fetchProducts(apiUrl);
      this.scrollToTop();
    },
    // cette fonction permet de mettre à jour la requête pour récupérer les produits avec la recherche
    performSearch(searchValue) {
      this.searchQuery = searchValue || "";
      let apiUrl = this.buildApiUrl();
      this.fetchProducts(apiUrl);
    },
    // cette fonction permet de construire l'url de l'api en fonction 
    // des valeurs de selectedColor, selectedSize et searchQuery
    buildApiUrl() {
      let apiUrl = "/api/products?";
      if (this.selectedColor.length > 0) {
        apiUrl += "color[]=" + this.selectedColor.map(colorId => `/api/colors/${colorId}`).join("&color[]=");
      }
      if (this.searchQuery !== "") {
        apiUrl += (this.selectedColor.length > 0 ? "&" : "") + "name=" + this.searchQuery + "&";
      }
      if (this.selectedSize.length > 0) {
        apiUrl += (this.selectedColor.length > 0 ? "&" : "") + "size[]=" + this.selectedSize.map(sizeId => `/api/sizes/${sizeId}`).join("&size[]=");
      }
      // on ajoute le numéro de la page
      apiUrl += (this.selectedColor.length > 0 || this.selectedSize.length > 0 ? "&" : "") + "page=" + this.currentPage;
      return apiUrl;
    },
    // cette fonction permet de remonter en haut de la page une fois qu'on a changé de page
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

.loading {
  grid-column: 1 / -1;
  display: flex;
  justify-content: center;
}

</style>
