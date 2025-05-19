<template>
  <div class="delivery-schedule">
    <div class="schedule-header">
      <h3 class="section-title">Today's Deliveries</h3>
      <ion-button size="small" fill="clear">
        <ion-icon slot="icon-only" :icon="filterOutline"></ion-icon>
      </ion-button>
    </div>

    <ion-list>
      <ion-item v-for="delivery in deliveries" :key="delivery.id" button detail class="delivery-item">
        <ion-icon :icon="getStatusIcon(delivery.status)" slot="start" :color="getStatusColor(delivery.status)"></ion-icon>
        <ion-label>
          <h2>{{ delivery.orderNumber }}</h2>
          <h3>{{ delivery.customer }}</h3>
          <p>{{ delivery.products }}</p>
          <p>
            <ion-text :color="getStatusColor(delivery.status)">{{ delivery.status }}</ion-text>
            <ion-text color="medium"> • {{ delivery.time }}</ion-text>
          </p>
        </ion-label>
      </ion-item>
    </ion-list>
    
    <ion-card class="delivery-map">
      <ion-card-header>
        <ion-card-title>Delivery Routes</ion-card-title>
      </ion-card-header>
      <ion-card-content>
        <div class="map-placeholder">
          <ion-icon :icon="mapOutline" class="map-icon"></ion-icon>
          <p>Map view will display delivery routes</p>
        </div>
      </ion-card-content>
    </ion-card>
    
    <ion-fab vertical="bottom" horizontal="end" slot="fixed">
      <ion-fab-button>
        <ion-icon :icon="add"></ion-icon>
      </ion-fab-button>
    </ion-fab>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
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
    IonFabButton
  },
  setup() {
    const deliveries = ref<Delivery[]>([
      {
        id: 1,
        orderNumber: 'LB-7842',
        customer: 'Bright Interiors Inc.',
        products: 'LED Panels (50), Spotlights (20)',
        status: 'completed',
        time: '10:15 AM'
      },
      {
        id: 2,
        orderNumber: 'LB-7844',
        customer: 'Modern Living Co.',
        products: 'Smart Bulbs (100), RGB Strips (5)',
        status: 'in-progress',
        time: '12:30 PM'
      },
      {
        id: 3,
        orderNumber: 'LB-7845',
        customer: 'Office Solutions Ltd.',
        products: 'Ceiling Lights (30), Emergency Lights (10)',
        status: 'scheduled',
        time: '2:45 PM'
      },
      {
        id: 4,
        orderNumber: 'LB-7846',
        customer: 'Homestead Furnishings',
        products: 'Decorative Lamps (15), Wall Sconces (25)',
        status: 'delayed',
        time: '3:30 PM'
      }
    ]);
    
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
    
    return {
      deliveries,
      getStatusIcon,
      getStatusColor,
      filterOutline,
      mapOutline,
      add
    };
  }
});
</script>

<style scoped>
.delivery-schedule {
  position: relative;
}

.schedule-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.section-title {
  margin: 0;
}

.delivery-item {
  --padding-start: 16px;
  --inner-padding-end: 16px;
  margin-bottom: 8px;
  border-radius: 8px;
  --background: var(--ion-color-light);
}

.delivery-map {
  margin-top: 24px;
  border-radius: 12px;
}

.map-placeholder {
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--ion-color-light);
  border-radius: 8px;
}

.map-icon {
  font-size: 3rem;
  color: var(--ion-color-medium);
  margin-bottom: 0.5rem;
}
</style>
