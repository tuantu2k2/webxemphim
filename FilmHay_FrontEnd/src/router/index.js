import { createWebHistory, createRouter } from "vue-router";
import Film_Home from "@/views/Film_Home.vue";
const routes = [
    {
        path: "/",
        name: "home",
        component: Film_Home,
    },
    {
        path: "/watch/:id",
        name: "watch",
        component: () => import("@/views/Film_Watch.vue"),
        props: true
    },
    {
        path: "/quoc-gia/:id",
        name: "quocgia",
        component: () => import("@/views/Film_byCountry.vue"),
        props: true
    },
    {
        path: "/loai/:id",
        name: "loai",
        component: () => import("@/views/Film_byType.vue"),
        props: true
    },
    {
        path: "/tim-kiem/:id",
        name: "timkiem",
        component: () => import("@/views/Film_bySearch.vue"),
        props: true
    },
    {
        path: "/the-loai/:id",
        name: "theloai",
        component: () => import("@/views/Film_byCategory.vue"),
        props: true
    },
    {
        path: "/:pathMatch(.*)*",
        name: "notfound",
        component: () => import("@/views/NotFound.vue"),
    },
];
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,

});


export default router;
