<template>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootswatch@4.5.2/dist/cosmo/bootstrap.min.css" integrity="sha384-5QFXyVb+lrCzdN228VS3HmzpiE7ZVwLQtkt+0d9W43LQMzz4HBnnqvVxKg6O+04d" crossorigin="anonymous">

    <div class="container">
        <div class="card border-dark mb-3">
            <img src="src/assets/airforce.jpeg">
            <div class="card-body">
                <div class="row">
                    <div class="col-md-9">
                        <h4 class="card-title">AirForce 1</h4>
                    </div>
                    <div class="col-md-3">
                        <p>130$</p>
                    </div>
                    </div>
                <p class="card-text">Nike</p>
                </div>
            </div>
        </div>
</template>

<style scoped>
.card-text{
    font-weight: bold;
    text-align: center;
}

.border-dark{
    max-width: 20rem;
}
</style>

<script setup>

</script>

<script>
export default {
    name: 'Card',
}
</script>

