<template>
  <button class="btn btn-sm btn-outline-secondary" :class="{ following: props.isFollowing }" @click="emits('follow')">
    <i v-if="props.isFollowing" class="ion-minus-round"></i>
    <i v-else class="ion-plus-round"></i>
    <span>{{ props.isFollowing ? ' Unfollow' : ' Follow' }} {{ props.username }}</span>
  </button>
</template>

<script setup lang="ts">
import type { Username } from '@/00_domain/common/value';

interface Props {
  isFollowing: boolean;
  username: Username;
}

interface Emits {
  (e: 'follow'): void;
}

const props = defineProps<Props>();
const emits = defineEmits<Emits>();
</script>

<style scoped>
.following {
  background-color: #cccccc44;
}
</style>
