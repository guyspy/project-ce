<template>
  <ion-page>
    <ion-content>
      <div class="login-container">
        <div class="logo-section">
          <ion-icon :icon="bulbOutline" class="logo-icon"></ion-icon>
          <h1 class="company-name">LumiBright</h1>
          <p class="tagline">Illuminating Your Business</p>
        </div>
        
        <form @submit.prevent="handleLogin" class="login-form">
          <h2 class="login-title">員工登入</h2>
          
          <ion-item class="form-input">
            <ion-label position="floating">使用者名稱</ion-label>
            <ion-input type="text" v-model="username" required></ion-input>
          </ion-item>
          
          <ion-item class="form-input">
            <ion-label position="floating">密碼</ion-label>
            <ion-input type="password" v-model="password" required></ion-input>
          </ion-item>
          
          <ion-button type="submit" expand="block" class="login-button" :disabled="isLoading">
            <ion-spinner v-if="isLoading" name="crescent"></ion-spinner>
            <span v-else>登入</span>
          </ion-button>
          
          <ion-text color="danger" v-if="error">
            <p class="error-message">{{ error }}</p>
          </ion-text>
        </form>
        
        <div class="app-version">
          <p>LumiBright ERP v1.0.0</p>
        </div>
      </div>
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
  IonSpinner
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
    IonSpinner
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
.login-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 2rem;
}

.logo-section {
  text-align: center;
  margin-top: 2rem;
  margin-bottom: 2rem;
}

.logo-icon {
  font-size: 4rem;
  color: var(--ion-color-primary);
}

.company-name {
  font-size: 2rem;
  font-weight: 700;
  margin: 0.5rem 0;
  background: linear-gradient(to right, var(--ion-color-primary), var(--ion-color-secondary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.tagline {
  font-size: 1rem;
  color: var(--ion-color-medium);
  margin: 0;
}

.login-form {
  background: var(--ion-background-color);
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin-bottom: auto;
}

.login-title {
  margin-top: 0;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  font-weight: 600;
  text-align: center;
  color: var(--ion-text-color);
}

.form-input {
  --padding-start: 0;
  margin-bottom: 1rem;
  --border-color: var(--ion-color-medium);
}

.login-button {
  margin-top: 1.5rem;
  --border-radius: 8px;
  height: 48px;
}

.error-message {
  text-align: center;
  font-size: 0.9rem;
  margin-top: 1rem;
}

.app-version {
  text-align: center;
  margin-top: auto;
  margin-bottom: 1rem;
  color: var(--ion-color-medium);
  font-size: 0.8rem;
}
</style>
