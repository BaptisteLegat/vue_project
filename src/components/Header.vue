<!--  header.vue -->
<template>
    <header>
      <h1>Mon en-tête</h1>
      <nav>
        <ul>
          <li><a href="#">Accueil</a></li>
          <li><a href="#">À propos</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </nav>
    </header>
  </template>
<style scoped>

header {
    background-color: #f2f2f2;
    padding: 10px;
}

h1 {
    font-size: 2em;
    text-align: center;
    color: #333;
}

nav {
    text-align: center;
}

nav ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
}

nav ul li {
    display: inline-block;
    margin: 0 10px;
}

nav ul li a {
    font-size: 1.2em;
    color: #333;
    text-decoration: none;
}

</style>
<script>
export default {
    name: 'Header',
}
</script>
