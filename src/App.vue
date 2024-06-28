<template>
  <Navigation/>
  <router-view />
</template>

<script>
import AppLayout from '@/components/Navigation.vue';
import Navigation from '@/components/Navigation.vue';

export default {
  components: { AppLayout, Navigation }
};
</script>

<style>
html, body, #app {
  height: 100%;
  margin: 0;
}
</style>
