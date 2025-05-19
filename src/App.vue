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
    // 用來將 ion-palette-dark 類別添加或移除
    const toggleDarkPalette = (shouldAdd: boolean) => {
      document.documentElement.classList.toggle('ion-palette-dark', shouldAdd);
    };
    
    // 設定全域方法用於設定主題模式
    window.setAppTheme = (theme: 'dark' | 'light' | 'system') => {
      if (theme === 'system') {
        // 移除用戶設定，讓系統偏好決定
        localStorage.removeItem('theme');
        // 檢查系統偏好
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        toggleDarkPalette(prefersDark);
      } else if (theme === 'dark') {
        localStorage.setItem('theme', 'dark');
        toggleDarkPalette(true);
      } else {
        localStorage.setItem('theme', 'light');
        toggleDarkPalette(false);
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
        toggleDarkPalette(true);
      } else if (savedTheme === 'light') {
        toggleDarkPalette(false);
      } else {
        // 使用系統偏好
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        toggleDarkPalette(prefersDark);
        
        // 監聽系統主題變化
        window.matchMedia('(prefers-color-scheme: dark)')
          .addEventListener('change', ({ matches }) => {
            // 只在沒有用戶設定的情況下跟隨系統
            if (!localStorage.getItem('theme')) {
              toggleDarkPalette(matches);
            }
          });
      }
    });
  }
});
</script>

<style>
/* All color variables have been moved to src/theme/variables.css */
body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
}
</style>
