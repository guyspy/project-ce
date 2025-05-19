<template>
  <router-link :to="disabled ? '#' : to" class="menu-tile-link" :class="{ 'menu-tile-disabled': disabled }">
    <div class="menu-tile">
      <ion-icon :icon="getIconName()" class="tile-icon"></ion-icon>
      <h3 class="tile-title">{{ title }}</h3>
      <p class="tile-description">{{ description }}</p>
    </div>
  </router-link>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { IonIcon } from '@ionic/vue';
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
    IonIcon
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
    
    return {
      getIconName
    };
  }
});
</script>

<style scoped>
.menu-tile-link {
  text-decoration: none;
  color: inherit;
}

.menu-tile {
  background-color: var(--ion-color-light);
  border-radius: 12px;
  padding: 1.5rem 1rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  transition: all 0.2s ease;
}

.menu-tile:active {
  transform: scale(0.98);
  background-color: var(--ion-color-light-shade);
}

.tile-icon {
  font-size: 2.5rem;
  color: var(--ion-color-primary);
  margin-bottom: 0.75rem;
}

.tile-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 0.5rem;
  color: var(--ion-color-dark);
}

.tile-description {
  font-size: 0.8rem;
  margin: 0;
  color: var(--ion-color-medium);
}

.menu-tile-disabled {
  pointer-events: none;
}

.menu-tile-disabled .menu-tile {
  opacity: 0.6;
}
</style>
