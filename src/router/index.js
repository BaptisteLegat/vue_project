import { createRouter, createWebHistory } from "vue-router";
import DetailProduct from "@/components/DetailProduct.vue";
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
    }
];

const router = createRouter({
    history: createWebHistory("/"),
    routes
});

export default router;
