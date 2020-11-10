import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Main from '../views/Home/Home.vue';
import Login from '../views/Home/Children/Login/Login.vue';

Vue.use(VueRouter);

const routes: RouteConfig[] = [
  {
    path: "*",
    redirect: "Home",
  },
  {
    path: '/Main',
    name: 'Main',
    children: [
      {
        path: "/Home",
        name: "Home",
        component: Login,
      }
      {
        path: "/Profile",
        name: "Profile",
        component: Login,
      }
      {
        path: "/Sign-Up",
        name: "Sign-Up",
        component: Login,
      }
      {
        path: "/Settings",
        name: "Settings",
        component: Login,
      },
      {
        path: "/Login",
        name: "Login",
        component: Login,
      }
    ],
    component: Main,
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
