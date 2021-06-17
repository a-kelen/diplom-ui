import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store'
Vue.use(VueRouter);

const routes = [
  { 
    path: '/',
    component: Home,
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('../views/HomePages/LatestActivitiesPage.vue'),
        meta: {
          auth: true,
          title: 'Home'
        }
      },
      {
        path: 'top-libraries',
        component: () => import('../views/HomePages/TopLibrariesPage.vue'),
        meta: {
          auth: true,
          title: 'Top Libraries'
        }
      },
      {
        path: 'top-components',
        component: () => import('../views/HomePages/TopComponentsPage.vue'),
        meta: {
          auth: true,
          title: 'Top Components'
        }
      },
      {
        path: 'top-users',
        component: () => import('../views/HomePages/TopUsersPage.vue'),
        meta: {
          auth: true,
          title: 'Top Users'
        }
      },
      {
        path: 'search',
        component: () => import('../views/HomePages/SearchPage.vue'),
        meta: {
          auth: true,
          title: 'Search'
        }
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
        component: () => import('../views/DashboardPages/LikesPage.vue'),
        meta: {
          auth: true,
          title: 'Dashboard | Liked'
        }
      },
      {
        path: 'libraries',
        component: () => import('../views/DashboardPages/LibrariesPage.vue'),
        meta: {
          auth: true,
          title: 'Dashboard | Libraries'
        }
      },
      {
        path: 'components',
        component: () => import('../views/DashboardPages/ComponentsPage.vue'),
        meta: {
          auth: true,
          title: 'Dashboard | Components'
        }
      },
      {
        path: 'owned-libraries',
        component: () => import('../views/DashboardPages/OwnedLibrariesPage.vue'),
        meta: {
          auth: true,
          title: 'Dashboard | Owned Libraries'
        }
      },
      {
        path: 'owned-components',
        component: () => import('../views/DashboardPages/OwnedComponentsPage.vue'),
        meta: {
          auth: true,
          title: 'Dashboard | Owned Components'
        }
      }
    ]
  },
  {
    path: '/library/:author/:name',
    name: 'LibraryPage',
    props: {author: 'null', name: 'null'},
    component: () => import('../views/LibraryPage.vue'),
    meta: {
      auth: true,
      title: 'Library | '
    }
  },
  {
    path: '/comp/:author/:name',
    name: 'ComponentPage',
    props: true,
    component: () => import('../views/ComponentPage.vue'),
    meta: {
      auth: true,
      title: 'Component'
    }
  },
  {
    path: '/lib-comp/:libname/:name',
    name: 'LibComponentPage',
    props: true,
    component: () => import('../views/ComponentPage.vue'),
    meta: {
      auth: true,
      title: 'Lib Component'
    }
  },
  {
    path: '/element-creating',
    name: 'CreateElementPage',
    component: () => import('../views/CreateElementPage.vue'),
    meta: {
      auth: true,
      title: 'Create Element'
    }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue'),
    meta: {
      auth: true,
      title: 'About'
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    meta: {
      title: 'Login'
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue'),
    meta: {
      title: 'Register'
    }
  },
  {
    path: '/profile/:username',
    name: 'UserProfile',
    props: true,
    component: () => import('../views/UserProfile.vue'),
    meta: {
      auth: true,
      title: 'User Profile | '
    }
  },
  {
    path: '/subscriptions',
    name: 'Subscriptions',
    component: () => import('../views/Subscriptions.vue'),
    meta: {
      auth: true,
      title: 'Subscriptions'
    }
  },
  {
    path: '/history',
    name: 'History',
    component: () => import('../views/HistoryPage.vue'),
    meta: {
      auth: true,
      title: 'History'
    }
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('../views/Settings.vue'),
    meta: {
      auth: true,
      title: 'Settings'
    }
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
        component: () => import('../views/AdminPanelPages/UsersTablePage.vue'),
        meta: {
          auth: true,
          title: 'Admin Panel | Users'
        }
      },
      {
        path: 'user-reports',
        name: 'UserReports',
        component: () => import('../views/AdminPanelPages/UserReportsPage.vue'),
        meta: {
          auth: true,
          title: 'AP | Reported Users'
        }
      },
      {
        path: 'library-reports',
        component: () => import('../views/AdminPanelPages/LibraryReportsPage.vue'),
        meta: {
          auth: true,
          title: 'AP | Reported Libraries'
        }
      },
      {
        path: 'component-reports',
        component: () => import('../views/AdminPanelPages/ComponentReportsPage.vue'),
        meta: {
          auth: true,
          title: 'AP | Reported Components'
        }
      },    
    ]
  },
  {
    path: '/user-reports/:email',
    name: 'DetailedUserReportsPage',
    component: () => import('../views/AdminPanelPages/DetailedUserReportsPage.vue'),
    meta: {
      auth: true,
      title: 'AP | User Reports'
    }
  },
  {
    path: '/library-reports/:id',
    name: 'DetailedLibraryReportsPage',
    component: () => import('../views/AdminPanelPages/DetailedLibraryReportsPage.vue'),
    meta: {
      auth: true,
      title: 'AP | Library Reports'
    }
  },
  {
    path: '/component-reports/:id',
    name: 'DetailedComponentReportsPage',
    component: () => import('../views/AdminPanelPages/DetailedComponentReportsPage.vue'),
    meta: {
      auth: true,
      title: 'AP | Component Reports'
    }
  },

];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.auth)) {
    if (!store.getters['UserStore/isLoggedIn'] && store.getters['UserStore/isLoggedIn']) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  }
  document.title = to.meta.title || 'composdev'
   
  if(to.name === 'LibraryPage') 
    document.title += ` ${to.params.author} - ${to.params.name}`

  if(to.name === 'UserProfile') 
    document.title += ` ${to.params.username}`


  next()
})

export default router;
