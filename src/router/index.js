import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../views/Dashboard.vue')
  },
  {
    path: '/library',
    name: 'LibaryPage',
    component: () => import('../views/LibraryPage.vue')
  },
  {
    path: '/comp',
    name: 'ComponentPage',
    component: () => import('../views/ComponentPage.vue')
  },
  {
    path: '/element-creating',
    name: 'CreateElementPage',
    component: () => import('../views/CreateElementPage.vue')
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/About.vue")
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue")
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/Register.vue")
  },
  {
    path: "/profile",
    name: "UserPRofile",
    component: () => import("../views/UserProfile.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
