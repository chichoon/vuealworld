<script setup lang="ts">
import { RouterView } from 'vue-router';
import NavHeader from './components/NavHeader/NavHeader.vue';
</script>

<template>
  <div>
    <NavHeader />
    <RouterView />
  </div>
</template>

<style scoped></style>
