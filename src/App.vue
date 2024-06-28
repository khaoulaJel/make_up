<template>

    <router-view />
</template>

<script>
import AppLayout from '@/components/Navigation.vue';

export default {
  components: { AppLayout }
};
</script>

<style>
html, body, #app {
  height: 100%;
  margin: 0;
}
</style>
