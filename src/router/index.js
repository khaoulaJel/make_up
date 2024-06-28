import { createRouter, createWebHistory } from 'vue-router';

import HomeView from '../views/HomeView.vue';
import AuthView from '../views/AuthView.vue';
import Browse from '../views/AboutView.vue';
import ProfileView from '../views/profile.vue'; 

import Details from '../views/AboutView.vue';
import DashboardView from '../views/AboutView.vue';
import Create from '../views/AboutView.vue';
import Edit from '../views/AboutView.vue';

import { isLogged, waitForAuthInit, getUserById, getUser } from '@/firebase/Authentification/getUser'; 

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView
    },
    {
      path: '/auth',
      name: 'AuthPage',
      component: AuthView,
      meta: { requiresAuth: false }
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: DashboardView,
      meta: { requiresAuth: true, requiresAdmin: true }
    },
    {
      path: '/create',
      name: 'Create',
      component: Create,
      meta: { requiresAuth: true, requiresAdmin: true }
    },
    {
      path: '/edit/:id',
      name: 'Edit',
      component: Edit,
      meta: { requiresAuth: true, requiresAdmin: true }
    },
    {
      path: '/quizdetails/:id',
      name: 'QuizDetails',
      component: Details,
      meta: { requiresAuth: true },
      props: true
    },
    {
      path: '/profile',
      name: 'UserProfile',
      component: ProfileView,
      meta: { requiresAuth: true }
    },
    {
      path: '/browse',
      name: 'Browse',
      component: Browse,
      meta: { requiresAuth: true }
    },
  ]
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  waitForAuthInit().then(() => {
    const isAuthenticated = isLogged();

    if (isAuthenticated && requiresAuth && to.meta.requiresAdmin) {
      getUserById(getUser().uid).then(
        (user) => {
          if (!user.isAdmin){
            next({ path: '/' });
          }
          else{
            next();
          }
        }
      );
    }
    else if (requiresAuth && !isAuthenticated) {
      next({ path: '/auth' });
    }
    else {
      next();
    }

  });
});

export async function handleLogout() {
  await signOut();
  router.push('/auth'); 
}


export default router;
