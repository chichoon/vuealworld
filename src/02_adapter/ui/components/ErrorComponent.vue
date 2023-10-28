<template>
  <div class="error-wrapper">
    <span class="error-text">{{ props.error ?? 'There was an error rendering a component' }}</span>
  </div>
</template>

<script setup lang="ts">
interface Props {
  error?: Error | string;
}

const props = defineProps<Props>();
</script>

<style scoped>
.error-wrapper {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 0;
}

.error-text {
  color: #74b666;
}
</style>
