import { createApp } from 'vue';
import { IonicVue } from '@ionic/vue';
import { createRouter, createWebHistory } from '@ionic/vue-router';
import App from './App.vue';
import routes from './router';
import './assets/style.css';

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App)
  .use(IonicVue, {
    mode: 'ios', // Use iOS mode for consistent look
  })
  .use(router);

router.isReady().then(() => {
  app.mount('#app');
});
