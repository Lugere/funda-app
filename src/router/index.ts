import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Main from "../views/Main/Main.vue";
import Login from "../views/Login/Login.vue";
import Home from "../views/Main/Children/Home/Home.vue";
import Entries from "../views/Main/Children/Entries/Entries.vue";
import Subjects from "../views/Main/Children/Subjects/Subjects.vue";
import Quizzes from "../views/Main/Children/Quizzes/Quizzes.vue";
import Users from "../views/Main/Children/Users/Users.vue";
import store from "@/store";
import { Form } from "element-ui";

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
            requiresAuth: false,
        },
    },
    {
        path: "/",
        name: "Main",
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
                    requiresAdmin: false,
                    breadcrumb: "Fragen",
                },
            },
            {
                path: "/Subjects",
                name: "Subjects",
                component: Subjects,
                meta: {
                    requiresAdmin: false,
                    breadcrumb: "Kategorien",
                },
            },
            {
                path: "/Quizzes",
                name: "Quizzes",
                component: Quizzes,
                meta: {
                    requiresAdmin: false,
                    breadcrumb: "Lernquiz",
                },
            },
            {
                path: "/Users",
                name: "Users",
                meta: {
                    requiresAdmin: true,
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
    store.dispatch("checkAuthStatus")

    const currentUser: any = store.state.currentUser;

    const isAdmin = currentUser.role === "admin";
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    const requiresAdmin = to.matched.some(record => record.meta.requiresAdmin);

    // User tries to access an admin-only page
    if (currentUser && requiresAdmin && !isAdmin) next("Entries");
    // User is logged in and tries to access page only accessible to logged-out users
    if (currentUser && !requiresAuth) next("Entries");
    // User is logged out and tries to acces page only accessible to logged-in users
    if (!currentUser && requiresAuth) next("Login");
    // If nothing above was true go to page the user requested
    else next();

    document.title = `FUNDA - Fragen & Antworten | ${to.meta.breadcrumb}`;
});

export default router;
