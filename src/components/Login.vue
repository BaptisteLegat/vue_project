<template>
  <v-container fluid>
    <h1 class="text-center text-primary font-weight-bold color"> Bienvenue sur MyShop, veuillez vous connecter </h1>
    <v-sheet class="pa-12" rounded>
      <v-card class="mx-auto mt-15 px-6 py-8" max-width="344">
        <VCardTitle class="justify-center text-center">Connexion</VCardTitle>
        <v-form v-if="!loggedIn" v-model="form" @submit.prevent="onSubmit">
          <v-text-field
              v-model="email"
              :readonly="loading"
              :rules="[required]"
              class="mb-2"
              clearable
              label="Email"
              placeholder="Entrer votre email"
          ></v-text-field>
          <v-text-field
              v-model="password"
              :readonly="loading"
              :rules="[required]"
              clearable
              label="Password"
              placeholder="Entrer votre mot de passe"
          ></v-text-field>
          <br />
          <v-btn
              :disabled="!form"
              :loading="loading"
              block
              color="indigo"
              size="large"
              type="submit"
              variant="elevated"
          >
            Connexion
          </v-btn>
        </v-form>
        <div v-else>
          <router-view></router-view>
        </div>
      </v-card>
  </v-sheet>
</v-container>  
  
</template>

<script>
import axios from 'axios';
import { VCardTitle } from 'vuetify/lib/components/index.mjs';
import { VContainer } from 'vuetify/lib/components/index.mjs';

export default {
  name: "Login",

  data() {
    return {
      form: false,
      email: null,
      password: null,
      loading: false,
      loggedIn: false,
    };
  },

  methods: {
    onSubmit() {
      if (!this.form) return;
      // Appel à l'API pour se connecter
      axios.post('https://sf-clothes-api.ld-web.net/api/login_check', {
        username: this.email,
        password: this.password,
      })
      .then((response) => {
        localStorage.setItem('token', response.data.token);
        this.$router.push('/')
        this.loggedIn = true;
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        this.loading = false;
      });
    },
    required(v) {
      return !!v || "Le champ est requis";
    },
  },
};
</script>

<style>
.mt-15 {
  margin-top: 1.5rem;
}
</style>
