<template>
  <ion-page>
    <ion-content class="ion-padding">
      <ion-grid class="ion-height-full">
        <ion-row class="ion-justify-content-center ion-align-items-center ion-height-full">
          <ion-col size="12" size-sm="8" size-md="6" size-lg="4" class="ion-no-padding">
            
            <!-- Logo Section -->
            <div class="ion-text-center ion-margin-top ion-margin-bottom">
              <ion-icon :icon="bulbOutline" size="large" color="primary" class="logo-icon"></ion-icon>
              <h1 class="gradient-text">LumiBright</h1>
              <ion-text color="medium"><p>Illuminating Your Business</p></ion-text>
            </div>
            
            <!-- Login Form -->
            <ion-card>
              <ion-card-header>
                <ion-card-title class="ion-text-center">員工登入</ion-card-title>
              </ion-card-header>
              
              <ion-card-content>
                <form @submit.prevent="handleLogin">
                  <ion-list class="ion-no-padding">
                    <ion-item>
                      <ion-input label="使用者名稱" v-model="username" required></ion-input>
                    </ion-item>
                    
                    <ion-item>
                      <ion-input label="密碼" type="password" v-model="password" required>
                          <ion-input-password-toggle slot="end"></ion-input-password-toggle>
                      </ion-input>
                    </ion-item>
                    
                    <ion-text color="danger" v-if="error" class="ion-text-center ion-padding-top">
                      {{ error }}
                    </ion-text>
                  </ion-list>
                  
                  <ion-button type="submit" expand="block" class="ion-margin-top" :disabled="isLoading">
                    <ion-spinner v-if="isLoading" name="crescent"></ion-spinner>
                    <span v-else>登入</span>
                  </ion-button>
                </form>
              </ion-card-content>
            </ion-card>
            
            <!-- App Version -->
            <div class="ion-text-center ion-padding-top">
              <ion-text color="medium"><small>LumiBright ERP v1.0.0</small></ion-text>
            </div>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { 
  IonPage, 
  IonContent, 
  IonItem, 
  IonLabel, 
  IonInput, 
  IonButton,
  IonText,
  IonIcon,
  IonSpinner,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonList,
  IonInputPasswordToggle
} from '@ionic/vue';
import { toastController } from '@ionic/vue';
import { bulbOutline } from 'ionicons/icons';
import { useRouter } from 'vue-router';
import authInstance from '../composables/useAuth';

export default defineComponent({
  name: 'LoginPage',
  components: {
    IonPage,
    IonContent,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonText,
    IonIcon,
    IonSpinner,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonList
  },
  setup() {
    const router = useRouter();
    const username = ref('');
    const password = ref('');
    const { isLoading, error, login } = authInstance;
    
    // Check if user is already logged in
    onMounted(() => {
      if (authInstance.isAuthenticated.value) {
        router.replace('/home');
      }
    });
    
    const handleLogin = async () => {
      if (!username.value || !password.value) {
        const toast = await toastController.create({
          message: '請輸入使用者名稱和密碼',
          duration: 2000,
          position: 'bottom',
          color: 'danger'
        });
        await toast.present();
        return;
      }
      
      const success = await login(username.value, password.value);
      
      if (success) {
        const toast = await toastController.create({
          message: '登入成功',
          duration: 2000,
          position: 'bottom',
          color: 'success'
        });
        await toast.present();
        router.replace('/home');
      }
    };
    
    return {
      username,
      password,
      isLoading,
      error,
      handleLogin,
      bulbOutline
    };
  }
});
</script>

<style scoped>
/* 大部分樣式已由 Ionic 的內置類處理 */

/* 自定義漸變文字效果 - 從全局樣式中引用 */
.gradient-text {
  font-size: 2rem;
  font-weight: 700;
  background: linear-gradient(to right, var(--ion-color-primary), var(--ion-color-secondary));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0.5rem 0;
}

/* 調整 logo 大小 */
.logo-icon {
  font-size: 4rem !important;
}

/* 使 grid 填滿整個高度 */
.ion-height-full {
  height: 100%;
}
</style>
