<template>
  <div class="card">
    <div class="card-block">
      <p class="card-text">{{ commentData.body }}</p>
    </div>
    <div class="card-footer">
      <RouterLink :to="`/profile/${commentData.author.username}`" class="comment-author">
        <img :src="commentData.author.image" class="comment-author-img" />
      </RouterLink>
      &nbsp;
      <RouterLink :to="`/profile/${commentData.author.username}`" class="comment-author">{{
        commentData.author.username
      }}</RouterLink>
      <span class="date-posted">{{ new Date(commentData.createdAt).toDateString() }}</span>
      <button class="mod-options delete-button" @click="handleDeleteComment">
        <i class="ion-trash-a"></i>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CommentData } from '@/types/comments';

interface Props {
  commentData: CommentData;
}

const { commentData } = defineProps<Props>();
const emits = defineEmits(['delete-comment']);

function handleDeleteComment() {
  emits('delete-comment', commentData.id);
}
</script>

<style scoped>
.delete-button {
  background: none;
  border: none;
}
</style>
