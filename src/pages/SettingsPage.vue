<template>
  <app-layout title="設定">
    <ion-content>
      <div class="ios-settings-container">
        <ion-list class="ios-settings-list" lines="full">
          <ion-list-header>
            <ion-label>外觀設定</ion-label>
          </ion-list-header>
          
                  <ion-item>
            <ion-icon name="moon-outline" slot="start" class="settings-icon"></ion-icon>
            <ion-label>深色模式</ion-label>
            <ion-toggle 
              :checked="currentTheme === 'dark'" 
              @ionChange="toggleDarkMode($event)"
              justify="space-between">
            </ion-toggle>
          </ion-item>
          
          <ion-item detail @click="openThemeModal">
            <ion-icon name="color-palette-outline" slot="start" class="settings-icon"></ion-icon>
            <ion-label>
              <h2>主題選項</h2>
              <p>{{ themeText }}</p>
            </ion-label>
          </ion-item>
          
          <ion-item detail @click="openPlatformModal">
            <ion-icon name="phone-portrait-outline" slot="start" class="settings-icon"></ion-icon>
            <ion-label>
              <h2>介面風格</h2>
              <p>{{ platformText }}</p>
            </ion-label>
          </ion-item>
        </ion-list>
        
        <ion-list class="ios-settings-list" lines="full">
          <ion-list-header>
            <ion-label>帳戶資訊</ion-label>
          </ion-list-header>
          
          <ion-item>
            <ion-icon name="person-outline" slot="start" class="settings-icon"></ion-icon>
            <ion-label>
              <h2>{{ user.name }}</h2>
              <p>{{ user.department }} - {{ user.role }}</p>
            </ion-label>
          </ion-item>
        </ion-list>
        
        <ion-list class="ios-settings-list" lines="full">
          <ion-list-header>
            <ion-label>關於應用程式</ion-label>
          </ion-list-header>
          
          <ion-item detail @click="showAbout">
            <ion-icon name="information-circle-outline" slot="start" class="settings-icon"></ion-icon>
            <ion-label>
              <h2>版本訊息</h2>
              <p>LumiBright ERP v1.0.0</p>
            </ion-label>
          </ion-item>
          
          <ion-item detail>
            <ion-icon name="shield-outline" slot="start" class="settings-icon"></ion-icon>
            <ion-label>
              <h2>隱私政策</h2>
            </ion-label>
          </ion-item>
          
          <ion-item detail>
            <ion-icon name="document-text-outline" slot="start" class="settings-icon"></ion-icon>
            <ion-label>
              <h2>使用條款</h2>
            </ion-label>
          </ion-item>
        </ion-list>
      </div>
    </ion-content>
    
    <!-- 主題選擇模態視窗 -->
    <ion-modal ref="themeModal" :is-open="isThemeModalOpen" @didDismiss="isThemeModalOpen = false">
      <ion-header>
        <ion-toolbar>
          <ion-title>選擇主題模式</ion-title>
          <ion-buttons slot="end">
            <ion-button @click="isThemeModalOpen = false">完成</ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        <ion-radio-group :value="currentTheme" @ionChange="handleThemeChange($event)">
          <ion-item>
            <ion-label>跟隨系統</ion-label>
            <ion-radio slot="start" value="system"></ion-radio>
          </ion-item>
          <ion-item>
            <ion-label>淺色模式</ion-label>
            <ion-radio slot="start" value="light"></ion-radio>
          </ion-item>
          <ion-item>
            <ion-label>深色模式</ion-label>
            <ion-radio slot="start" value="dark"></ion-radio>
          </ion-item>
        </ion-radio-group>
      </ion-content>
    </ion-modal>
    
    <!-- 平台選擇模態視窗 -->
    <ion-modal ref="platformModal" :is-open="isPlatformModalOpen" @didDismiss="isPlatformModalOpen = false">
      <ion-header>
        <ion-toolbar>
          <ion-title>選擇介面風格</ion-title>
          <ion-buttons slot="end">
            <ion-button @click="isPlatformModalOpen = false">完成</ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        <ion-radio-group :value="currentPlatform" @ionChange="handlePlatformChange($event)">
          <ion-item>
            <ion-label>iOS 風格</ion-label>
            <ion-radio slot="start" value="ios"></ion-radio>
          </ion-item>
          <ion-item>
            <ion-label>Android 風格</ion-label>
            <ion-radio slot="start" value="md"></ion-radio>
          </ion-item>
        </ion-radio-group>
      </ion-content>
    </ion-modal>
  </app-layout>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, computed } from 'vue';
import {
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  IonListHeader,
  IonRadioGroup,
  IonRadio,
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  alertController
} from '@ionic/vue';
import {
  moonOutline,
  phonePortraitOutline,
  personOutline,
  informationCircleOutline,
  shieldOutline,
  documentTextOutline
} from 'ionicons/icons';
import AppLayout from '../components/AppLayout.vue';
import authInstance from '../composables/useAuth';

export default defineComponent({
  name: 'SettingsPage',
  components: {
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonIcon,
    IonListHeader,
    IonRadioGroup,
    IonRadio,
    IonModal,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    AppLayout
  },
  setup() {
    const { user } = authInstance;
    // 確保用戶已登入，否則會有 null 的問題
    const currentTheme = ref(localStorage.getItem('theme') || 'system');
    const currentPlatform = ref(localStorage.getItem('platform') || 'ios');
    
    // 模態窗口控制
    const isThemeModalOpen = ref(false);
    const isPlatformModalOpen = ref(false);
    
    // 計算顯示文本
    const themeText = computed(() => {
      switch(currentTheme.value) {
        case 'light': return '淺色模式';
        case 'dark': return '深色模式';
        default: return '跟隨系統';
      }
    });
    
    const platformText = computed(() => {
      return currentPlatform.value === 'ios' ? 'iOS 風格' : 'Android 風格';
    });
    
    // 打開主題模態窗口
    const openThemeModal = () => {
      isThemeModalOpen.value = true;
    };
    
    // 打開平台模態窗口
    const openPlatformModal = () => {
      isPlatformModalOpen.value = true;
    };
    
    // 處理主題變更
    const handleThemeChange = (event: CustomEvent) => {
      const theme = event.detail.value;
      currentTheme.value = theme;
      window.setAppTheme(theme);
    };
    
    // 切換深色模式的開關
    const toggleDarkMode = (event: CustomEvent) => {
      const isDark = event.detail.checked;
      const newTheme = isDark ? 'dark' : 'light';
      currentTheme.value = newTheme;
      window.setAppTheme(newTheme);
    };
    
    // 處理平台風格變更
    const handlePlatformChange = (event: CustomEvent) => {
      const platform = event.detail.value;
      currentPlatform.value = platform;
      window.setPlatformStyle(platform);
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
    };
    
    // 頁面載入時確保主題和平台設定一致
    onMounted(() => {
      window.setAppTheme(currentTheme.value);
      window.setPlatformStyle(currentPlatform.value);
    });
    
    return {
      user,
      currentTheme,
      currentPlatform,
      themeText,
      platformText,
      isThemeModalOpen,
      isPlatformModalOpen,
      openThemeModal,
      openPlatformModal,
      handleThemeChange,
      handlePlatformChange,
      toggleDarkMode,
      showAbout,
      // 引入圖標
      moonOutline,
      phonePortraitOutline,
      personOutline,
      informationCircleOutline,
      shieldOutline,
      documentTextOutline
    };
  }
});
</script>

<style scoped>
.ios-settings-container {
  margin: 0;
  padding: 16px 0;
  background-color: var(--ion-background-color);
}

.ios-settings-list {
  margin-bottom: 16px;
  border-radius: 10px;
  overflow: hidden;
  background-color: var(--ion-item-background);
}

.settings-icon {
  margin-right: 16px;
  font-size: 20px;
  color: var(--ion-color-medium);
}

ion-list-header {
  font-size: 14px;
  color: var(--ion-color-medium);
  padding-left: 16px;
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

ion-item h2 {
  font-weight: 500;
  font-size: 16px;
  margin: 0;
}

ion-item p {
  color: var(--ion-color-medium);
  font-size: 14px;
  margin: 5px 0 0 0;
}
</style>