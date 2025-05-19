<template>
  <ion-card class="menu-tile-card ion-activatable" :disabled="disabled" button @click="navigateTo">
    <ion-ripple-effect></ion-ripple-effect>
    <ion-card-content class="ion-text-center">
      <ion-icon :icon="getIconName()" color="primary"></ion-icon>
      <ion-text>
        <h3 class="ion-no-margin ion-margin-bottom">{{ title }}</h3>
      </ion-text>
      <ion-text>
        <p class="ion-no-margin">{{ description }}</p>
      </ion-text>
    </ion-card-content>
  </ion-card>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { IonCard, IonCardContent, IonIcon, IonText, IonRippleEffect } from '@ionic/vue';
import { useRouter } from 'vue-router';
import { 
  peopleOutline, 
  carOutline, 
  cubeOutline, 
  cashOutline,
  buildOutline,
  analyticsOutline
} from 'ionicons/icons';

export default defineComponent({
  name: 'MenuTile',
  components: {
    IonCard,
    IonCardContent,
    IonIcon,
    IonText,
    IonRippleEffect
  },
  props: {
    title: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    },
    description: {
      type: String,
      default: ''
    },
    to: {
      type: String,
      default: '#'
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const router = useRouter();
    
    const getIconName = () => {
      switch(props.icon) {
        case 'people': return peopleOutline;
        case 'car': return carOutline;
        case 'cube': return cubeOutline;
        case 'cash': return cashOutline;
        case 'build': return buildOutline;
        case 'analytics': return analyticsOutline;
        default: return peopleOutline;
      }
    };
    
    const navigateTo = () => {
      if (!props.disabled && props.to !== '#') {
        router.push(props.to);
      }
    };
    
    return {
      getIconName,
      navigateTo
    };
  }
});
</script>

<style scoped>
/* 使用 Ionic 內建的樣式，僅保留必要的自定義樣式 */

ion-card.menu-tile-card {
  margin: 0;
  height: 100%;
  border-radius: 12px;
  cursor: pointer;
  transition: transform 0.2s ease;
  overflow: hidden;
}

ion-card[disabled] {
  opacity: 0.6;
  pointer-events: none;
}

ion-card.menu-tile-card:active {
  transform: scale(0.98);
}

/* 圖標樣式 */
ion-icon {
  font-size: 2.5rem;
  margin-bottom: 0.75rem;
}

/* 標題樣式 */
h3 {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem !important;
}

/* 描述文字樣式 */
p {
  font-size: 0.8rem;
}
</style>
