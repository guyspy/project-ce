<template>
  <app-layout :title="'配送 #' + (delivery ? delivery.orderNumber : '')" :back-link="true">
    <ion-content class="ion-padding">
      <!-- 配送狀態卡片 -->
      <ion-card v-if="delivery">
        <ion-card-content>
          <ion-grid class="ion-no-padding">
            <ion-row>
              <ion-col size="12">
                <div class="ion-text-center ion-padding-vertical">
                  <div class="status-badge" :class="getStatusClass(delivery.status)">
                    {{ getStatusText(delivery.status) }}
                  </div>
                </div>
              </ion-col>
            </ion-row>
            <ion-row>
              <ion-col size="6">
                <div class="label">客戶</div>
                <div class="value">{{ delivery.customer }}</div>
              </ion-col>
              <ion-col size="6">
                <div class="label">配送時間</div>
                <div class="value">{{ delivery.time }}</div>
              </ion-col>
            </ion-row>
            <ion-row>
              <ion-col size="12">
                <div class="label">產品</div>
                <div class="value">{{ delivery.products }}</div>
              </ion-col>
            </ion-row>
            <ion-row>
              <ion-col size="12">
                <div class="label">配送地址</div>
                <div class="value">{{ getDeliveryAddress() }}</div>
              </ion-col>
            </ion-row>
          </ion-grid>
        </ion-card-content>
      </ion-card>

      <!-- 配送地圖 -->
      <ion-card class="map-card">
        <ion-card-header>
          <ion-card-title>
            <ion-icon :icon="mapOutline" class="ion-margin-end"></ion-icon>
            配送路線
          </ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <div class="map-container">
            <div class="map-placeholder">
              <ion-icon :icon="locationOutline" class="map-icon"></ion-icon>
              <p>地圖視圖加載中...</p>
            </div>
          </div>
        </ion-card-content>
      </ion-card>

      <!-- 配送進度時間軸 -->
      <ion-card>
        <ion-card-header>
          <ion-card-title>
            <ion-icon :icon="timeOutline" class="ion-margin-end"></ion-icon>
            配送進度
          </ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <div class="timeline">
            <div class="timeline-item" :class="{ 
              'completed': isStepCompleted('delivered'), 
              'current': isCurrentStep('delivered')
            }">
              <div class="timeline-badge">
                <ion-icon :icon="checkmarkCircleOutline" v-if="isStepCompleted('delivered')"></ion-icon>
                <ion-icon :icon="ellipseOutline" v-else-if="!isCurrentStep('delivered')"></ion-icon>
                <ion-icon :icon="radioButtonOnOutline" class="pulse-icon" v-else></ion-icon>
              </div>
              <div class="timeline-content">
                <h3>已送達</h3>
                <p>{{ delivery && delivery.status === 'completed' ? '11:45 AM' : '預計 11:45 AM' }}</p>
              </div>
            </div>
            <div class="timeline-item" :class="{ 
              'completed': isStepCompleted('in-transit'), 
              'current': isCurrentStep('in-transit')
            }">
              <div class="timeline-badge">
                <ion-icon :icon="checkmarkCircleOutline" v-if="isStepCompleted('in-transit')"></ion-icon>
                <ion-icon :icon="ellipseOutline" v-else-if="!isCurrentStep('in-transit')"></ion-icon>
                <ion-icon :icon="radioButtonOnOutline" class="pulse-icon" v-else></ion-icon>
              </div>
              <div class="timeline-content">
                <h3>運送中</h3>
                <p>10:15 AM</p>
              </div>
            </div>
            <div class="timeline-item" :class="{ 
              'completed': isStepCompleted('shipping'), 
              'current': isCurrentStep('shipping')
            }">
              <div class="timeline-badge">
                <ion-icon :icon="checkmarkCircleOutline" v-if="isStepCompleted('shipping')"></ion-icon>
                <ion-icon :icon="ellipseOutline" v-else-if="!isCurrentStep('shipping')"></ion-icon>
                <ion-icon :icon="radioButtonOnOutline" class="pulse-icon" v-else></ion-icon>
              </div>
              <div class="timeline-content">
                <h3>配送出發</h3>
                <p>9:30 AM</p>
              </div>
            </div>
            <div class="timeline-item" :class="{ 
              'completed': isStepCompleted('preparing'), 
              'current': isCurrentStep('preparing')
            }">
              <div class="timeline-badge">
                <ion-icon :icon="checkmarkCircleOutline" v-if="isStepCompleted('preparing')"></ion-icon>
                <ion-icon :icon="ellipseOutline" v-else-if="!isCurrentStep('preparing')"></ion-icon>
                <ion-icon :icon="radioButtonOnOutline" class="pulse-icon" v-else></ion-icon>
              </div>
              <div class="timeline-content">
                <h3>備貨完成</h3>
                <p>9:00 AM</p>
              </div>
            </div>
          </div>
        </ion-card-content>
      </ion-card>

      <!-- 聯絡方式 -->
      <ion-card>
        <ion-card-header>
          <ion-card-title>
            <ion-icon :icon="callOutline" class="ion-margin-end"></ion-icon>
            聯絡方式
          </ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <ion-list lines="none">
            <ion-item>
              <ion-icon :icon="personOutline" slot="start" color="primary"></ion-icon>
              <ion-label>
                <h3>{{ getDriverName() }}</h3>
                <p>配送司機</p>
              </ion-label>
              <ion-button fill="clear" slot="end">
                <ion-icon slot="icon-only" :icon="callOutline"></ion-icon>
              </ion-button>
            </ion-item>
            <ion-item>
              <ion-icon :icon="businessOutline" slot="start" color="primary"></ion-icon>
              <ion-label>
                <h3>{{ delivery ? delivery.customer : '' }}</h3>
                <p>收貨客戶</p>
              </ion-label>
              <ion-button fill="clear" slot="end">
                <ion-icon slot="icon-only" :icon="mailOutline"></ion-icon>
              </ion-button>
            </ion-item>
          </ion-list>
        </ion-card-content>
      </ion-card>

      <!-- 底部操作按鈕 -->
      <div class="footer-buttons ion-padding-top">
        <ion-button expand="block" color="primary">
          <ion-icon :icon="documentTextOutline" slot="start"></ion-icon>
          送貨確認單
        </ion-button>
        <ion-button expand="block" color="secondary" class="ion-margin-top">
          <ion-icon :icon="chatbubbleEllipsesOutline" slot="start"></ion-icon>
          與司機聯繫
        </ion-button>
      </div>
    </ion-content>
  </app-layout>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { 
  IonContent, 
  IonCard, 
  IonCardHeader, 
  IonCardTitle, 
  IonCardContent,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonList,
  IonItem,
  IonLabel,
  modalController
} from '@ionic/vue';
import AppLayout from '../components/AppLayout.vue';
import { 
  mapOutline, 
  timeOutline, 
  checkmarkCircleOutline,
  ellipseOutline,
  radioButtonOnOutline,
  locationOutline,
  callOutline,
  personOutline,
  businessOutline,
  mailOutline,
  chatbubbleEllipsesOutline,
  documentTextOutline
} from 'ionicons/icons';
import authInstance from '../composables/useAuth';

// 配送狀態類型
interface Delivery {
  id: number;
  orderNumber: string;
  customer: string;
  products: string;
  status: 'completed' | 'in-progress' | 'scheduled' | 'delayed';
  time: string;
}

export default defineComponent({
  name: 'DeliveryDetailPage',
  components: {
    AppLayout,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonIcon,
    IonGrid,
    IonRow,
    IonCol,
    IonButton,
    IonList,
    IonItem,
    IonLabel
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const { isAuthenticated } = authInstance;
    
    // 配送數據
    const delivery = ref<Delivery | null>(null);
    
    // 載入配送數據
    onMounted(async () => {
      if (!isAuthenticated.value) {
        router.replace('/login');
        return;
      }
      
      const deliveryId = route.params.id;
      if (deliveryId) {
        // 在真實環境中，這裡會從API獲取數據
        // 這裡我們臨時創建一個模擬數據
        delivery.value = {
          id: Number(deliveryId),
          orderNumber: `LB-${7840 + Number(deliveryId)}`,
          customer: ['Bright Interiors Inc.', 'Modern Living Co.', 'Office Solutions Ltd.'][Number(deliveryId) % 3],
          products: ['LED Panels (50), Spotlights (20)', 'Smart Bulbs (100), RGB Strips (5)', 'Ceiling Lights (30), Emergency Lights (10)'][Number(deliveryId) % 3],
          status: ['completed', 'in-progress', 'scheduled', 'delayed'][Number(deliveryId) % 4] as any,
          time: ['9:30 AM', '10:15 AM', '12:30 PM', '2:45 PM'][Number(deliveryId) % 4]
        };
      }
    });
    
    // 獲取配送狀態文本
    const getStatusText = (status: string) => {
      switch(status) {
        case 'completed': return '已完成';
        case 'in-progress': return '進行中';
        case 'scheduled': return '計劃中';
        case 'delayed': return '已延遲';
        default: return '未知';
      }
    };
    
    // 獲取配送狀態樣式類
    const getStatusClass = (status: string) => {
      switch(status) {
        case 'completed': return 'status-completed';
        case 'in-progress': return 'status-progress';
        case 'scheduled': return 'status-scheduled';
        case 'delayed': return 'status-delayed';
        default: return '';
      }
    };
    
    // 根據配送狀態確定各步驟是否完成
    const isStepCompleted = (step: string) => {
      if (!delivery.value) return false;
      
      const status = delivery.value.status;
      
      if (status === 'completed') {
        return true; // 所有步驟都完成
      }
      
      if (status === 'in-progress') {
        if (step === 'preparing' || step === 'shipping') {
          return true;
        }
        if (step === 'in-transit') {
          return true;
        }
        return false;
      }
      
      if (status === 'scheduled') {
        if (step === 'preparing') {
          return true;
        }
        return false;
      }
      
      return false; // 對於延遲或其他狀態
    };
    
    // 確定當前進行中的步驟
    const isCurrentStep = (step: string) => {
      if (!delivery.value) return false;
      
      const status = delivery.value.status;
      
      if (status === 'completed') {
        return step === 'delivered'; // 已完成時，最後一步是當前步驟
      }
      
      if (status === 'in-progress') {
        return step === 'in-transit'; // 進行中時，運送中是當前步驟
      }
      
      if (status === 'scheduled') {
        return step === 'shipping'; // 計劃中時，配送出發是當前步驟
      }
      
      if (status === 'delayed') {
        return step === 'shipping'; // 延遲時，也顯示配送出發為當前步驟
      }
      
      return false;
    };
    
    // 獲取配送地址（在真實環境中會從API獲取）
    const getDeliveryAddress = () => {
      const addresses = [
        '台北市信義區松高路68號',
        '新北市板橋區縣民大道二段7號',
        '台中市西屯區台灣大道三段99號'
      ];
      return addresses[delivery.value ? delivery.value.id % 3 : 0];
    };
    
    // 獲取司機名稱（在真實環境中會從API獲取）
    const getDriverName = () => {
      const drivers = ['張志明', '王大華', '林小明'];
      return drivers[delivery.value ? delivery.value.id % 3 : 0];
    };
    
    return {
      delivery,
      getStatusText,
      getStatusClass,
      isStepCompleted,
      isCurrentStep,
      getDeliveryAddress,
      getDriverName,
      mapOutline,
      timeOutline,
      checkmarkCircleOutline,
      ellipseOutline,
      radioButtonOnOutline,
      locationOutline,
      callOutline,
      personOutline,
      businessOutline,
      mailOutline,
      chatbubbleEllipsesOutline,
      documentTextOutline
    };
  }
});
</script>

<style scoped>
.status-badge {
  display: inline-block;
  padding: 6px 12px;
  border-radius: 16px;
  font-weight: bold;
  font-size: 0.9rem;
  margin-bottom: 10px;
}

.status-completed {
  background-color: var(--ion-color-success-tint);
  color: var(--ion-color-success-contrast);
}

.status-progress {
  background-color: var(--ion-color-primary-tint);
  color: var(--ion-color-primary-contrast);
}

.status-scheduled {
  background-color: var(--ion-color-warning-tint);
  color: var(--ion-color-warning-contrast);
}

.status-delayed {
  background-color: var(--ion-color-danger-tint);
  color: var(--ion-color-danger-contrast);
}

.label {
  font-size: 0.8rem;
  color: var(--ion-color-medium);
  margin-bottom: 4px;
}

.value {
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 10px;
}

.map-container {
  height: 200px;
  width: 100%;
  background-color: var(--ion-color-light);
  border-radius: 8px;
  overflow: hidden;
}

.map-placeholder {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: var(--ion-color-medium);
}

.map-icon {
  font-size: 2.5rem;
  margin-bottom: 10px;
}

.timeline {
  position: relative;
  padding-left: 30px;
}

.timeline:before {
  content: '';
  position: absolute;
  left: 8px;
  top: 5px;
  height: calc(100% - 10px);
  width: 2px;
  background-color: var(--ion-color-light-shade);
}

.timeline-item {
  position: relative;
  margin-bottom: 20px;
}

.timeline-badge {
  position: absolute;
  left: -30px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: var(--ion-color-light-shade);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: var(--ion-color-light-contrast);
}

.timeline-item.completed .timeline-badge {
  background-color: var(--ion-color-success);
}

.timeline-item.current .timeline-badge {
  background-color: var(--ion-color-primary);
  box-shadow: 0 0 0 5px rgba(var(--ion-color-primary-rgb), 0.2);
}

.timeline-content {
  padding: 5px 0;
}

.timeline-content h3 {
  font-size: 16px;
  margin: 0 0 5px 0;
  font-weight: 500;
}

.timeline-content p {
  margin: 0;
  font-size: 14px;
  color: var(--ion-color-medium);
}

.timeline-item.current .timeline-content h3 {
  color: var(--ion-color-primary);
  font-weight: bold;
}

.pulse-icon {
  animation: pulse 1.5s infinite;
  color: var(--ion-color-primary-contrast);
  font-size: 16px; /* 增加圖標大小 */
}

@keyframes pulse {
  0% {
    transform: scale(0.9);
    opacity: 0.7;
    box-shadow: 0 0 0 0 rgba(var(--ion-color-primary-rgb), 0.5);
  }
  50% {
    transform: scale(1.2);
    opacity: 1;
    box-shadow: 0 0 0 6px rgba(var(--ion-color-primary-rgb), 0);
  }
  100% {
    transform: scale(0.9);
    opacity: 0.7;
    box-shadow: 0 0 0 0 rgba(var(--ion-color-primary-rgb), 0);
  }
}

.footer-buttons {
  margin-bottom: 20px;
}
</style>