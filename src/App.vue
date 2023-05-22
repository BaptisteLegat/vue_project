<template>
  <div>
    <Header></Header>
    <!-- Le reste du contenu de votre application -->
  </div>
</template>

<style scoped>
main {
  margin: 0 auto;
  max-width: 1200px;
}
</style>
<script>
import Header from './components/Header.vue'

export default {
  components: {
    Header,
  }
}
</script>
