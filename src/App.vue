<template>
  <ion-app :class="{ 'dark-theme': isDarkMode }">
    <ion-router-outlet />
  </ion-app>
</template>

<script lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { defineComponent, onMounted, ref, watch } from 'vue';

// 聲明 window 上的全局方法
declare global {
  interface Window {
    setAppTheme: (theme: 'dark' | 'light' | 'system') => void;
    setPlatformStyle: (platform: 'ios' | 'md') => void;
  }
}

export default defineComponent({
  name: 'App',
  components: {
    IonApp,
    IonRouterOutlet
  },
  setup() {
    // 建立全域 theme 參考
    const isDarkMode = ref(false);
    
    // 偵測系統深色模式
    const detectColorScheme = () => {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      
      // 首先檢查用戶設定，如果沒有則使用系統設定
      const savedTheme = localStorage.getItem('theme');
      
      if (savedTheme === 'dark') {
        isDarkMode.value = true;
      } else if (savedTheme === 'light') {
        isDarkMode.value = false;
      } else {
        isDarkMode.value = prefersDark;
      }
      
      // 更新文檔主體類別以便可以套用全域樣式
      updateTheme();
    };
    
    // 監聽系統深色模式變化
    const setupColorSchemeListener = () => {
      window.matchMedia('(prefers-color-scheme: dark)')
        .addEventListener('change', ({ matches }) => {
          // 只有在沒有用戶設定的情況下才跟隨系統設定
          if (!localStorage.getItem('theme')) {
            isDarkMode.value = matches;
            updateTheme();
          }
        });
    };
    
    // 更新深色模式設定
    const updateTheme = () => {
      // 首先移除所有相關的類
      document.documentElement.classList.remove('ios', 'md', 'dark');
      
      // 設置平台樣式 (預設使用 iOS)
      const platform = localStorage.getItem('platform') || 'ios';
      document.documentElement.classList.add(platform);
      
      // 設置深色/淺色模式 (僅在 HTML 根元素上添加)
      if (isDarkMode.value) {
        document.documentElement.classList.add('dark');
        // 設置 CSS 變量以確保顏色正確
        document.documentElement.style.setProperty('--ion-background-color', 'var(--ion-background-color-dark)');
        document.documentElement.style.setProperty('--ion-text-color', 'var(--ion-text-color-dark)');
      } else {
        // 恢復淺色模式的 CSS 變量
        document.documentElement.style.removeProperty('--ion-background-color');
        document.documentElement.style.removeProperty('--ion-text-color');
      }
    };
    
    // 設定全域方法用於設定模式
    window.setAppTheme = (theme: 'dark' | 'light' | 'system') => {
      if (theme === 'system') {
        localStorage.removeItem('theme');
        isDarkMode.value = window.matchMedia('(prefers-color-scheme: dark)').matches;
      } else {
        localStorage.setItem('theme', theme);
        isDarkMode.value = theme === 'dark';
      }
      updateTheme();
    };
    
    // 設定全域方法用於設定平台樣式
    window.setPlatformStyle = (platform: 'ios' | 'md') => {
      localStorage.setItem('platform', platform);
      updateTheme();
    };
    
    // 監控深色模式變化
    watch(isDarkMode, () => {
      updateTheme();
    });
    
    onMounted(() => {
      detectColorScheme();
      setupColorSchemeListener();
    });
    
    return {
      isDarkMode
    };
  }
});
</script>

<style>
:root {
  /* Primary brand colors for lighting company */
  --ion-color-primary: #3880ff;
  --ion-color-primary-rgb: 56, 128, 255;
  --ion-color-primary-contrast: #ffffff;
  --ion-color-primary-contrast-rgb: 255, 255, 255;
  --ion-color-primary-shade: #3171e0;
  --ion-color-primary-tint: #4c8dff;

  /* Secondary color - warm yellow/amber for lighting */
  --ion-color-secondary: #ffc409;
  --ion-color-secondary-rgb: 255, 196, 9;
  --ion-color-secondary-contrast: #000000;
  --ion-color-secondary-contrast-rgb: 0, 0, 0;
  --ion-color-secondary-shade: #e0ac08;
  --ion-color-secondary-tint: #ffca22;
  
  /* Safe area inset padding */
  --ion-safe-area-top: env(safe-area-inset-top);
  --ion-safe-area-bottom: env(safe-area-inset-bottom);
  --ion-safe-area-left: env(safe-area-inset-left);
  --ion-safe-area-right: env(safe-area-inset-right);
}

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
}
</style>
