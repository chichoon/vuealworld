<template>
  <button class="btn btn-lg btn-primary pull-xs-right">
    <span>{{ text }}</span>
  </button>
</template>

<script setup lang="ts">
defineProps(['text']);
</script>

<style lang="scss" scoped></style>
