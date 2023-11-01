import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../pages/HomeView/HomeView.vue';

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
      component: () => import('../pages/SigninView.vue'),
    },
    {
      path: '/register',
      name: 'signup',
      component: () => import('../pages/SignupView.vue'),
    },
    {
      path: '/article/:slug',
      name: 'article',
      component: () => import('../pages/ArticleView/ArticleView.vue'),
    },
    { path: '/settings', name: 'settings', component: () => import('../pages/SettingsView/SettingsView.vue') },
    { path: '/editor', name: 'editor', component: () => import('../pages/EditorView/EditorView.vue') },
    {
      path: '/editor/:slug',
      name: 'editor-with-slug',
      component: () => import('../pages/EditorView/EditorView.vue'),
    },
    {
      path: '/profile/:username',
      name: 'profile-userid',
      component: () => import('../pages/ProfileView/ProfileView.vue'),
    },
  ],
});

export default router;
