<template>
    <v-app-bar app color="indigo" dark class="">
        <v-toolbar-title>MyShop</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn text to="/">Home</v-btn>
        <v-btn text to="/about">About</v-btn>
        <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
        ></v-text-field>
    </v-app-bar>
</template>

<script>
export default {
    name: 'Header',
}

</script>
