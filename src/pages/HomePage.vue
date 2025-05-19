<template>
  <app-layout title="LumiBright ERP">
    <ion-content class="ion-padding">
      <!-- 歡迎訊息 -->
      <ion-text>
        <h2 class="ion-no-margin">歡迎，{{ user?.name }}</h2>
      </ion-text>
      <ion-text>
        <p class="ion-no-margin ion-margin-bottom">{{ user?.department }} | {{ user?.role }}</p>
      </ion-text>
      
      <!-- 主要功能選單 -->
      <ion-grid>
        <ion-row>
          <ion-col size="6" size-md="3">
            <menu-tile 
              title="CRM" 
              icon="people"
              description="客戶關係管理"
              disabled
            />
          </ion-col>
          
          <ion-col size="6" size-md="3">
            <menu-tile 
              title="TMS" 
              icon="car"
              description="運輸管理系統"
              to="/tms"
            />
          </ion-col>
          
          <ion-col size="6" size-md="3">
            <menu-tile 
              title="WMS" 
              icon="cube"
              description="倉儲管理系統"
              to="/wms"
            />
          </ion-col>
          
          <ion-col size="6" size-md="3">
            <menu-tile 
              title="Finance" 
              icon="cash"
              description="財務管理"
              disabled
            />
          </ion-col>
        </ion-row>
      </ion-grid>
      
      <!-- 今日概覽 -->
      <div class="ion-margin-top ion-margin-bottom">
        <ion-text>
          <h3 class="ion-no-margin-top ion-margin-bottom">今日概覽</h3>
        </ion-text>
        
        <stats-card :stats="homeStats" />
      </div>
    </ion-content>
  </app-layout>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { 
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonText
} from '@ionic/vue';
import { useRouter } from 'vue-router';
import AppLayout from '../components/AppLayout.vue';
import MenuTile from '../components/MenuTile.vue';
import StatsCard from '../components/common/StatsCard.vue';
import authInstance from '../composables/useAuth';
import type { StatItem } from '../components/common/StatsCard.vue';

export default defineComponent({
  name: 'HomePage',
  components: {
    AppLayout,
    MenuTile,
    StatsCard,
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonText
  },
  setup() {
    const router = useRouter();
    const { user, isAuthenticated } = authInstance;
    
    // 定義首頁統計數據
    const homeStats = ref<StatItem[]>([
      { value: '12', label: '配送' },
      { value: '54', label: '訂單' },
      { value: '7', label: '新訂單' },
      { value: '98%', label: '庫存' }
    ]);
    
    onMounted(() => {
      if (!isAuthenticated.value) {
        router.replace('/login');
      }
    });
    
    return {
      user,
      homeStats
    };
  }
});
</script>

<style scoped>
/* 大多使用 Ionic 的內置類，僅保留必要的自定義樣式 */

/* 統計數字樣式 */
.stats-value {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.25rem !important;
}

</style>
