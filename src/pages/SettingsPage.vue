<template>
  <app-layout title="設定">
    <ion-content>
      <ion-list>
        <ion-item-group>
          <ion-item-divider>
            <ion-label>外觀設定</ion-label>
          </ion-item-divider>
          
          <ion-item>
            <ion-label>主題模式</ion-label>
            <ion-select 
              :value="currentTheme"
              @ionChange="handleThemeChange($event)"
              interface="popover"
              placeholder="選擇主題模式"
            >
              <ion-select-option value="system">跟隨系統</ion-select-option>
              <ion-select-option value="light">淺色模式</ion-select-option>
              <ion-select-option value="dark">深色模式</ion-select-option>
            </ion-select>
          </ion-item>
          
          <ion-item>
            <ion-label>介面風格</ion-label>
            <ion-select 
              :value="currentPlatform"
              @ionChange="handlePlatformChange($event)"
              interface="popover"
              placeholder="選擇介面風格"
            >
              <ion-select-option value="ios">iOS 風格</ion-select-option>
              <ion-select-option value="md">Android 風格</ion-select-option>
            </ion-select>
          </ion-item>
        </ion-item-group>
        
        <ion-item-group>
          <ion-item-divider>
            <ion-label>用戶資訊</ion-label>
          </ion-item-divider>
          
          <ion-item>
            <ion-label>
              <h2>{{ user.name }}</h2>
              <p>{{ user.department }} - {{ user.role }}</p>
            </ion-label>
          </ion-item>
        </ion-item-group>
        
        <ion-item-group>
          <ion-item-divider>
            <ion-label>關於應用程式</ion-label>
          </ion-item-divider>
          
          <ion-item detail @click="showAbout">
            <ion-label>版本訊息</ion-label>
          </ion-item>
          
          <ion-item detail>
            <ion-label>隱私政策</ion-label>
          </ion-item>
          
          <ion-item detail>
            <ion-label>使用條款</ion-label>
          </ion-item>
        </ion-item-group>
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
  IonItemDivider,
  IonItemGroup,
  IonLabel,
  IonSelect,
  IonSelectOption,
  alertController
} from '@ionic/vue';
import AppLayout from '../components/AppLayout.vue';
import authInstance from '../composables/useAuth';

export default defineComponent({
  name: 'SettingsPage',
  components: {
    IonContent,
    IonList,
    IonItem,
    IonItemDivider,
    IonItemGroup,
    IonLabel,
    IonSelect,
    IonSelectOption,
    AppLayout
  },
  setup() {
    const { user } = authInstance;
    // 確保用戶已登入，否則會有 null 的問題
    const currentTheme = ref(localStorage.getItem('theme') || 'system');
    const currentPlatform = ref(localStorage.getItem('platform') || 'ios');
    
    // 處理主題變更
    const handleThemeChange = (event: CustomEvent) => {
      const theme = event.detail.value;
      currentTheme.value = theme;
      window.setAppTheme(theme);
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
      handleThemeChange,
      handlePlatformChange,
      showAbout
    };
  }
});
</script>