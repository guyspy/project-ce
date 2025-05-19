import { createApp } from 'vue';
import { IonicVue, IonRadioGroup, IonRadio, IonButtons, IonButton } from '@ionic/vue';
import { createRouter, createWebHistory } from '@ionic/vue-router';
import App from './App.vue';
import routes from './router';
import './assets/style.css';
import './assets/theme.css';

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 全局註冊需要的 Ionic 組件
const app = createApp(App)
  .use(IonicVue, {
    mode: 'ios', // 使用 iOS 模式作為默認外觀
  })
  .component('IonRadioGroup', IonRadioGroup)
  .component('IonRadio', IonRadio)
  .component('IonButtons', IonButtons)
  .component('IonButton', IonButton)
  .use(router);

router.isReady().then(() => {
  app.mount('#app');
});
