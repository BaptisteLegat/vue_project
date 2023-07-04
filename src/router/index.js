import { createRouter, createWebHistory } from "vue-router";
import DetailProduct from "@/components/DetailProduct.vue";
import Login from "@/components/Login.vue";

let loggedIn = false; // Variable loggedIn

const routes = [
    {
        path: "/",
        name: "Home",
        component: () => import("../components/Home.vue")
    },
    {
        path: "/detailProduct/:id",
        name: "DetailProduct",
        component: DetailProduct
    },
    {
        path: "/login",
        name: "Login",
        component: Login
    }
];

const router = createRouter({
    history: createWebHistory("/"),
    routes
});

// Fonction pour définir la valeur de loggedIn
export function setLoggedIn(value) {
    loggedIn = value;
}

// Ajout de la redirection vers la page "Login" par défaut
router.beforeEach((to, from, next) => {
    if (to.name !== 'Login' && !loggedIn) {
        next({ name: 'Login' });
    } else {
        next();
    }
});

export default router;
