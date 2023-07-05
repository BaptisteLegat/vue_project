<template>
    <div class="d-inline-block text-center">
      <!--lorsqu'on clique sur une card, on appelle la fonction detailArticle-->
      <v-card class="card bg-blue-grey-lighten-4" @click="detailArticle(product.id)">
        <!--v-img permet d'afficher une image
        :src permet de passer l'url de l'image au composant et :alt permet de passer l'alt de l'image au composant-->
        <!-- on met le : devant src et alt car ce sont des props du composant v-img-->
        <v-img :src="product.imageUrl" :alt="product.title" class="card-image"></v-img>
        <v-card-text>
          <h5 class="card-title text-truncate">{{ product.name }}</h5>
          <div class="row">
            <div class="col">
              <p class="card-text font-weight-bold">{{ product.price }} €</p>
            </div>
          </div>
          <div class="row m-2">
            <div class="col">
              <p class="card-text font-weight-bold">Couleur : {{ product.color.name }}</p>
              <p class="card-text font-weight-bold">Taille : {{ product.size.label }}</p>
            </div>
          </div>
        </v-card-text>
      </v-card>
    </div>
  </template>
<script>
export default {
    name: "Card",
    // on récupère le produit passé en props
    props: {
        product: {
            type: Object,
            required: true
        }
    },
    methods: {
        // on appelle la fonction detailArticle au clic sur une card, on lui passe l'id du produit
        detailArticle(id) {
            this.$router.push({name: 'DetailProduct', params: {id}});
        },
    }
}
</script>

<style scoped>
.card-image {
    height: 250px;
    object-fit: cover;
    padding: 10px;
}

.d-inline-block {
    display: inline-block;
    margin-right: 10px; /* Ajoutez une marge droite si nécessaire */
    margin-bottom: 10px; /* Ajoutez une marge inférieure si nécessaire */
    /* Ajoutez d'autres styles personnalisés si nécessaire */
}
</style>
