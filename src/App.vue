<template>
  <NavHeader />
  <RouterView />
  <FooterComponent />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import NavHeader from './components/NavHeader/NavHeader.vue';
import FooterComponent from './components/FooterComponent.vue';
</script>

<style lang="scss">
@import '@/assets/colors.scss';
</style>
