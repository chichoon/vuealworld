<template>
  <button class="button">
    <span>{{ text }}</span>
  </button>
</template>

<script setup lang="ts">
defineProps(['text']);
</script>

<style lang="scss" scoped>
.button {
  background-color: var(--theme-color);
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  color: #ffffff;
  font-size: 20px;
  transition: transform 0.1s ease-in;

  &:hover {
    background-color: var(--theme-color-hover);
    cursor: pointer;
  }

  &:active {
    transform: scale(95%);
  }
}
</style>
