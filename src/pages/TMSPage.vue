<template>
  <app-layout title="Transport Management">
    <div class="tms-content">
      <ion-segment v-model="selectedSegment" class="segment-control">
        <ion-segment-button value="deliveries">
          <ion-label>Deliveries</ion-label>
        </ion-segment-button>
        <ion-segment-button value="fleet">
          <ion-label>Fleet</ion-label>
        </ion-segment-button>
      </ion-segment>
      
      <delivery-schedule v-if="selectedSegment === 'deliveries'" />
      <fleet-management v-else />

    </div>
  </app-layout>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { IonSegment, IonSegmentButton, IonLabel } from '@ionic/vue';
import { useRouter } from 'vue-router';
import AppLayout from '../components/AppLayout.vue';
import DeliverySchedule from '../components/tms/DeliverySchedule.vue';
import FleetManagement from '../components/tms/FleetManagement.vue';
import authInstance from '../composables/useAuth';

export default defineComponent({
  name: 'TMSPage',
  components: {
    AppLayout,
    DeliverySchedule,
    FleetManagement,
    IonSegment,
    IonSegmentButton,
    IonLabel
  },
  setup() {
    const router = useRouter();
    const selectedSegment = ref('deliveries');
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
.tms-content {
  padding: 16px;
}

.segment-control {
  margin-bottom: 16px;
}
</style>
