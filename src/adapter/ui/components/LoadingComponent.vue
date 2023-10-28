<template>
  <div class="loading-wrapper">
    <LoadingIcon class="loading-icon" />
  </div>
</template>

<script setup lang="ts">
import LoadingIcon from './icons/LoadingIcon.vue';
</script>

<style scoped>
@keyframes loadingSpin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.loading-wrapper {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 0;
}

.loading-icon {
  width: 40px;
  height: 40px;
  animation: loadingSpin 1s linear infinite;
}
</style>
