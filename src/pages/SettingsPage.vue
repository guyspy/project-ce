<template>
  <app-layout title="顯示設定">
    <ion-content>
      <ion-list-header>外觀</ion-list-header>
      <ion-list :inset="true">
        <ion-item>
          <ion-label>深色模式</ion-label>
          <ion-toggle :checked="paletteToggle" @ionChange="toggleChange($event)" justify="space-between"></ion-toggle>
        </ion-item>
        
        <ion-item detail @click="openPlatformModal">
          <ion-label>介面風格</ion-label>
          <ion-text slot="end" color="medium">{{ platformText }}</ion-text>
        </ion-item>
      </ion-list>
    </ion-content>
    
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
  IonToggle,
  IonText,
  alertController
} from '@ionic/vue';
import {
  moonOutline,
  phonePortraitOutline,
  personOutline,
  personCircle,
  personCircleOutline,
  sunnyOutline,
  sunny
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
    IonToggle,
    IonText,
    AppLayout
  },
  setup() {
    const { user } = authInstance;
    const paletteToggle = ref(false);
    const currentPlatform = ref(localStorage.getItem('platform') || 'ios');
    const isPlatformModalOpen = ref(false);
    
    const platformText = computed(() => {
      return currentPlatform.value === 'ios' ? 'iOS 風格' : 'Android 風格';
    });
    
    // 打開平台模態窗口
    const openPlatformModal = () => {
      isPlatformModalOpen.value = true;
    };
    
    // 處理平台風格變更
    const handlePlatformChange = (event: CustomEvent) => {
      const platform = event.detail.value;
      currentPlatform.value = platform;
      window.setPlatformStyle(platform);
    };
    
    // 用來將 ion-palette-dark 類別添加或移除
    const toggleDarkPalette = (shouldAdd: boolean) => {
      document.documentElement.classList.toggle('ion-palette-dark', shouldAdd);
      paletteToggle.value = shouldAdd;
    };
    
    // 監聽開關變化來切換深色模式
    const toggleChange = (event: CustomEvent) => {
      toggleDarkPalette(event.detail.checked);
      // 保存設定到本地存儲
      localStorage.setItem('theme', event.detail.checked ? 'dark' : 'light');
    };
    
    // 使用 matchMedia 檢查用戶偏好
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    
    // 初始化深色調色板
    const initializeDarkPalette = (isDark: boolean) => {
      paletteToggle.value = isDark;
      toggleDarkPalette(isDark);
    };
    
    // 頁面載入時初始化設定
    onMounted(() => {
      // 設置平台風格
      window.setPlatformStyle(currentPlatform.value);
      
      // 檢查深色模式設定
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'dark') {
        initializeDarkPalette(true);
      } else if (savedTheme === 'light') {
        initializeDarkPalette(false);
      } else {
        // 根據系統偏好初始化
        initializeDarkPalette(prefersDark.matches);
        
        // 監聽系統偏好變化
        prefersDark.addEventListener('change', (mediaQuery) => {
          // 只在沒有用戶設定時自動切換
          if (!localStorage.getItem('theme')) {
            initializeDarkPalette(mediaQuery.matches);
          }
        });
      }
    });
    
    return {
      user,
      currentPlatform,
      platformText,
      isPlatformModalOpen,
      openPlatformModal,
      handlePlatformChange,
      paletteToggle,
      toggleChange,
      // 引入圖標
      personCircle,
      personCircleOutline,
      moonOutline,
      phonePortraitOutline,
      sunnyOutline,
      sunny
    };
  }
});
</script>

<style>
/* 保持最小化設置，使用 Ionic 默認樣式 */
</style>