import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'signin',
      component: () => import('../views/SigninView.vue'),
    },
    {
      path: '/register',
      name: 'signup',
      component: () => import('../views/SignupView.vue'),
    },
    {
      path: '/article/:slug',
      name: 'article',
      component: () => import('../views/ArticleView.vue'),
    },
  ],
});

export default router;
