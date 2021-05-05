import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter);

const routes = [
  { 
    path: '/',
    component: Home,
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('../views/HomePages/LatestActivitiesPage.vue')
      },
      {
        path: 'top-libraries',
        component: () => import('../views/HomePages/TopLibrariesPage.vue')
      },
      {
        path: 'top-components',
        component: () => import('../views/HomePages/TopComponentsPage.vue')
      },
      {
        path: 'top-users',
        component: () => import('../views/HomePages/TopUsersPage.vue')
      },
      {
        path: 'search',
        component: () => import('../views/HomePages/SearchPage.vue')
      }
    ]
  },
  {
    path: '/dashboard',
    component: () => import('../views/Dashboard.vue'),
    children: [
      {
        path: '',
        name: 'Dashboard',
        redirect: 'liked'
      },
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
    path: '/library/:author/:name',
    name: 'LibraryPage',
    props: {author: 'null', name: 'null'},
    component: () => import('../views/LibraryPage.vue')
  },
  {
    path: '/comp/:id',
    name: 'ComponentPage',
    props: true,
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
    props: true,
    component: () => import('../views/UserProfile.vue'),
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('../views/Settings.vue'),
  },
  {
    path: '/admin-panel',
    component: () => import('../views/AdminPanel.vue'),
    children: [
      {
        path: '',
        name: 'AdminPanel',
        redirect: 'users-table'
      },
      {
        path: 'users-table',
        component: () => import('../views/AdminPanelPages/UsersTablePage.vue')
      },
      {
        path: 'user-reports',
        component: () => import('../views/AdminPanelPages/UserReportsPage.vue')
      },
      {
        path: 'library-reports',
        component: () => import('../views/AdminPanelPages/LibraryReportsPage.vue')
      },
      {
        path: 'component-reports',
        component: () => import('../views/AdminPanelPages/ComponentReportsPage.vue')
      },    
    ]
  },
  {
    path: '/user-reports/:email',
    name: 'DetailedUserReportsPage',
    component: () => import('../views/AdminPanelPages/DetailedUserReportsPage.vue')
  },
  {
    path: '/library-reports/:id',
    name: 'DetailedLibraryReportsPage',
    component: () => import('../views/AdminPanelPages/DetailedLibraryReportsPage.vue')
  },
  {
    path: '/component-reports/:id',
    name: 'DetailedComponentReportsPage',
    component: () => import('../views/AdminPanelPages/DetailedComponentReportsPage.vue')
  },

];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
