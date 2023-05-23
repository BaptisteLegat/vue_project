<template>
  <div>
    <Header></Header>
    <!-- Le reste du contenu de votre application -->
  </div>
  <div>
      <card></card>
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
import Card from "@/components/Card.vue";

export default {
  components: {
      Card,
    Header,
  }
}
</script>
