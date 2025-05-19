<template>
  <div class="order-processing">
    <div class="section-header">
      <h3 class="section-title">Order Management</h3>
      <ion-button size="small" fill="clear">
        <ion-icon slot="icon-only" :icon="optionsOutline"></ion-icon>
      </ion-button>
    </div>
    
    <ion-card class="summary-card">
      <ion-card-content>
        <div class="summary-grid">
          <div class="summary-item">
            <div class="summary-value">54</div>
            <div class="summary-label">Active Orders</div>
          </div>
          <div class="summary-item">
            <div class="summary-value">7</div>
            <div class="summary-label">New Today</div>
          </div>
          <div class="summary-item">
            <div class="summary-value">12</div>
            <div class="summary-label">Pending</div>
          </div>
          <div class="summary-item">
            <div class="summary-value">35</div>
            <div class="summary-label">Processed</div>
          </div>
        </div>
      </ion-card-content>
    </ion-card>
    
    <ion-segment v-model="selectedTab" class="status-segment">
      <ion-segment-button value="new">
        <ion-label>New</ion-label>
      </ion-segment-button>
      <ion-segment-button value="processing">
        <ion-label>Processing</ion-label>
      </ion-segment-button>
      <ion-segment-button value="shipped">
        <ion-label>Shipped</ion-label>
      </ion-segment-button>
    </ion-segment>
    
    <ion-list>
      <ion-item v-for="order in filteredOrders" :key="order.id" button detail class="order-item">
        <ion-icon :icon="getStatusIcon(order.status)" slot="start" :color="getStatusColor(order.status)"></ion-icon>
        <ion-label>
          <h2>{{ order.orderNumber }}</h2>
          <h3>{{ order.customer }}</h3>
          <p>
            <ion-badge :color="getStatusColor(order.status)">{{ order.status }}</ion-badge>
            <ion-text color="medium"> • {{ order.date }}</ion-text>
          </p>
        </ion-label>
        <div slot="end" class="price">
          {{ order.total }}
        </div>
      </ion-item>
    </ion-list>
    
    <ion-fab vertical="bottom" horizontal="end" slot="fixed">
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
  IonCard,
  IonCardContent,
  IonFab,
  IonFabButton
} from '@ionic/vue';
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
    IonCard,
    IonCardContent,
    IonFab,
    IonFabButton
  },
  setup() {
    const selectedTab = ref('new');
    
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
    
    return {
      selectedTab,
      orders,
      filteredOrders,
      getStatusIcon,
      getStatusColor,
      optionsOutline,
      add
    };
  }
});
</script>

<style scoped>
.order-processing {
  position: relative;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.section-title {
  margin: 0;
}

.summary-card {
  margin-bottom: 1rem;
  border-radius: 12px;
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.summary-item {
  text-align: center;
  padding: 0.5rem;
}

.summary-value {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--ion-color-primary);
}

.summary-label {
  font-size: 0.9rem;
  color: var(--ion-color-medium);
}

.status-segment {
  margin-bottom: 1rem;
}

.order-item {
  --padding-start: 16px;
  --inner-padding-end: 16px;
  margin-bottom: 8px;
  border-radius: 8px;
  --background: var(--ion-color-light);
}

.price {
  font-weight: 600;
  color: var(--ion-color-dark);
  font-size: 1rem;
}
</style>
