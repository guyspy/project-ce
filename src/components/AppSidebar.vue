<template>
  <ion-menu side="end" type="overlay" :content-id="contentId" :is-open="isOpen" @ionDidClose="$emit('close')">
    <ion-header>
      <ion-toolbar>
        <ion-title>Menu</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div class="user-profile">
        <div class="avatar">
          <ion-icon :icon="personCircleOutline" class="avatar-icon"></ion-icon>
        </div>
        <h2 class="user-name">{{ user?.name }}</h2>
        <p class="user-info">{{ user?.department }}</p>
        <p class="user-role">{{ user?.role }}</p>
      </div>
      
      <ion-list lines="none">
        <ion-item button router-link="/home" @click="$emit('close')">
          <ion-icon :icon="homeOutline" slot="start"></ion-icon>
          <ion-label>Home</ion-label>
        </ion-item>
        
        <ion-item button router-link="/tms" @click="$emit('close')">
          <ion-icon :icon="carOutline" slot="start"></ion-icon>
          <ion-label>Transport Management</ion-label>
        </ion-item>
        
        <ion-item button router-link="/wms" @click="$emit('close')">
          <ion-icon :icon="cubeOutline" slot="start"></ion-icon>
          <ion-label>Warehouse Management</ion-label>
        </ion-item>
        
        <ion-item-divider></ion-item-divider>
        
        <ion-item button detail>
          <ion-icon :icon="settingsOutline" slot="start"></ion-icon>
          <ion-label>Settings</ion-label>
        </ion-item>
        
        <ion-item button detail>
          <ion-icon :icon="helpCircleOutline" slot="start"></ion-icon>
          <ion-label>Help & Support</ion-label>
        </ion-item>
        
        <ion-item button @click="handleLogout">
          <ion-icon :icon="logOutOutline" slot="start" color="danger"></ion-icon>
          <ion-label color="danger">Logout</ion-label>
        </ion-item>
      </ion-list>
      
      <div class="app-info">
        <p>LumiBright ERP v1.0.0</p>
      </div>
    </ion-content>
  </ion-menu>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import {
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonItemDivider,
  IonLabel,
  IonIcon,
  useIonAlert
} from '@ionic/vue';
import {
  homeOutline,
  personCircleOutline,
  carOutline,
  cubeOutline,
  settingsOutline,
  helpCircleOutline,
  logOutOutline
} from 'ionicons/icons';
import authInstance from '../composables/useAuth';

export default defineComponent({
  name: 'AppSidebar',
  components: {
    IonMenu,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonItemDivider,
    IonLabel,
    IonIcon
  },
  props: {
    isOpen: {
      type: Boolean,
      default: false
    }
  },
  emits: ['close'],
  setup() {
    const [presentAlert] = useIonAlert();
    const { user, logout } = authInstance;
    
    // Generate unique ID for the menu content
    const contentId = computed(() => `menu-content-${Date.now()}`);
    
    const handleLogout = () => {
      presentAlert({
        header: 'Logout',
        message: 'Are you sure you want to logout?',
        buttons: [
          'Cancel',
          {
            text: 'Logout',
            role: 'confirm',
            handler: () => {
              logout();
            },
          },
        ],
      });
    };
    
    return {
      contentId,
      user,
      handleLogout,
      homeOutline,
      personCircleOutline,
      carOutline,
      cubeOutline,
      settingsOutline,
      helpCircleOutline,
      logOutOutline
    };
  }
});
</script>

<style scoped>
.user-profile {
  padding: 2rem 1rem;
  text-align: center;
  background-color: var(--ion-color-light);
}

.avatar {
  margin: 0 auto 1rem;
}

.avatar-icon {
  font-size: 5rem;
  color: var(--ion-color-primary);
}

.user-name {
  margin: 0;
  font-size: 1.2rem;
  font-weight: 600;
}

.user-info {
  margin: 0.5rem 0 0.25rem;
  font-size: 0.9rem;
  color: var(--ion-color-medium);
}

.user-role {
  margin: 0;
  font-size: 0.8rem;
  color: var(--ion-color-primary);
  font-weight: 500;
}

.app-info {
  padding: 1rem;
  text-align: center;
  font-size: 0.8rem;
  color: var(--ion-color-medium);
  margin-top: auto;
}
</style>
