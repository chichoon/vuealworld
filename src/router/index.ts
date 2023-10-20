import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView/HomeView.vue';

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
      component: () => import('../views/ArticleView/ArticleView.vue'),
    },
    { path: '/settings', name: 'settings', component: () => import('../views/SettingsView/SettingsView.vue') },
    { path: '/editor', name: 'editor', component: () => import('../views/EditorView/EditorView.vue') },
    {
      path: '/editor/:articleId',
      name: 'editor-articleid',
      component: () => import('../views/EditorView/EditorView.vue'),
    },
    {
      path: '/profile/:username',
      name: 'profile-userid',
      component: () => import('../views/ProfileView/ProfileView.vue'),
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('../views/TestView/TestView.vue'),
    },
  ],
});

export default router;
