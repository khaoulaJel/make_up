import { createRouter, createWebHistory } from 'vue-router';
import { getUser, isLogged, waitForAuthInit, getUserById } from "@/firebase/Authentification/getUser"

import HomeView from '../views/HomeView.vue';
import AuthView from '../views/AuthView.vue';
import EventList from '../views/EventList.vue';
import VoteModal from '../views/VoteModal.vue'; 
import ProfileView from '../views/profile.vue';
import addEvent from '@/views/addEvent.vue'
const routes = [
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
    path: '/profile',
    name: 'UserProfile',
    component: ProfileView,
    meta: { requiresAuth: true }
  },
  {
    path: '/browse',
    name: 'Browse',
    component: EventList,
    meta: { requiresAuth: true }
  },
  {
    path: '/vote/:id', 
    name: 'VoteModal',
    component: VoteModal,
    props: true,
    meta: { requiresAuth: true } 
  },
  {
    path: '/add',
    name: 'add',
    component: addEvent,
    meta: { requiresAuth: true }
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
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
