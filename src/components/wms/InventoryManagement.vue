<template>
  <div>
    <div class="ion-padding-bottom ion-justify-content-between ion-align-items-center ion-display-flex">
      <h3 class="ion-no-margin">庫存狀態</h3>
      <ion-button size="small" fill="clear">
        <ion-icon slot="icon-only" :icon="searchOutline"></ion-icon>
      </ion-button>
    </div>
    
    <stats-card :stats="inventoryStats" />
    
    <ion-segment v-model="selectedCategory" mode="ios" class="ion-margin-bottom">
      <ion-segment-button value="all">
        <ion-label>全部</ion-label>
      </ion-segment-button>
      <ion-segment-button value="bulbs">
        <ion-label>燈泡</ion-label>
      </ion-segment-button>
      <ion-segment-button value="fixtures">
        <ion-label>燈具</ion-label>
      </ion-segment-button>
    </ion-segment>
    
    <ion-list>
      <ion-item v-for="product in filteredProducts" :key="product.id" button detail lines="full" class="ion-margin-bottom ion-no-padding" style="--background: var(--ion-card-background); --padding-start: 16px; --inner-padding-end: 16px;">
        <ion-thumbnail slot="start" class="ion-align-items-center ion-justify-content-center product-thumbnail">
          <ion-icon :icon="getProductIcon(product.category)" class="product-icon"></ion-icon>
        </ion-thumbnail>
        <ion-label>
          <h2>{{ product.name }}</h2>
          <h3>SKU: {{ product.sku }}</h3>
          <p>
            <ion-badge :color="getStockColor(product.stockLevel)">
              {{ getStockStatus(product.stockLevel) }}
            </ion-badge>
            <ion-text color="medium"> • 位置: {{ product.location }}</ion-text>
          </p>
        </ion-label>
        <div slot="end" class="ion-text-center quantity-display">
          <div class="quantity">{{ product.quantity }}</div>
          <div class="unit">個</div>
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
  IonThumbnail,
  IonFab,
  IonFabButton
} from '@ionic/vue';
import { 
  bulbOutline, 
  flashlightOutline, 
  prismOutline,
  searchOutline,
  add
} from 'ionicons/icons';
import StatsCard from '../common/StatsCard.vue';
import type { StatItem } from '../common/StatsCard.vue';

interface Product {
  id: number;
  name: string;
  sku: string;
  category: 'bulbs' | 'fixtures' | 'accessories';
  stockLevel: 'high' | 'medium' | 'low' | 'out';
  quantity: number;
  location: string;
}

export default defineComponent({
  name: 'InventoryManagement',
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
    IonThumbnail,
    IonFab,
    IonFabButton,
    StatsCard
  },
  setup() {
    const selectedCategory = ref('all');
    
    // 定義庫存統計數據
    const inventoryStats = ref<StatItem[]>([
      { value: '1,248', label: '總SKU數' },
      { value: '36', label: '低庫存' },
      { value: '98.2%', label: '可用率' },
      { value: '87', label: '需要補貨' }
    ]);
    
    const products = ref<Product[]>([
      {
        id: 1,
        name: 'LED Smart Bulb X2000',
        sku: 'LB-SB2000',
        category: 'bulbs',
        stockLevel: 'low',
        quantity: 15,
        location: 'Aisle A, Rack 2'
      },
      {
        id: 2,
        name: 'Ceiling Light Fixture C500',
        sku: 'LB-CLF500',
        category: 'fixtures',
        stockLevel: 'high',
        quantity: 124,
        location: 'Aisle C, Rack 5'
      },
      {
        id: 3,
        name: 'LED Panel 60x60cm',
        sku: 'LB-LP6060',
        category: 'fixtures',
        stockLevel: 'medium',
        quantity: 45,
        location: 'Aisle B, Rack 3'
      },
      {
        id: 4,
        name: 'RGB LED Strip 5m',
        sku: 'LB-RGB5M',
        category: 'accessories',
        stockLevel: 'medium',
        quantity: 67,
        location: 'Aisle D, Rack 1'
      },
      {
        id: 5,
        name: 'Energy Saving Bulb E27',
        sku: 'LB-ESB27',
        category: 'bulbs',
        stockLevel: 'out',
        quantity: 0,
        location: 'Aisle A, Rack 1'
      },
      {
        id: 6,
        name: 'Spotlight LED GU10',
        sku: 'LB-SL-GU10',
        category: 'bulbs',
        stockLevel: 'high',
        quantity: 230,
        location: 'Aisle A, Rack 4'
      }
    ]);
    
    const filteredProducts = computed(() => {
      if (selectedCategory.value === 'all') {
        return products.value;
      }
      return products.value.filter(p => p.category === selectedCategory.value);
    });
    
    const getStockStatus = (level: string) => {
      switch(level) {
        case 'high': return '充足';
        case 'medium': return '適量';
        case 'low': return '庫存低';
        case 'out': return '缺貨';
        default: return '未知';
      }
    };
    
    const getStockColor = (level: string) => {
      switch(level) {
        case 'high': return 'success';
        case 'medium': return 'tertiary';
        case 'low': return 'warning';
        case 'out': return 'danger';
        default: return 'medium';
      }
    };
    
    const getProductIcon = (category: string) => {
      switch(category) {
        case 'bulbs': return bulbOutline;
        case 'fixtures': return flashlightOutline;
        case 'accessories': return prismOutline;
        default: return bulbOutline;
      }
    };
    
    return {
      selectedCategory,
      products,
      filteredProducts,
      getStockStatus,
      getStockColor,
      getProductIcon,
      searchOutline,
      add
    };
  }
});
</script>

<style scoped>
.status-value {
  font-size: 1.5rem;
  font-weight: 600;
}

.status-label {
  font-size: 0.9rem;
}

.product-thumbnail {
  --size: 48px;
  background-color: var(--ion-color-primary-tint);
  display: flex;
  border-radius: 8px;
}

.product-icon {
  font-size: 24px;
  color: var(--ion-color-primary);
}

.quantity {
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--ion-color-dark);
}

.unit {
  font-size: 0.7rem;
  color: var(--ion-color-medium);
}
</style>
