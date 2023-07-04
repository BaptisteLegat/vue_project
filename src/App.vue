<template>
    <v-app id="app">
        <Header @search="updateSearchQuery"></Header>
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
    data() {
        return {
            searchQuery: "",
        };
    },
    methods: {
        updateSearchQuery(searchValue) {
            this.searchQuery = searchValue;
        },
    },
};
</script>