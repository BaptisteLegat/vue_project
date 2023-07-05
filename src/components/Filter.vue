  <template>
    <div class="text-center">
      <p color="black" class="p-3">Filtrer par couleur :</p>
      <v-row class="color-buttons d-flex justify-content-center flex-wrap mb-3">
        <!-- on boucle sur les couleurs et on créé un bouton pour chaque couleur,
          on ajoute la classe active si la couleur est sélectionnée et on appelle la fonction toggleColor au clic -->
        <v-btn
          v-for="color in colors"
          :key="color.id"
          :class="['btn-color', 'me-2', 'mb-2', { 'active': isSelectedColor(color.id) }]"
          @click="toggleColor(color.id)"
        >
          <!-- on affiche un cercle de la couleur et le nom de la couleur -->
          <v-chip class="color-circle me-1 h-auto" :style="{ backgroundColor: color.name}"></v-chip>
          {{ color.name }}
        </v-btn>
      </v-row>
      <p class="p-3">Filtrer par taille :</p>
      <v-row class="size-buttons d-flex justify-content-center flex-wrap mb-4">
        <!-- la même chose pour les tailles -->
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
      // on appelle la fonction toggleColor au clic sur un bouton couleur, on lui passe l'id de la couleur
      // elle va ajouter ou supprimer l'id de la couleur dans le tableau selectedColors
      // puis on émet un événement filter-selected avec les valeurs de selectedColors et selectedSizes
      toggleColor(colorId) {
        if (this.isSelectedColor(colorId)) {
          this.selectedColors = this.selectedColors.filter(id => id !== colorId);
        } else {
          this.selectedColors.push(colorId);
        }
        this.$emit("filter-selected", { colors: this.selectedColors, sizes: this.selectedSizes });
      },
      // la même chose pour les tailles
      toggleSize(sizeId) {
        if (this.isSelectedSize(sizeId)) {
          this.selectedSizes = this.selectedSizes.filter(id => id !== sizeId);
        } else {
          this.selectedSizes.push(sizeId);
        }
        this.$emit("filter-selected", { colors: this.selectedColors, sizes: this.selectedSizes });
      },
      // on vérifie si la couleur est sélectionnée
      isSelectedColor(colorId) {
        return this.selectedColors.includes(colorId);
      },
      // on vérifie si la taille est sélectionnée
      isSelectedSize(sizeId) {
        return this.selectedSizes.includes(sizeId);
      },
      // on récupère les produits
      // avec la fonction fetchProducts qui se trouve dans le fichier api.js
      loadProducts() {
        fetchProducts("/api/products/")
          .then(response => {
            this.products = response['hydra:member'].map(item => item);
          })
          .catch(error => {
            console.error(error);
          });
      },
      // on récupère les couleurs
      loadColors() {
        fetchProducts("/api/colors/")
          .then(response => {
            this.colors = response['hydra:member'].map(item => item);
          })
          .catch(error => {
            console.error(error);
          });
      },
      // on récupère les tailles
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
    // on charge les produits, les couleurs et les tailles au chargement du composant
    mounted() {
      this.loadColors();
      this.loadSizes();
      this.loadProducts();
    }
  };
  </script>

  <style scoped>
  .btn-color {
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
    border-radius: 50%;
    display: inline-block;
  }
  </style>
