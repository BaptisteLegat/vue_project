<template>
  <v-app-bar app color="indigo" dark>
    <v-toolbar-title>MyShop</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn to="/" text>Home</v-btn>
    <v-btn to="/login" text>Login</v-btn>
    <v-btn to="/register" text>Register</v-btn>
    <v-btn to="/logout" text>Logout</v-btn>
    <v-btn to="/profile" text>Profile</v-btn>
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
    performSearch() {
      this.$emit("search", this.searchQuery);
    },
  },
};
</script>