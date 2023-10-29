import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../ui/pages/HomeView/HomeView.vue';

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
      component: () => import('../ui/pages/SigninView.vue'),
    },
    {
      path: '/register',
      name: 'signup',
      component: () => import('../ui/pages/SignupView.vue'),
    },
    {
      path: '/article/:slug',
      name: 'article',
      component: () => import('../ui/pages/ArticleView/ArticleView.vue'),
    },
    { path: '/settings', name: 'settings', component: () => import('../ui/pages/SettingsView/SettingsView.vue') },
    { path: '/editor', name: 'editor', component: () => import('../ui/pages/EditorView/EditorView.vue') },
    {
      path: '/editor/:articleId',
      name: 'editor-articleid',
      component: () => import('../ui/pages/EditorView/EditorView.vue'),
    },
    {
      path: '/profile/:username',
      name: 'profile-userid',
      component: () => import('../ui/pages/ProfileView/ProfileView.vue'),
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('../ui/pages/TestView/TestView.vue'),
    },
  ],
});

export default router;
