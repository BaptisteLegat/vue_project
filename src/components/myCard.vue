<template>
    <div class="container text-center">
      <v-card class="card bg-blue-grey-lighten-4" @click="detailArticle(product.id)">
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
            </div>
          </div>
        </v-card-text>
      </v-card>
    </div>
  </template>
<style scoped>

.card-image {
    height: 300px;
    object-fit: cover;
    padding: 10px;
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
    },
    methods: {
        detailArticle(id) {
            this.$router.push({name: 'DetailProduct', params: {id}});
        },
    }
}
</script>