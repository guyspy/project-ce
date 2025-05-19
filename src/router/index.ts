import { RouteRecordRaw } from 'vue-router';
import SplashScreen from '../pages/SplashScreen.vue';
import LoginPage from '../pages/LoginPage.vue';
import HomePage from '../pages/HomePage.vue';
import TMSPage from '../pages/TMSPage.vue';
import WMSPage from '../pages/WMSPage.vue';
import SettingsPage from '../pages/SettingsPage.vue';
import DeliveryDetailPage from '../pages/DeliveryDetailPage.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/splash'
  },
  {
    path: '/splash',
    name: 'Splash',
    component: SplashScreen
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage,
    meta: { requiresAuth: true }
  },
  {
    path: '/tms',
    name: 'TMS',
    component: TMSPage,
    meta: { requiresAuth: true }
  },
  {
    path: '/wms',
    name: 'WMS',
    component: WMSPage,
    meta: { requiresAuth: true }
  },
  {
    path: '/settings',
    name: 'Settings',
    component: SettingsPage,
    meta: { requiresAuth: true }
  },
  {
    path: '/delivery/:id',
    name: 'DeliveryDetail',
    component: DeliveryDetailPage,
    meta: { requiresAuth: true }
  }
];

export default routes;
