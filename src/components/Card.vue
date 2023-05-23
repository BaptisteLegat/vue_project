<template>
    <div class="container">
      <div class="card border-dark mb-3">
        <img :src="product.image" :alt="product.title" />
        <div class="card-body">
          <div class="row">
            <div class="col-md-9">
              <h4 class="card-title">{{ product.title }}</h4>
            </div>
            <div class="col-md-3">
              <p> {{product.price}} €</p>
            </div>
          </div>
          <p class="card-text">Nike</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Card',
    props: {
      product: {
        type: Object,
        required: true
      }
    }
  };
  </script>
  
  <style scoped>
  .card-text {
    font-weight: bold;
    text-align: center;
  }
  
  .border-dark {
    max-width: 20rem;
  }
  </style>