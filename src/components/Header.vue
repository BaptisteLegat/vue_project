<template>
  <v-app-bar app color="indigo" dark>
    <v-toolbar-title>MyShop</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn to="/" text>Home</v-btn>
    <v-btn to="/login" text>Login</v-btn>
    <v-btn to="/logout" text>Logout</v-btn>
    <v-btn to="/profile" text>Profile</v-btn>
    <!--  v-model permet de lier la valeur de searchQuery au champ de recherche,
    hide-detail permet de cacher les messages d'erreur  et input permet d'appeler la fonction performSearch 
    a chaque fois que l'utilisateur tape une lettre -->
    <v-text-field
      v-model="searchQuery"
      append-icon="mdi-magnify"
      label="Search"
      single-line
      hide-details
      @input="performSearch"
    ></v-text-field>
  </v-app-bar>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      searchQuery: "",
    };
  },
  methods: {
    // performSearch permet d'appeler la fonction search du composant parent (App.vue)
    performSearch() {
      this.$emit("search", this.searchQuery);
    },
  }
};
</script>