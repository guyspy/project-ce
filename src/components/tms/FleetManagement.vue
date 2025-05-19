<template>
  <div>
    <div class="ion-padding-bottom ion-justify-content-between ion-align-items-center ion-display-flex">
      <h3 class="ion-no-margin">車輛管理</h3>
      <ion-button size="small" fill="clear">
        <ion-icon slot="icon-only" :icon="optionsOutline"></ion-icon>
      </ion-button>
    </div>
    
    <stats-card :stats="fleetStats" />
    
    <ion-segment v-model="selectedFilter" >
      <ion-segment-button value="all">
        <ion-label>全部</ion-label>
      </ion-segment-button>
      <ion-segment-button value="available">
        <ion-label>可用</ion-label>
      </ion-segment-button>
      <ion-segment-button value="in-use">
        <ion-label>使用中</ion-label>
      </ion-segment-button>
    </ion-segment>
    
    <ion-list>
      <ion-item v-for="vehicle in filteredVehicles" :key="vehicle.id" button detail lines="full" class="ion-margin-bottom ion-no-padding" style="--background: var(--ion-card-background); --padding-start: 16px; --inner-padding-end: 16px;">
        <ion-icon :icon="carSportOutline" slot="start" :color="getStatusColor(vehicle.status)" class="ion-padding-start"></ion-icon>
        <ion-label>
          <h2>{{ vehicle.model }}</h2>
          <h3>{{ vehicle.plateNumber }}</h3>
          <p>
            <ion-text :color="getStatusColor(vehicle.status)">{{ getStatusText(vehicle.status) }}</ion-text>
            <span v-if="vehicle.driver"> • 駕駛員: {{ vehicle.driver }}</span>
          </p>
        </ion-label>
        <ion-note slot="end" color="medium">{{ vehicle.lastUpdated }}</ion-note>
      </ion-item>
    </ion-list>
    
    <ion-card class="ion-margin-top">
      <ion-card-header>
        <ion-card-title>維護保養計劃</ion-card-title>
      </ion-card-header>
      <ion-card-content>
        <ion-list lines="none">
          <ion-item v-for="maintenance in maintenanceSchedule" :key="maintenance.id" class="ion-no-padding">
            <ion-icon :icon="buildOutline" slot="start" color="primary"></ion-icon>
            <ion-label>
              <h3>{{ maintenance.vehicle }}</h3>
              <p>{{ maintenance.service }}</p>
            </ion-label>
            <ion-badge slot="end" :color="maintenance.urgent ? 'danger' : 'medium'">
              {{ maintenance.date }}
            </ion-badge>
          </ion-item>
        </ion-list>
      </ion-card-content>
    </ion-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { 
  IonList, 
  IonItem, 
  IonLabel, 
  IonIcon, 
  IonNote,
  IonText,
  IonButton,
  IonSegment,
  IonSegmentButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonBadge
} from '@ionic/vue';
import StatsCard from '../common/StatsCard.vue';
import type { StatItem } from '../common/StatsCard.vue';
import { 
  carSportOutline, 
  optionsOutline,
  buildOutline
} from 'ionicons/icons';

interface Vehicle {
  id: number;
  model: string;
  plateNumber: string;
  status: 'available' | 'in-use' | 'maintenance';
  driver?: string;
  lastUpdated: string;
}

interface Maintenance {
  id: number;
  vehicle: string;
  service: string;
  date: string;
  urgent: boolean;
}

export default defineComponent({
  name: 'FleetManagement',
  components: {
    IonList,
    IonItem,
    IonLabel,
    IonIcon,
    IonNote,
    IonText,
    IonButton,
    IonSegment,
    IonSegmentButton,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonBadge,
    StatsCard
  },
  setup() {
    const selectedFilter = ref('all');
    
    // 定義車隊統計數據
    const fleetStats = ref<StatItem[]>([
      { value: '8', label: '總車輛數', color: 'primary' },
      { value: '5', label: '可用車輛', color: 'success' },
      { value: '2', label: '使用中', color: 'tertiary' },
      { value: '1', label: '維修中', color: 'warning' }
    ]);
    
    const vehicles = ref<Vehicle[]>([
      {
        id: 1,
        model: 'Delivery Van 2.5T',
        plateNumber: 'LB-V1001',
        status: 'in-use',
        driver: 'John Smith',
        lastUpdated: '15m ago'
      },
      {
        id: 2,
        model: 'Cargo Truck 5T',
        plateNumber: 'LB-T2002',
        status: 'available',
        lastUpdated: '1h ago'
      },
      {
        id: 3,
        model: 'Delivery Van 2.5T',
        plateNumber: 'LB-V1002',
        status: 'maintenance',
        lastUpdated: '3h ago'
      },
      {
        id: 4,
        model: 'Light Pickup Truck',
        plateNumber: 'LB-P3001',
        status: 'in-use',
        driver: 'Mary Johnson',
        lastUpdated: '30m ago'
      },
      {
        id: 5,
        model: 'Cargo Truck 8T',
        plateNumber: 'LB-T2003',
        status: 'available',
        lastUpdated: '2h ago'
      }
    ]);
    
    const maintenanceSchedule = ref<Maintenance[]>([
      {
        id: 1,
        vehicle: 'Van LB-V1002',
        service: 'Regular Maintenance',
        date: 'Today',
        urgent: true
      },
      {
        id: 2,
        vehicle: 'Truck LB-T2002',
        service: 'Tire Replacement',
        date: 'Jun 15',
        urgent: false
      },
      {
        id: 3,
        vehicle: 'Van LB-V1001',
        service: 'Oil Change',
        date: 'Jun 18',
        urgent: false
      }
    ]);
    
    const filteredVehicles = computed(() => {
      if (selectedFilter.value === 'all') {
        return vehicles.value;
      }
      return vehicles.value.filter(v => {
        if (selectedFilter.value === 'available') {
          return v.status === 'available';
        } else if (selectedFilter.value === 'in-use') {
          return v.status === 'in-use';
        }
        return true;
      });
    });
    
    const getStatusColor = (status: string) => {
      switch(status) {
        case 'available': return 'success';
        case 'in-use': return 'primary';
        case 'maintenance': return 'warning';
        default: return 'medium';
      }
    };
    
    const getStatusText = (status: string) => {
      switch(status) {
        case 'available': return '可用';
        case 'in-use': return '使用中';
        case 'maintenance': return '維修中';
        default: return status;
      }
    };
    
    return {
      selectedFilter,
      vehicles,
      filteredVehicles,
      maintenanceSchedule,
      getStatusColor,
      getStatusText,
      carSportOutline,
      optionsOutline,
      buildOutline
    };
  }
});
</script>

<style scoped>
/* Using Ionic utility classes instead of custom CSS */
</style>
