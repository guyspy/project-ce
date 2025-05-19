<template>
  <app-layout title="顯示設定">
    <ion-content>
      <ion-list-header>外觀</ion-list-header>
      <ion-list :inset="true">
        <ion-item>
          <ion-label>深色模式</ion-label>
          <ion-toggle :checked="paletteToggle" @ionChange="toggleChange($event)" justify="space-between"></ion-toggle>
        </ion-item>
      </ion-list>
    </ion-content>
  </app-layout>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import {
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  IonListHeader,
  IonToggle,
  alertController
} from '@ionic/vue';
import {
  moonOutline,
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
    IonToggle,
    AppLayout
  },
  setup() {
    const { user } = authInstance;
    const paletteToggle = ref(false);
    
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
      paletteToggle,
      toggleChange,
      // 引入圖標
      moonOutline,
      sunnyOutline,
      sunny
    };
  }
});
</script>

<style>
/* 保持最小化設置，使用 Ionic 默認樣式 */
</style>