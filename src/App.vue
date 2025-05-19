<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
  components: {
    IonApp,
    IonRouterOutlet
  }
});
</script>

<style>
:root {
  /* Primary brand colors for lighting company */
  --ion-color-primary: #3880ff;
  --ion-color-primary-rgb: 56, 128, 255;
  --ion-color-primary-contrast: #ffffff;
  --ion-color-primary-contrast-rgb: 255, 255, 255;
  --ion-color-primary-shade: #3171e0;
  --ion-color-primary-tint: #4c8dff;

  /* Secondary color - warm yellow/amber for lighting */
  --ion-color-secondary: #ffc409;
  --ion-color-secondary-rgb: 255, 196, 9;
  --ion-color-secondary-contrast: #000000;
  --ion-color-secondary-contrast-rgb: 0, 0, 0;
  --ion-color-secondary-shade: #e0ac08;
  --ion-color-secondary-tint: #ffca22;
  
  /* Safe area inset padding */
  --ion-safe-area-top: env(safe-area-inset-top);
  --ion-safe-area-bottom: env(safe-area-inset-bottom);
  --ion-safe-area-left: env(safe-area-inset-left);
  --ion-safe-area-right: env(safe-area-inset-right);
}

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
}
</style>
