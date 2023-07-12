<template>
    <v-app-bar app color="indigo" dark>
        <v-toolbar-title>MyShop</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn class="m-2" to="/" text>Home</v-btn>
        <v-btn class="m-2" @click="logout" text>Logout</v-btn>
        <v-text-field
                v-model="searchQuery"
                append-icon="mdi-magnify"
                label="Rechercher"
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
        logout() {
            // Supprimer le token du localStorage
            localStorage.removeItem("token");
            // Rediriger l'utilisateur vers la page de connexion
            this.$router.push("/login");
        },
    },
};
</script>
