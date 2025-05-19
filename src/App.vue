<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { defineComponent, onMounted } from 'vue';

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
    // 設定全域方法用於設定主題模式
    window.setAppTheme = (theme: 'dark' | 'light' | 'system') => {
      if (theme === 'system') {
        // 移除 dark 類別，讓系統偏好決定
        localStorage.removeItem('theme');
        document.documentElement.classList.remove('dark');
        
        // 使用系統偏好
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDark) {
          document.documentElement.classList.add('dark');
        }
      } else if (theme === 'dark') {
        localStorage.setItem('theme', 'dark');
        document.documentElement.classList.add('dark');
      } else {
        localStorage.setItem('theme', 'light');
        document.documentElement.classList.remove('dark');
      }
    };
    
    // 設定全域方法用於設定平台樣式
    window.setPlatformStyle = (platform: 'ios' | 'md') => {
      document.documentElement.classList.remove('ios', 'md');
      document.documentElement.classList.add(platform);
      localStorage.setItem('platform', platform);
    };
    
    // 初始化主題和平台設定
    onMounted(() => {
      // 設置平台樣式
      const savedPlatform = localStorage.getItem('platform') || 'ios';
      document.documentElement.classList.add(savedPlatform);
      
      // 設置深色/淺色模式
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else if (savedTheme === 'light') {
        document.documentElement.classList.remove('dark');
      } else {
        // 使用系統偏好
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDark) {
          document.documentElement.classList.add('dark');
        }
        
        // 監聽系統主題變化
        window.matchMedia('(prefers-color-scheme: dark)')
          .addEventListener('change', ({ matches }) => {
            // 只在沒有用戶設定的情況下跟隨系統
            if (!localStorage.getItem('theme')) {
              if (matches) {
                document.documentElement.classList.add('dark');
              } else {
                document.documentElement.classList.remove('dark');
              }
            }
          });
      }
    });
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
