import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Main from "../views/Main/Main.vue";
import Login from "../views/Login/Login.vue";
import Home from "../views/Main/Children/Home/Home.vue";
import Entries from "../views/Main/Children/Entries/Entries.vue";
import Subjects from "../views/Main/Children/Subjects/Subjects.vue";
import Quizzes from "../views/Main/Children/Quizzes/Quizzes.vue";
import Users from "../views/Main/Children/Users/Users.vue";

Vue.use(VueRouter);

const routes: RouteConfig[] = [
    {
        path: "*",
        redirect: "Login",
    },
    {
        path: "/Login",
        name: "Login",
        component: Login,
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: "/",
        name: "Main",
        redirect: "Entries",
        meta: {
            requiresAuth: true,
        },
        children: [
            // {
            //     path: "/Home",
            //     name: "Home",
            //     component: Home,
            //     meta: {
            //         requiresAuth: true,
            //     },
            // },
            {
                path: "/Entries",
                name: "Entries",
                component: Entries,
                meta: {
                    requiresAuth: true,
                    breadcrumb: "Fragen",
                },
            },
            {
                path: "/Subjects",
                name: "Subjects",
                component: Subjects,
                meta: {
                    requiresAuth: true,
                    breadcrumb: "Kategorien",
                },
            },
            {
                path: "/Quizzes",
                name: "Quizzes",
                component: Quizzes,
                meta: {
                    requiresAuth: true,
                    breadcrumb: "Lernquiz",
                },
            },
            {
                path: "/Users",
                name: "Users",
                meta: {
                    requiresAuth: true,
                    breadcrumb: "Benutzer",
                },
                component: Users,
            },
        ],
        component: Main,
    },
];

const router = new VueRouter({
    mode: "history",
    routes,
});

router.beforeEach((to, from, next) => {
    document.title = `FUNDA - Fragen & Antworten | ${to.meta.breadcrumb}`;
    next();
});

export default router;
