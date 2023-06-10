import { createRouter, createWebHistory } from "vue-router";
const routes = [
    {
        path: "/",
        name: "Home",
        component: () => import("../components/Home.vue")
    },
    {
        path: "/detailProduct",
        name: "DetailProduct",
        component: () => import("../components/DetailProduct.vue")
    }
];

const router = createRouter({
    history: createWebHistory("/"),
    routes
});

export default router;
