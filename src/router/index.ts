import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Main from "../views/Main/Main.vue";
import Login from "../views/Login/Login.vue";
import Home from "../views/Main/Children/Home/Home.vue";
import Entries from "../views/Main/Children/Entries/Entries.vue";
import Subjects from "../views/Main/Children/Subjects/Subjects.vue";
import Quizzes from "../views/Main/Children/Quizzes/Quizzes.vue";

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
    },
    {
        path: "/",
        name: "Main",
        redirect: "Home",
        children: [
            {
                path: "/Home",
                name: "Home",
                component: Home,
            },
            {
                path: "/Entries",
                name: "Entries",
                component: Entries,
            },
            {
                path: "/Subjects",
                name: "Subjects",
                component: Subjects,
            },
            {
                path: "/Quizzes",
                name: "Quizzes",
                component: Quizzes,
            },
            {
                path: "/Statistics",
                name: "Statistics",
                // component: Statistics,
            },
        ],
        component: Main,
    },
];

const router = new VueRouter({
    mode: "history",
    routes,
});

export default router;
