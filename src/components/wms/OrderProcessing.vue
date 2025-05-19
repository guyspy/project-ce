<template>
  <div>
    <div class="ion-padding-bottom ion-justify-content-between ion-display-flex ion-align-items-center">
      <h3 class="ion-no-margin">訂單管理</h3>
      <ion-button size="small" fill="clear">
        <ion-icon slot="icon-only" :icon="optionsOutline"></ion-icon>
      </ion-button>
    </div>
    
    <stats-card :stats="orderStats" />
    
    <ion-segment v-model="selectedTab" mode="ios" class="ion-margin-bottom">
      <ion-segment-button value="new">
        <ion-label>新訂單</ion-label>
      </ion-segment-button>
      <ion-segment-button value="processing">
        <ion-label>處理中</ion-label>
      </ion-segment-button>
      <ion-segment-button value="shipped">
        <ion-label>已發貨</ion-label>
      </ion-segment-button>
    </ion-segment>
    
    <ion-list>
      <ion-item v-for="order in filteredOrders" :key="order.id" button detail lines="full" class="order-item ion-margin-bottom ion-no-padding">
        <ion-icon :icon="getStatusIcon(order.status)" slot="start" :color="getStatusColor(order.status)" class="ion-padding-start"></ion-icon>
        <ion-label>
          <h2>{{ order.orderNumber }}</h2>
          <h3>{{ order.customer }}</h3>
          <p>
            <ion-badge :color="getStatusColor(order.status)">{{ getStatusText(order.status) }}</ion-badge>
            <ion-text color="medium"> • {{ order.date }}</ion-text>
          </p>
        </ion-label>
        <div slot="end" class="order-price">
          {{ order.total }}
        </div>
      </ion-item>
    </ion-list>
    
    <ion-fab vertical="bottom" horizontal="end">
      <ion-fab-button>
        <ion-icon :icon="add"></ion-icon>
      </ion-fab-button>
    </ion-fab>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { 
  IonList, 
  IonItem, 
  IonLabel, 
  IonBadge, 
  IonText,
  IonIcon,
  IonButton,
  IonSegment,
  IonSegmentButton,
  IonFab,
  IonFabButton
} from '@ionic/vue';
import StatsCard from '../common/StatsCard.vue';
import type { StatItem } from '../common/StatsCard.vue';
import { 
  receiptOutline, 
  hourglassOutline, 
  checkmarkCircleOutline,
  cardOutline,
  optionsOutline,
  add
} from 'ionicons/icons';

interface Order {
  id: number;
  orderNumber: string;
  customer: string;
  status: 'new' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  date: string;
  total: string;
}

export default defineComponent({
  name: 'OrderProcessing',
  components: {
    IonList,
    IonItem,
    IonLabel,
    IonBadge,
    IonText,
    IonIcon,
    IonButton,
    IonSegment,
    IonSegmentButton,
    IonFab,
    IonFabButton,
    StatsCard
  },
  setup() {
    const selectedTab = ref('new');
    
    // 定義訂單統計數據
    const orderStats = ref<StatItem[]>([
      { value: '54', label: '進行中訂單' },
      { value: '7', label: '今日新增' },
      { value: '12', label: '待處理' },
      { value: '35', label: '已處理' }
    ]);
    
    const orders = ref<Order[]>([
      {
        id: 1,
        orderNumber: 'LB-7845',
        customer: 'Bright Interiors Inc.',
        status: 'new',
        date: 'Today, 9:15 AM',
        total: '$2,450.00'
      },
      {
        id: 2,
        orderNumber: 'LB-7844',
        customer: 'Modern Living Co.',
        status: 'processing',
        date: 'Today, 8:30 AM',
        total: '$1,876.50'
      },
      {
        id: 3,
        orderNumber: 'LB-7843',
        customer: 'Office Solutions Ltd.',
        status: 'processing',
        date: 'Yesterday',
        total: '$3,254.75'
      },
      {
        id: 4,
        orderNumber: 'LB-7842',
        customer: 'Homestead Furnishings',
        status: 'shipped',
        date: 'Jun 10, 2023',
        total: '$985.25'
      },
      {
        id: 5,
        orderNumber: 'LB-7841',
        customer: 'City Lighting Project',
        status: 'delivered',
        date: 'Jun 8, 2023',
        total: '$7,650.00'
      },
      {
        id: 6,
        orderNumber: 'LB-7840',
        customer: 'Smart Home Solutions',
        status: 'shipped',
        date: 'Jun 8, 2023',
        total: '$1,245.50'
      }
    ]);
    
    const filteredOrders = computed(() => {
      if (selectedTab.value === 'new') {
        return orders.value.filter(o => o.status === 'new');
      } else if (selectedTab.value === 'processing') {
        return orders.value.filter(o => o.status === 'processing');
      } else if (selectedTab.value === 'shipped') {
        return orders.value.filter(o => ['shipped', 'delivered'].includes(o.status));
      }
      return orders.value;
    });
    
    const getStatusIcon = (status: string) => {
      switch(status) {
        case 'new': return receiptOutline;
        case 'processing': return hourglassOutline;
        case 'shipped': 
        case 'delivered': return checkmarkCircleOutline;
        default: return cardOutline;
      }
    };
    
    const getStatusColor = (status: string) => {
      switch(status) {
        case 'new': return 'tertiary';
        case 'processing': return 'primary';
        case 'shipped': return 'warning';
        case 'delivered': return 'success';
        case 'cancelled': return 'danger';
        default: return 'medium';
      }
    };
    
    const getStatusText = (status: string) => {
      switch(status) {
        case 'new': return '新訂單';
        case 'processing': return '處理中';
        case 'shipped': return '已發貨';
        case 'delivered': return '已送達';
        case 'cancelled': return '已取消';
        default: return status;
      }
    };
    
    return {
      selectedTab,
      orders,
      filteredOrders,
      getStatusIcon,
      getStatusColor,
      getStatusText,
      optionsOutline,
      add,
      orderStats
    };
  }
});
</script>

<style scoped>
.summary-value {
  font-size: 1.5rem;
  font-weight: 600;
}

.summary-label {
  font-size: 0.9rem;
}

.order-price {
  font-weight: 600;
  color: var(--ion-text-color);
}

.order-item {
  --background: var(--ion-card-background);
  --padding-start: 16px;
  --inner-padding-end: 16px;
}
</style>
