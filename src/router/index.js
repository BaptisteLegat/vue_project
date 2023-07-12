import { createRouter, createWebHistory } from "vue-router";
import DetailProduct from "@/components/DetailProduct.vue";
import Home from "@/components/Home.vue";
import Login from "@/components/Login.vue";

// Vérifie si l'utilisateur est connecté
function isAuthenticated() {
    if (localStorage.getItem("token")) {
        return true;
    } else {
        return false;
    }
}

// Redirige vers la page de connexion si l'utilisateur n'est pas authentifié
function requireAuth(to, from, next) {
    if (!isAuthenticated()) {
        next({ name: "Login" });
    } else {
        next();
    }
}

// Redirige vers la page d'accueil si l'utilisateur est déjà authentifié
function redirectToHome(to, from, next) {
    if (isAuthenticated()) {
        next({ name: "Home" });
    } else {
        next();
    }
}

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
        beforeEnter: requireAuth,
    },
    {
        path: "/detailProduct/:id",
        name: "DetailProduct",
        component: DetailProduct,
        beforeEnter: requireAuth,
    },
    {
        path: "/login",
        name: "Login",
        component: Login,
        beforeEnter: redirectToHome,
    },
];

const router = createRouter({
    history: createWebHistory("/"),
    routes,
});


export default router;
