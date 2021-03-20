import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter);

const routes = [
  { 
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../views/Dashboard.vue'),
    children: [
      {
        path: 'liked',
        component: () => import('../views/DashboardPages/LikesPage.vue')
      },
      {
        path: 'libraries',
        component: () => import('../views/DashboardPages/LibrariesPage.vue')
      },
      {
        path: 'components',
        component: () => import('../views/DashboardPages/ComponentsPage.vue')
      },
      {
        path: 'owned-libraries',
        component: () => import('../views/DashboardPages/OwnedLibrariesPage.vue')
      },
      {
        path: 'owned-components',
        component: () => import('../views/DashboardPages/OwnedComponentsPage.vue')
      }
    ]
  },
  {
    path: '/library/:id',
    name: 'LibraryPage',
    component: () => import('../views/LibraryPage.vue')
  },
  {
    path: '/comp/:id',
    name: 'ComponentPage',
    component: () => import('../views/ComponentPage.vue')
  },
  {
    path: '/element-creating',
    name: 'CreateElementPage',
    component: () => import('../views/CreateElementPage.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/profile/:username',
    name: 'UserProfile',
    component: () => import('../views/UserProfile.vue')
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
