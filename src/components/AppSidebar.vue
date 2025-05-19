<template>
  <ion-menu side="end" content-id="main-content" :is-open="isOpen" @ionDidClose="$emit('close')">
    <ion-header>
      <ion-toolbar>
        <ion-title>選單</ion-title>
        <ion-buttons slot="end">
          <ion-button id="close-menu">
            <ion-icon :icon="closeOutline" slot="icon-only"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-item lines="none">
        <ion-icon :icon="personCircleOutline" slot="start" style="font-size: 2rem"></ion-icon>
        <ion-label>
          <h2>{{ user?.name }}</h2>
          <p>{{ user?.department }}</p>
          <p>{{ user?.role }}</p>
        </ion-label>
      </ion-item>
      
      <ion-list lines="none">
        <ion-item button router-link="/home" @click="$emit('close')">
          <ion-icon :icon="homeOutline" slot="start"></ion-icon>
          <ion-label>首頁</ion-label>
        </ion-item>
        
        <ion-item button router-link="/tms" @click="$emit('close')">
          <ion-icon :icon="carOutline" slot="start"></ion-icon>
          <ion-label>TMS 運輸管理</ion-label>
        </ion-item>
        
        <ion-item button router-link="/wms" @click="$emit('close')">
          <ion-icon :icon="cubeOutline" slot="start"></ion-icon>
          <ion-label>WMS 倉儲管理</ion-label>
        </ion-item>
        
        <ion-item-divider></ion-item-divider>
        
        <ion-item button @click="goToSettings">
          <ion-icon :icon="settingsOutline" slot="start"></ion-icon>
          <ion-label>顯示設定</ion-label>
        </ion-item>
        
        <ion-item button detail>
          <ion-icon :icon="helpCircleOutline" slot="start"></ion-icon>
          <ion-label>幫助與支援</ion-label>
        </ion-item>
        
        <!-- 關於應用程式 -->
        <ion-item button @click="showAbout">
          <ion-icon :icon="informationCircleOutline" slot="start"></ion-icon>
          <ion-label>關於應用程式</ion-label>
        </ion-item>
        
        <ion-item button @click="handleLogout">
          <ion-icon :icon="logOutOutline" slot="start" color="danger"></ion-icon>
          <ion-label color="danger">登出</ion-label>
        </ion-item>
      </ion-list>
      
      <div class="app-info">
        <p>LumiBright ERP v1.0.0</p>
      </div>
    </ion-content>
  </ion-menu>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { menuController } from '@ionic/vue';
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
  IonButton,
  IonButtons,
  IonMenuToggle
} from '@ionic/vue';
import { alertController } from '@ionic/vue';
import {
  homeOutline,
  personCircleOutline,
  personOutline,
  carOutline,
  cubeOutline,
  settingsOutline,
  helpCircleOutline,
  logOutOutline,
  closeOutline,
  informationCircleOutline
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
    IonButton,
    IonButtons,
    IonItemDivider,
    IonLabel,
    IonIcon,
    IonMenuToggle
  },
  props: {
    isOpen: {
      type: Boolean,
      default: false
    }
  },
  emits: ['close'],
  setup(props, { emit }) {
    const router = useRouter();
    const { user } = authInstance;
    
    // 添加關閉菜單的事件監聽
    const setupCloseMenuEvent = () => {
      setTimeout(() => {
        const closeBtn = document.getElementById('close-menu');
        if (closeBtn) {
          closeBtn.addEventListener('click', async () => {
            console.log('Close button clicked');
            await menuController.close('end');
            emit('close');
          });
        }
      }, 100);
    };
    const isThemeSettingsOpen = ref(false);
    
    // 手動實現登出功能
    const logout = () => {
      localStorage.removeItem('user');
      router.replace('/login');
    };
    
    const handleLogout = async () => {
      const alert = await alertController.create({
        header: '登出',
        message: '您確定要登出嗎？',
        buttons: [
          '取消',
          {
            text: '登出',
            role: 'confirm',
            handler: () => {
              logout();
            },
          },
        ],
      });
      
      await alert.present();
    };
    
    const goToSettings = () => {
      router.push('/settings');
      emit('close');
    };
    
    // 顯示關於對話框
    const showAbout = async () => {
      const alert = await alertController.create({
        header: '關於 LumiBright ERP',
        subHeader: '版本 1.0.0 (2023)',
        message: '© 2023 LumiBright 科技公司版權所有。未經授權不得複製或分發。',
        buttons: ['確定']
      });
      
      await alert.present();
      emit('close');
    };
    
    return {
      user,
      handleLogout,
      goToSettings,
      showAbout,
      closeMenu,
      closeOutline,
      homeOutline,
      personCircleOutline,
      personOutline,
      carOutline,
      cubeOutline,
      settingsOutline,
      helpCircleOutline,
      logOutOutline,
      informationCircleOutline
    };
  }
});
</script>

<style>
/* 使用 Ionic 默認樣式 */
</style>
