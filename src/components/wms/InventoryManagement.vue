<template>
  <div class="inventory-management">
    <div class="section-header">
      <h3 class="section-title">Inventory Status</h3>
      <ion-button size="small" fill="clear">
        <ion-icon slot="icon-only" :icon="searchOutline"></ion-icon>
      </ion-button>
    </div>
    
    <ion-card class="status-card">
      <ion-card-content>
        <div class="status-grid">
          <div class="status-item">
            <div class="status-value">1,248</div>
            <div class="status-label">Total SKUs</div>
          </div>
          <div class="status-item">
            <div class="status-value">36</div>
            <div class="status-label">Low Stock</div>
          </div>
          <div class="status-item">
            <div class="status-value">98.2%</div>
            <div class="status-label">Availability</div>
          </div>
          <div class="status-item">
            <div class="status-value">87</div>
            <div class="status-label">Restock Needed</div>
          </div>
        </div>
      </ion-card-content>
    </ion-card>
    
    <ion-segment v-model="selectedCategory" class="category-segment">
      <ion-segment-button value="all">
        <ion-label>All</ion-label>
      </ion-segment-button>
      <ion-segment-button value="bulbs">
        <ion-label>Bulbs</ion-label>
      </ion-segment-button>
      <ion-segment-button value="fixtures">
        <ion-label>Fixtures</ion-label>
      </ion-segment-button>
    </ion-segment>
    
    <ion-list>
      <ion-item v-for="product in filteredProducts" :key="product.id" button detail class="product-item">
        <ion-thumbnail slot="start" class="product-thumbnail">
          <ion-icon :icon="getProductIcon(product.category)" class="product-icon"></ion-icon>
        </ion-thumbnail>
        <ion-label>
          <h2>{{ product.name }}</h2>
          <h3>SKU: {{ product.sku }}</h3>
          <p>
            <ion-badge :color="getStockColor(product.stockLevel)">
              {{ getStockStatus(product.stockLevel) }}
            </ion-badge>
            <ion-text color="medium"> • Location: {{ product.location }}</ion-text>
          </p>
        </ion-label>
        <div slot="end" class="quantity-display">
          <div class="quantity">{{ product.quantity }}</div>
          <div class="unit">units</div>
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
    IonCard,
    IonCardContent,
    IonThumbnail,
    IonFab,
    IonFabButton
  },
  setup() {
    const selectedCategory = ref('all');
    
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
        case 'high': return 'In Stock';
        case 'medium': return 'Adequate';
        case 'low': return 'Low Stock';
        case 'out': return 'Out of Stock';
        default: return 'Unknown';
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
.inventory-management {
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

.status-card {
  margin-bottom: 1rem;
  border-radius: 12px;
}

.status-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.status-item {
  text-align: center;
  padding: 0.5rem;
}

.status-value {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--ion-color-primary);
}

.status-label {
  font-size: 0.9rem;
  color: var(--ion-color-medium);
}

.category-segment {
  margin-bottom: 1rem;
}

.product-item {
  --padding-start: 16px;
  --inner-padding-end: 16px;
  margin-bottom: 8px;
  border-radius: 8px;
  --background: var(--ion-color-light);
}

.product-thumbnail {
  --size: 48px;
  background-color: var(--ion-color-primary-tint);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
}

.product-icon {
  font-size: 24px;
  color: var(--ion-color-primary);
}

.quantity-display {
  text-align: center;
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
