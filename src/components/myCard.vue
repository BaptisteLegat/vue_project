<template>
    <div class="container text-center">
        <div class="card border-dark mb-3">
            <img :src="product.image" :alt="product.title" class="card-image"/>
            <div class="card-body">
                <h5 class="card-title text-truncate">{{ product.name }}</h5>
                <div class="row">
                    <div class="col">
                        <p class="card-text font-weight-bold">Couleur : {{ product.color.name }}</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col p-lg-2">
                        <p class="">Taille : {{ product.size.label }}</p>
                    </div>
                    <a href="/detailProduct" class="stretched-link"></a>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

.card-image {
    height: 300px;
    object-fit: cover;
    margin: 0 auto;
    padding: 10px;
}

.border-dark {
    max-height: 30rem;
    max-width: 28rem;
    margin: 0 auto;
}
</style>

<script>
export default {
    name: "myCard",
    props: {
        product: {
        type: Object,
        required: true
        }
    }
};
</script>