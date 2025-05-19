<template>
  <app-layout title="LumiBright ERP">
    <div class="home-content">
      <h2 class="welcome-message">Welcome, {{ user?.name }}</h2>
      <p class="user-details">{{ user?.department }} | {{ user?.role }}</p>
      
      <div class="menu-grid">
        <menu-tile 
          title="CRM" 
          icon="people"
          description="Customer Relationship Management"
          disabled
        />
        
        <menu-tile 
          title="TMS" 
          icon="car"
          description="Transport Management System"
          to="/tms"
        />
        
        <menu-tile 
          title="WMS" 
          icon="cube"
          description="Warehouse Management System"
          to="/wms"
        />
        
        <menu-tile 
          title="Finance" 
          icon="cash"
          description="Financial Management"
          disabled
        />
      </div>
      
      <div class="quick-stats">
        <h3 class="section-title">Today's Overview</h3>
        <ion-card>
          <ion-card-content>
            <div class="stat-grid">
              <div class="stat-item">
                <div class="stat-value">12</div>
                <div class="stat-label">Deliveries</div>
              </div>
              <div class="stat-item">
                <div class="stat-value">54</div>
                <div class="stat-label">Orders</div>
              </div>
              <div class="stat-item">
                <div class="stat-value">7</div>
                <div class="stat-label">New Orders</div>
              </div>
              <div class="stat-item">
                <div class="stat-value">98%</div>
                <div class="stat-label">Inventory</div>
              </div>
            </div>
          </ion-card-content>
        </ion-card>
      </div>
    </div>
  </app-layout>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { IonCard, IonCardContent } from '@ionic/vue';
import { useRouter } from 'vue-router';
import AppLayout from '../components/AppLayout.vue';
import MenuTile from '../components/MenuTile.vue';
import authInstance from '../composables/useAuth';

export default defineComponent({
  name: 'HomePage',
  components: {
    AppLayout,
    MenuTile,
    IonCard,
    IonCardContent
  },
  setup() {
    const router = useRouter();
    const { user, isAuthenticated } = authInstance;
    
    onMounted(() => {
      if (!isAuthenticated.value) {
        router.replace('/login');
      }
    });
    
    return {
      user
    };
  }
});
</script>

<style scoped>
.home-content {
  padding: 16px;
}

.welcome-message {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
  color: var(--ion-color-dark);
}

.user-details {
  color: var(--ion-color-medium);
  margin-top: 0;
  margin-bottom: 2rem;
}

.menu-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-bottom: 2rem;
}

.quick-stats {
  margin-top: 1.5rem;
}

.section-title {
  margin-bottom: 0.75rem;
  font-size: 1.2rem;
  font-weight: 500;
}

.stat-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.stat-item {
  text-align: center;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--ion-color-primary);
}

.stat-label {
  font-size: 0.9rem;
  color: var(--ion-color-medium);
}
</style>
