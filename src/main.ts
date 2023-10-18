import './assets/main.css';

import { createApp } from 'vue';
import { VueQueryPlugin } from '@tanstack/vue-query';
import VueCookies from 'vue3-cookies';

import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(router);
app.use(VueQueryPlugin);
app.use(VueCookies);

app.mount('#app');
