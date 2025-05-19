<template>
  <div>
    <div class="ion-padding-bottom ion-justify-content-between" style="display: flex; align-items: center;">
      <h3 class="ion-no-margin">今日配送任務</h3>
      <ion-button size="small" fill="clear">
        <ion-icon slot="icon-only" :icon="filterOutline"></ion-icon>
      </ion-button>
    </div>

    <stats-card :stats="deliveryStats" />
    
    <ion-list>
      <ion-item 
        v-for="delivery in deliveries" 
        :key="delivery.id" 
        button 
        detail 
        lines="full" 
        class="ion-margin-bottom"
        @click="viewDeliveryDetail(delivery.id)"
      >
        <ion-icon :icon="getStatusIcon(delivery.status)" slot="start" :color="getStatusColor(delivery.status)" class="ion-padding-start"></ion-icon>
        <ion-label>
          <h2>{{ delivery.orderNumber }}</h2>
          <h3>{{ delivery.customer }}</h3>
          <p>{{ delivery.products }}</p>
          <p>
            <ion-text :color="getStatusColor(delivery.status)">{{ getStatusText(delivery.status) }}</ion-text>
            <ion-text color="medium"> • {{ delivery.time }}</ion-text>
          </p>
        </ion-label>
      </ion-item>
    </ion-list>
    
    <ion-card class="ion-margin-top">
      <ion-card-header>
        <ion-card-title>配送路線</ion-card-title>
      </ion-card-header>
      <ion-card-content>
        <div class="ion-text-center ion-padding ion-justify-content-center ion-align-items-center" style="height: 200px; background: var(--ion-color-step-50, var(--ion-background-color)); border-radius: 8px; display: flex; flex-direction: column;">
          <ion-icon :icon="mapOutline" style="font-size: 3rem; color: var(--ion-color-medium); margin-bottom: 0.5rem;"></ion-icon>
          <p>地圖視圖將顯示配送路線</p>
        </div>
      </ion-card-content>
    </ion-card>
    
    <ion-fab vertical="bottom" horizontal="end">
      <ion-fab-button>
        <ion-icon :icon="add"></ion-icon>
      </ion-fab-button>
    </ion-fab>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { 
  IonList, 
  IonItem, 
  IonLabel, 
  IonText,
  IonIcon,
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonFab,
  IonFabButton
} from '@ionic/vue';
import StatsCard from '../common/StatsCard.vue';
import type { StatItem } from '../common/StatsCard.vue';
import { deliveryData, DeliveryItem } from '../../utils/mockData';
import { 
  checkmarkCircleOutline, 
  timeOutline, 
  carOutline,
  alertCircleOutline,
  filterOutline,
  mapOutline,
  add
} from 'ionicons/icons';

interface Delivery {
  id: number;
  orderNumber: string;
  customer: string;
  products: string;
  status: 'completed' | 'in-progress' | 'scheduled' | 'delayed';
  time: string;
}

export default defineComponent({
  name: 'DeliverySchedule',
  components: {
    IonList,
    IonItem,
    IonLabel,
    IonText,
    IonIcon,
    IonButton,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonFab,
    IonFabButton,
    StatsCard
  },
  setup() {
    const router = useRouter();
    
    // 定義配送統計數據
    const deliveryStats = ref<StatItem[]>([
      { value: '12', label: '今日配送', color: 'primary' },
      { value: '5', label: '已完成', color: 'success' },
      { value: '4', label: '進行中', color: 'tertiary' },
      { value: '3', label: '計劃中', color: 'warning' }
    ]);

    // 使用 mockData 中的配送數據
    const deliveries = ref<DeliveryItem[]>(deliveryData);
    
    const getStatusIcon = (status: string) => {
      switch(status) {
        case 'completed': return checkmarkCircleOutline;
        case 'in-progress': return carOutline;
        case 'scheduled': return timeOutline;
        case 'delayed': return alertCircleOutline;
        default: return timeOutline;
      }
    };
    
    const getStatusColor = (status: string) => {
      switch(status) {
        case 'completed': return 'success';
        case 'in-progress': return 'primary';
        case 'scheduled': return 'tertiary';
        case 'delayed': return 'warning';
        default: return 'medium';
      }
    };
    
    const getStatusText = (status: string) => {
      switch(status) {
        case 'completed': return '已完成';
        case 'in-progress': return '進行中';
        case 'scheduled': return '已排程';
        case 'delayed': return '延遲';
        default: return status;
      }
    };
    
    // 查看配送詳情
    const viewDeliveryDetail = (deliveryId: number) => {
      router.push(`/delivery/${deliveryId}`);
    };
    
    return {
      deliveries,
      getStatusIcon,
      getStatusColor,
      getStatusText,
      filterOutline,
      mapOutline,
      add,
      deliveryStats,
      viewDeliveryDetail
    };
  }
});
</script>

<style scoped>
/* Ionic handles most styling through its built-in CSS variables */
/* For platform-specific and theme-specific styles, we can rely on Ionic's CSS variables */
</style>
