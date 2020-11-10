import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Main from '../views/Main/Main.vue';
import Login from '../views/Login/Login.vue';
import Home from '../views/Main/Children/Home/Home.vue';

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
    path: '/Main',
    name: 'Main',
    children: [
      {
        path: "/Home",
        name: "Home",
        component: Home,
      },
      {
        path: "/Settings",
        name: "Settings",
        component: Login,
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
