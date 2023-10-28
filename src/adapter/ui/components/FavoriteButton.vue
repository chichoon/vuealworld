<template>
  <button class="btn btn-sm btn-outline-primary" :class="{ favorited: props.isFavorited }" @click="emits('favorite')">
    <i class="ion-heart"></i>
    <span v-if="props.isShortVersion"> {{ props.favoritesCount }}</span>
    <span v-else> Favorite Post ({{ props.favoritesCount }})</span>
  </button>
</template>

<script setup lang="ts">
interface Props {
  isFavorited: boolean;
  favoritesCount: number;
  isShortVersion?: boolean;
}

interface Emits {
  (e: 'favorite'): void;
}

const props = defineProps<Props>();
const emits = defineEmits<Emits>();
</script>

<style scoped>
.favorited {
  background-color: #5cb85c44;
}
</style>
