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
              <p>配送地址: {{ getDeliveryAddress() }}</p>
              <p v-if="delivery">坐標位置: {{ getDeliveryCoordinates().lat.toFixed(4) }}, {{ getDeliveryCoordinates().lng.toFixed(4) }}</p>
              <p class="map-note">點擊查看完整地圖</p>
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
                <p>{{ deliveryTimeline.find(t => t.step === 'delivered')?.time || '預計 11:45 AM' }}</p>
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
                <p>{{ deliveryTimeline.find(t => t.step === 'in-transit')?.time || '10:15 AM' }}</p>
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
                <p>{{ deliveryTimeline.find(t => t.step === 'shipping')?.time || '9:30 AM' }}</p>
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
                <p>{{ deliveryTimeline.find(t => t.step === 'preparing')?.time || '9:00 AM' }}</p>
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
              <ion-icon :icon="carOutline" slot="start" color="tertiary"></ion-icon>
              <ion-label>
                <h3>{{ getVehicleInfo() }}</h3>
                <p>配送車輛</p>
                <div v-if="assignedVehicle" class="vehicle-status" :class="'vehicle-' + assignedVehicle.status">
                  {{ {'available': '可用', 'in-use': '使用中', 'maintenance': '維修中'}[assignedVehicle.status] }}
                </div>
              </ion-label>
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
import { deliveryData, DeliveryItem, vehicleData, Vehicle } from '../utils/mockData';

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
    const delivery = ref<DeliveryItem | null>(null);
    
    // 分配司機資訊
    const assignedVehicle = ref<Vehicle | null>(null);
    
    // 配送地點數據
    const locations = [
      { address: '台北市信義區松高路68號', coordinates: { lat: 25.0360, lng: 121.5678 } },
      { address: '新北市板橋區縣民大道二段7號', coordinates: { lat: 25.0120, lng: 121.4659 } },
      { address: '台中市西屯區台灣大道三段99號', coordinates: { lat: 24.1651, lng: 120.6419 } },
      { address: '高雄市前鎮區中華五路789號', coordinates: { lat: 22.6142, lng: 120.3023 } }
    ];
    
    // 配送步驟時間表
    const deliveryTimeline = ref<{ step: string, time: string, status: string }[]>([]);
    
    // 載入配送數據
    onMounted(async () => {
      if (!isAuthenticated.value) {
        router.replace('/login');
        return;
      }
      
      const deliveryId = Number(route.params.id);
      if (deliveryId) {
        // 從 mockData 中找到對應的配送數據
        const foundDelivery = deliveryData.find(d => d.id === deliveryId);
        
        if (foundDelivery) {
          delivery.value = foundDelivery;
          
          // 根據配送狀態生成時間表
          generateTimeline(foundDelivery.status);
          
          // 根據配送ID分配車輛
          assignedVehicle.value = vehicleData.find(v => v.status === 'in-use') || null;
        } else {
          // 如果找不到，顯示提示並返回
          console.error('找不到指定ID的配送數據');
          router.push('/tms');
        }
      }
    });
    
    // 根據配送狀態生成時間表
    const generateTimeline = (status: string) => {
      const now = new Date();
      const baseTime = new Date(now);
      baseTime.setHours(8, 0, 0, 0); // 基準時間: 上午8點
      
      // 準備時間
      const preparingTime = new Date(baseTime);
      preparingTime.setMinutes(preparingTime.getMinutes() + 30);
      
      // 發貨時間
      const shippingTime = new Date(preparingTime);
      shippingTime.setHours(shippingTime.getHours() + 1);
      
      // 運送時間
      const transitTime = new Date(shippingTime);
      transitTime.setHours(transitTime.getHours() + 2);
      
      // 預計送達時間
      const deliveryTime = new Date(transitTime);
      deliveryTime.setHours(deliveryTime.getHours() + 1);
      
      deliveryTimeline.value = [
        { 
          step: 'preparing', 
          time: `${preparingTime.getHours()}:${String(preparingTime.getMinutes()).padStart(2, '0')} AM`, 
          status: status === 'delayed' ? 'delayed' : 'completed' 
        },
        { 
          step: 'shipping', 
          time: `${shippingTime.getHours()}:${String(shippingTime.getMinutes()).padStart(2, '0')} ${shippingTime.getHours() >= 12 ? 'PM' : 'AM'}`, 
          status: status === 'scheduled' ? 'pending' : status === 'delayed' ? 'delayed' : 'completed' 
        },
        { 
          step: 'in-transit', 
          time: `${transitTime.getHours()}:${String(transitTime.getMinutes()).padStart(2, '0')} ${transitTime.getHours() >= 12 ? 'PM' : 'AM'}`, 
          status: status === 'in-progress' ? 'active' : status === 'scheduled' || status === 'delayed' ? 'pending' : 'completed' 
        },
        { 
          step: 'delivered', 
          time: `${deliveryTime.getHours()}:${String(deliveryTime.getMinutes()).padStart(2, '0')} ${deliveryTime.getHours() >= 12 ? 'PM' : 'AM'}`, 
          status: status === 'completed' ? 'completed' : 'pending' 
        }
      ];
    };
    
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
      if (!delivery.value || !deliveryTimeline.value.length) return false;
      
      // 從時間表中找到對應步驟
      const timelineStep = deliveryTimeline.value.find(t => t.step === step);
      if (!timelineStep) return false;
      
      return timelineStep.status === 'completed';
    };
    
    // 確定當前進行中的步驟
    const isCurrentStep = (step: string) => {
      if (!delivery.value || !deliveryTimeline.value.length) return false;
      
      // 從時間表中找到對應步驟
      const timelineStep = deliveryTimeline.value.find(t => t.step === step);
      if (!timelineStep) return false;
      
      return timelineStep.status === 'active';
    };
    
    // 獲取配送地址
    const getDeliveryAddress = () => {
      if (!delivery.value) return '';
      // 根據配送ID選擇一個地址
      const locationIndex = (delivery.value.id - 1) % locations.length;
      return locations[locationIndex].address;
    };
    
    // 獲取配送坐標
    const getDeliveryCoordinates = () => {
      if (!delivery.value) return { lat: 0, lng: 0 };
      // 根據配送ID選擇一個坐標
      const locationIndex = (delivery.value.id - 1) % locations.length;
      return locations[locationIndex].coordinates;
    };
    
    // 獲取司機名稱
    const getDriverName = () => {
      if (!assignedVehicle.value || !assignedVehicle.value.driver) {
        // 如果沒有分配車輛或車輛沒有司機資訊，使用備用資料
        const drivers = ['張志明', '王大華', '林小明'];
        return drivers[delivery.value ? (delivery.value.id - 1) % drivers.length : 0];
      }
      return assignedVehicle.value.driver;
    };
    
    // 獲取車輛資訊
    const getVehicleInfo = () => {
      if (!assignedVehicle.value) return '等待分配';
      return `${assignedVehicle.value.model} (${assignedVehicle.value.plateNumber})`;
    };
    
    return {
      delivery,
      deliveryTimeline,
      assignedVehicle,
      getStatusText,
      getStatusClass,
      isStepCompleted,
      isCurrentStep,
      getDeliveryAddress,
      getDeliveryCoordinates,
      getDriverName,
      getVehicleInfo,
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
  background-color: var(--ion-color-light-tint);
  border-radius: 8px;
  padding: 16px;
  text-align: center;
  box-shadow: inset 0 0 15px rgba(0,0,0,0.05);
}

.map-icon {
  font-size: 2.5rem;
  margin-bottom: 10px;
  color: var(--ion-color-primary);
  animation: pulse 1.5s infinite;
}

.map-note {
  margin-top: 12px;
  font-size: 14px;
  color: var(--ion-color-primary);
  font-weight: 500;
}

@keyframes pulse {
  0% {
    opacity: 0.6;
    transform: scale(0.95);
  }
  50% {
    opacity: 1;
    transform: scale(1.05);
  }
  100% {
    opacity: 0.6;
    transform: scale(0.95);
  }
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

.vehicle-status {
  display: inline-block;
  margin-top: 8px;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
}

.vehicle-available {
  background-color: var(--ion-color-success-tint);
  color: var(--ion-color-success-shade);
}

.vehicle-in-use {
  background-color: var(--ion-color-primary-tint);
  color: var(--ion-color-primary-shade);
}

.vehicle-maintenance {
  background-color: var(--ion-color-warning-tint);
  color: var(--ion-color-warning-shade);
}
</style>