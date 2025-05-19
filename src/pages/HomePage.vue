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
        
        <ion-card>
          <ion-card-content>
            <ion-grid>
              <ion-row>
                <ion-col size="6" class="ion-text-center">
                  <ion-text color="primary"><h2 class="ion-no-margin stats-value">12</h2></ion-text>
                  <ion-text color="medium"><p class="ion-no-margin">配送</p></ion-text>
                </ion-col>
                
                <ion-col size="6" class="ion-text-center">
                  <ion-text color="primary"><h2 class="ion-no-margin stats-value">54</h2></ion-text>
                  <ion-text color="medium"><p class="ion-no-margin">訂單</p></ion-text>
                </ion-col>
                
                <ion-col size="6" class="ion-text-center">
                  <ion-text color="primary"><h2 class="ion-no-margin stats-value">7</h2></ion-text>
                  <ion-text color="medium"><p class="ion-no-margin">新訂單</p></ion-text>
                </ion-col>
                
                <ion-col size="6" class="ion-text-center">
                  <ion-text color="primary"><h2 class="ion-no-margin stats-value">98%</h2></ion-text>
                  <ion-text color="medium"><p class="ion-no-margin">庫存</p></ion-text>
                </ion-col>
              </ion-row>
            </ion-grid>
          </ion-card-content>
        </ion-card>
      </div>
    </ion-content>
  </app-layout>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { 
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonCard, 
  IonCardContent,
  IonText
} from '@ionic/vue';
import { useRouter } from 'vue-router';
import AppLayout from '../components/AppLayout.vue';
import MenuTile from '../components/MenuTile.vue';
import authInstance from '../composables/useAuth';

export default defineComponent({
  name: 'HomePage',
  components: {
    AppLayout,
    MenuTile,
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonCardContent,
    IonText
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
/* 大多使用 Ionic 的內置類，僅保留必要的自定義樣式 */

/* 統計數字樣式 */
.stats-value {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.25rem !important;
}

</style>
