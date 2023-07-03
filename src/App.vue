<template>
    <v-app id="app">
      <Header @perform-search="handleSearch"></Header>

      <router-view></router-view>
    </v-app>
  </template>

<script>


import Header from "@/components/Header.vue";

export default {
    name: 'App',
    components: {
        Header,
    },
    
};
</script>

<style>
/* Styles spécifiques à App.vue */
</style>
