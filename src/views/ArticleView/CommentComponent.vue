<template>
  <div class="card">
    <div class="card-block">
      <p class="card-text">{{ commentInfo.body }}</p>
    </div>
    <div class="card-footer">
      <RouterLink :to="`/profile/${commentInfo.author.username}`" class="comment-author">
        <img :src="commentInfo.author.image" class="comment-author-img" />
      </RouterLink>
      &nbsp;
      <RouterLink :to="`/profile/${commentInfo.author.username}`" class="comment-author">{{
        commentInfo.author.username
      }}</RouterLink>
      <span class="date-posted">{{ new Date(commentInfo.createdAt).toDateString() }}</span>
      <button class="mod-options delete-button" @click="handleDeleteComment">
        <i class="ion-trash-a"></i>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CommentData } from '@/types/comments';

interface Props {
  commentInfo: CommentData;
}

const { commentInfo } = defineProps<Props>();
const emits = defineEmits(['delete-comment']);

function handleDeleteComment() {
  emits('delete-comment', commentInfo.id);
}
</script>

<style scoped>
.delete-button {
  background: none;
  border: none;
}
</style>
