<template>
    <v-app id="app">
        <!-- @search sert a appeler la fonction updateSearchQuery -->
        <Header @search="updateSearchQuery"></Header>
        <!-- router-view permet de charger les composants en fonction de l'url et 
            :search-value permet de passer la valeur de searchQuery au composant -->  
        <router-view :search-value="searchQuery"></router-view>
    </v-app>
</template>

<script>
import Header from "@/components/Header.vue";

export default {
    name: 'App',
    components: {
        Header,
    },
    // data permet de définir des variables qui seront utilisées dans le template
    data() {
        return {
            searchQuery: "",
        };
    },
    // methods permet de définir des fonctions qui seront utilisées dans le template ou dans les autres méthodes
    methods: {
        updateSearchQuery(searchValue) {
            this.searchQuery = searchValue;
        },
    },
};
</script>