<template>
    <div class="container">
        <div v-if="product === null" class="loading-message">Chargement en cours...</div>
        <div v-else class="card mb-3">
            <div class="card-body">
                <h5 class="card-title">{{ product.size.label }}</h5>
                <h6 class="card-subtitle text-muted">Support card subtitle</h6>
            </div>

            <div class="card-body">
                <img :src="product.image" :alt="product.title" class="card-image"/>
                <p class="card-text">{{ product.name }}</p>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">Cras justo odio</li>
                <li class="list-group-item">Dapibus ac facilisis in</li>
                <li class="list-group-item">Vestibulum at eros</li>
            </ul>
            <div class="card-body">
                <a href="#" class="card-link">Card link</a>
                <a href="#" class="card-link">Another link</a>
            </div>
            <div class="card-footer text-muted">
                2 days ago
            </div>
        </div>
    </div>


</template>

<style scoped>
.loading-message {
    text-align: center;
    font-weight: bold;
    margin-top: 20px;
}
.card-text{
    text-align: center;
}
.card-image{
    width: 100%;
    height: 100%;
}
</style>

<script>
import { fetchProductById } from '../stores/api';

export default {
    name: 'DetailProduct',
    data() {
        return {
            product: null,
        };
    },
    mounted() {
        const productId = this.$route.params.id;
        this.fetchProduct(productId);
    },
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
