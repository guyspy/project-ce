<template>
  <ion-card class="stats-card">
    <ion-card-content>
      <ion-grid>
        <ion-row>
          <ion-col v-for="(stat, index) in stats" :key="index" size="6" class="ion-text-center">
            <ion-text :color="stat.color || 'primary'"><h2 class="ion-no-margin stats-value">{{ stat.value }}</h2></ion-text>
            <ion-text color="medium"><p class="ion-no-margin">{{ stat.label }}</p></ion-text>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-card-content>
  </ion-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {
  IonCard,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol,
  IonText
} from '@ionic/vue';

export interface StatItem {
  value: string | number;
  label: string;
  color?: string;
}

export default defineComponent({
  name: 'StatsCard',
  components: {
    IonCard,
    IonCardContent,
    IonGrid,
    IonRow,
    IonCol,
    IonText
  },
  props: {
    stats: {
      type: Array as () => StatItem[],
      required: true,
      validator: (value: StatItem[]) => {
        // 確保每組統計數據都有值和標籤
        return value.every(stat => 'value' in stat && 'label' in stat);
      }
    }
  }
});
</script>

<style scoped>
.stats-card {
  margin-bottom: 16px;
}

.stats-value {
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 4px;
}
</style>