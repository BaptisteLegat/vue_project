<template>
  <v-sheet class="pa-12" rounded>
    <v-card class="mx-auto mt-15 px-6 py-8" max-width="344">
      <v-form v-if="!loggedIn" v-model="form" @submit.prevent="onSubmit">
        <v-text-field
            v-model="email"
            :readonly="loading"
            :rules="[required]"
            class="mb-2"
            clearable
            label="Email"
        ></v-text-field>
        <v-text-field
            v-model="password"
            :readonly="loading"
            :rules="[required]"
            clearable
            label="Password"
            placeholder="Enter your password"
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
</template>

<script>
import { setLoggedIn } from "@/router";

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
      this.loading = true;

      // Appel à l'API pour se connecter
      fetch("https://sf-clothes-api.ld-web.net/api/login_check", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: this.email,
          password: this.password,
        }),
      })
          .then((response) => {
            if (response.ok) {
              // Connexion réussie
              console.log("Login successful");
              setLoggedIn(true);
              this.$router.push("/");
            } else {
              // Connexion échouée
              console.log("Login failed");
            }
          })
          .catch((error) => {
            console.error("Error:", error);
          })
          .finally(() => {
            this.loading = false;
          });
    },
    required(v) {
      return !!v || "Field is required";
    },
  },
};
</script>

<style>
.mt-15 {
  margin-top: 1.5rem;
}
</style>
