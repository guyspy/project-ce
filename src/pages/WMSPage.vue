<template>
  <app-layout title="WMS 倉儲管理">
    <div class="wms-content">
      <ion-segment v-model="selectedSegment" class="segment-control">
        <ion-segment-button value="inventory">
          <ion-label>庫存管理</ion-label>
        </ion-segment-button>
        <ion-segment-button value="orders">
          <ion-label>訂單處理</ion-label>
        </ion-segment-button>
      </ion-segment>
      
      <inventory-management v-if="selectedSegment === 'inventory'" />
      <order-processing v-else />
    </div>
  </app-layout>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { IonSegment, IonSegmentButton, IonLabel } from '@ionic/vue';
import { useRouter } from 'vue-router';
import AppLayout from '../components/AppLayout.vue';
import InventoryManagement from '../components/wms/InventoryManagement.vue';
import OrderProcessing from '../components/wms/OrderProcessing.vue';
import authInstance from '../composables/useAuth';

export default defineComponent({
  name: 'WMSPage',
  components: {
    AppLayout,
    InventoryManagement,
    OrderProcessing,
    IonSegment,
    IonSegmentButton,
    IonLabel
  },
  setup() {
    const router = useRouter();
    const selectedSegment = ref('inventory');
    const { isAuthenticated } = authInstance;
    
    onMounted(() => {
      if (!isAuthenticated.value) {
        router.replace('/login');
      }
    });
    
    return {
      selectedSegment
    };
  }
});
</script>

<style scoped>
.wms-content {
  padding: 16px;
}

.segment-control {
  margin-bottom: 16px;
}
</style>
