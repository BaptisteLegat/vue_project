
<template>
  <div class="container">
      <div class="card mb-3">
          <div class="card-body">
              <h5 class="card-title"></h5>
              <h6 class="card-subtitle text-muted">Support card subtitle</h6>
          </div>

          <div class="card-body">
              <img src="src/assets/airforce.jpeg" class="card-image"/>

              <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
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
.card-image {
}

</style>

<script>
export default {
    name: 'DetailProduct',
    props: {
        product: {
            type: Object,
            required: true
        }
    }
}
</script>