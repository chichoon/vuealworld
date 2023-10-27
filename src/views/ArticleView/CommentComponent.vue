<template>
  <div class="card">
    <div class="card-block">
      <p class="card-text">{{ props.commentInfo.body }}</p>
    </div>
    <div class="card-footer">
      <RouterLink :to="`/profile/${props.commentInfo.author.username}`" class="comment-author">
        <img :src="props.commentInfo.author.image" class="comment-author-img" />
      </RouterLink>
      &nbsp;
      <RouterLink :to="`/profile/${props.commentInfo.author.username}`" class="comment-author">{{
        props.commentInfo.author.username
      }}</RouterLink>
      <span class="date-posted">{{ new Date(props.commentInfo.createdAt).toDateString() }}</span>
      <button
        v-if="currentUser?.username === props.commentInfo.author.username"
        class="mod-options delete-button"
        @click="handleDeleteComment"
      >
        <i class="ion-trash-a"></i>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGetCurrentUserData } from '@/hooks/user';
import type { CommentData } from '@/types/comments';

interface Props {
  commentInfo: CommentData;
}

const props = defineProps<Props>();
const emits = defineEmits(['delete-comment']);

const { data: currentUser } = useGetCurrentUserData();

function handleDeleteComment() {
  emits('delete-comment', props.commentInfo.id);
}
</script>

<style scoped>
.delete-button {
  background: none;
  border: none;
}
</style>
