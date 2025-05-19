<template>
  <ion-page>
    <ion-content class="ion-padding">
      <div class="splash-container">
        <div class="ion-margin-bottom ion-padding">
          <ion-icon :icon="bulbOutline" class="splash-icon"></ion-icon>
          <h1 class="splash-title">LumiBright</h1>
          <p class="splash-subtitle ion-no-margin">Illuminating Your Business</p>
        </div>
        <ion-progress-bar type="indeterminate" class="splash-progress"></ion-progress-bar>
        <p class="ion-text-medium ion-margin-top">{{ loadingMessage }}</p>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { 
  IonPage, 
  IonContent, 
  IonProgressBar,
  IonIcon 
} from '@ionic/vue';
import { bulbOutline } from 'ionicons/icons';
import { useRouter } from 'vue-router';
import authInstance from '../composables/useAuth';

export default defineComponent({
  name: 'SplashScreen',
  components: {
    IonPage,
    IonContent,
    IonProgressBar,
    IonIcon
  },
  setup() {
    const router = useRouter();
    const loadingMessage = ref('Loading resources...');
    const loadingMessages = [
      'Loading resources...',
      'Connecting to services...',
      'Preparing application...',
      'Almost there...'
    ];
    
    // Simulate loading process
    const simulateLoading = () => {
      let messageIndex = 0;
      
      const interval = setInterval(() => {
        messageIndex = (messageIndex + 1) % loadingMessages.length;
        loadingMessage.value = loadingMessages[messageIndex];
      }, 800);
      
      // Navigate after loading completes
      setTimeout(() => {
        clearInterval(interval);
        // Redirect to login or home based on authentication status
        if (authInstance.isAuthenticated.value) {
          router.replace('/home');
        } else {
          router.replace('/login');
        }
      }, 3000);
    };
    
    onMounted(() => {
      simulateLoading();
    });
    
    return {
      loadingMessage,
      bulbOutline
    };
  }
});
</script>

<style scoped>
.splash-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.splash-icon {
  font-size: 5rem;
  color: var(--ion-color-primary);
}

.splash-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0.5rem 0;
  background: linear-gradient(to right, var(--ion-color-primary), var(--ion-color-secondary));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.splash-subtitle {
  font-size: 1.2rem;
  color: var(--ion-color-medium);
}

.splash-progress {
  width: 80%;
  margin: 1rem 0;
}
</style>
