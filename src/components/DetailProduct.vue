<template>
    <div class="container">
        <div class="widget-wrapper">
            <v-container>
                <!-- Si le produit existe on affiche les informations -->
                <div v-if="product" class="d-flex gap-12">
                    <v-row justify="center">
                        <v-col cols="auto">
                            <!-- Si l'image existe on l'affiche -->
                            <v-img v-if="product && product.imageUrl" :src="product.imageUrl" height="350"></v-img>
                        </v-col>
                        <v-col>
                        <span class="text-h4">{{ product.name }}</span><br>
                        <span class="text-h4 text-secondary font-weight-bold"></span>
                        <p>Taille : {{ product.size.label }}</p>
                        <p>Couleur : {{ product.color.name }}</p>

                        <div class="buttons-group">
                            <v-btn variant="text" @click="$router.back()">
                                <v-icon start icon="mdi-arrow-left"></v-icon>
                                Back
                            </v-btn>
                        </div>
                        </v-col>
                    </v-row>
                </div>
            </v-container>
        </div>
    </div>
</template>

<script>
import { fetchProductById } from '../stores/api';

export default {
    name: 'DetailProduct',
    // data est une fonction qui retourne un objet
    // product est initialisé à null
    data() {
        return {
            product: null,
        };
    },
    // mounted est une fonction qui s'exécute lorsque le composant est monté
    // on récupère l'id du produit dans l'url
    // on appelle la fonction fetchProduct en lui passant l'id du produit
    mounted() {
        const productId = this.$route.params.id;
        this.fetchProduct(productId);
    },
    // on crée une méthode fetchProduct qui appelle la fonction fetchProductById
    methods: {
        fetchProduct(productId) {
            fetchProductById(productId)
                .then(response => {
                    this.product = response;
                })
                .catch(error => {
                    console.error(error);
                });
        },
    },
};
</script>

<style scoped>
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

.widget-wrapper {
    max-width: 500px;
    margin: auto;
}

.card-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.d-flex {
    display: flex;
}

.gap-12 {
    gap: 3rem;
}

.image-column {
    flex: 1;
}

.info-column {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 3rem;
}

.buttons-group {
    margin-top: auto;
    display: flex;
    justify-content: flex-end;
    gap: 2em;
}
</style>
