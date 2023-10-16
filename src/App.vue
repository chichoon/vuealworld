<script setup lang="ts">
import { RouterView } from 'vue-router';
import NavHeader from './components/NavHeader/NavHeader.vue';
</script>

<template>
  <NavHeader />
  <RouterView />
</template>

<style lang="scss">
@import '@/assets/colors.scss';
</style>
