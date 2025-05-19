<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button v-if="showBackButton" default-href="/home"></ion-back-button>
        </ion-buttons>
        
        <ion-title>{{ title }}</ion-title>
        
        <ion-buttons slot="end">
          <ion-button @click="toggleNotifications">
            <ion-icon :icon="notificationsOutline" slot="icon-only"></ion-icon>
            <ion-badge color="danger" v-if="notificationCount > 0">{{ notificationCount }}</ion-badge>
          </ion-button>
          <ion-button @click="toggleMenu">
            <ion-icon :icon="menuOutline" slot="icon-only"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    
    <ion-content id="main-content">
      <slot></slot>
    </ion-content>
    
    <app-sidebar
      :is-open="isMenuOpen"
      @close="isMenuOpen = false"
    />
    
    <!-- Notifications panel -->
    <ion-modal :is-open="isNotificationsOpen" @didDismiss="isNotificationsOpen = false">
      <ion-header>
        <ion-toolbar>
          <ion-title>通知</ion-title>
          <ion-buttons slot="end">
            <ion-button @click="isNotificationsOpen = false">
              <ion-icon :icon="closeOutline" slot="icon-only"></ion-icon>
            </ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
        <ion-list>
          <ion-item v-for="(notification, index) in notifications" :key="index">
            <ion-icon :icon="notificationIcon(notification.type)" slot="start" :color="notificationColor(notification.type)"></ion-icon>
            <ion-label>
              <h2>{{ notification.title }}</h2>
              <p>{{ notification.message }}</p>
              <p class="notification-time">{{ notification.time }}</p>
            </ion-label>
          </ion-item>
          
          <ion-item v-if="notifications.length === 0">
            <ion-label class="ion-text-center">
              <p>No notifications</p>
            </ion-label>
          </ion-item>
        </ion-list>
      </ion-content>
    </ion-modal>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonButton,
  IonIcon,
  IonBackButton,
  IonBadge,
  IonModal,
  IonList,
  IonItem,
  IonLabel
} from '@ionic/vue';
import {
  menuOutline,
  notificationsOutline,
  closeOutline,
  warningOutline,
  informationCircleOutline,
  checkmarkCircleOutline
} from 'ionicons/icons';
import AppSidebar from './AppSidebar.vue';

interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  type: 'info' | 'warning' | 'success';
  read: boolean;
}

export default defineComponent({
  name: 'AppLayout',
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonButton,
    IonIcon,
    IonBackButton,
    IonBadge,
    AppSidebar,
    IonModal,
    IonList,
    IonItem,
    IonLabel
  },
  props: {
    title: {
      type: String,
      required: true
    }
  },
  setup() {
    const route = useRoute();
    const isMenuOpen = ref(false);
    const isNotificationsOpen = ref(false);
    
    // Sample notifications data
    const notifications = ref<Notification[]>([
      {
        id: 1,
        title: 'Order Completed',
        message: 'Order #LB-7842 for LED Bulbs has been fulfilled',
        time: '2 hours ago',
        type: 'success',
        read: false
      },
      {
        id: 2,
        title: 'Low Inventory Alert',
        message: 'Smart Bulb X2000 stock is below threshold (5 units left)',
        time: '4 hours ago',
        type: 'warning',
        read: false
      },
      {
        id: 3,
        title: 'New Order Received',
        message: 'Received new order #LB-7845 from Bright Interiors Inc.',
        time: 'Yesterday',
        type: 'info',
        read: true
      }
    ]);
    
    const notificationCount = computed(() => {
      return notifications.value.filter(n => !n.read).length;
    });
    
    const showBackButton = computed(() => {
      return route.path !== '/home';
    });
    
    const toggleMenu = () => {
      isMenuOpen.value = !isMenuOpen.value;
    };
    
    const toggleNotifications = () => {
      isNotificationsOpen.value = !isNotificationsOpen.value;
      // Mark all as read when opened
      if (isNotificationsOpen.value) {
        notifications.value.forEach(n => n.read = true);
      }
    };
    
    const notificationIcon = (type: string) => {
      switch (type) {
        case 'warning': return warningOutline;
        case 'success': return checkmarkCircleOutline;
        case 'info':
        default: return informationCircleOutline;
      }
    };
    
    const notificationColor = (type: string) => {
      switch (type) {
        case 'warning': return 'warning';
        case 'success': return 'success';
        case 'info':
        default: return 'primary';
      }
    };
    
    return {
      isMenuOpen,
      isNotificationsOpen,
      toggleMenu,
      toggleNotifications,
      showBackButton,
      notifications,
      notificationCount,
      notificationIcon,
      notificationColor,
      // Icons
      menuOutline,
      notificationsOutline,
      closeOutline
    };
  }
});
</script>

<style scoped>
ion-badge {
  position: absolute;
  top: 5px;
  right: 5px;
  font-size: 8px;
  padding: 3px 5px;
}

.notification-time {
  font-size: 0.8rem;
  color: var(--ion-color-medium);
}
</style>
