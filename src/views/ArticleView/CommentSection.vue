<template>
  <div class="row">
    <div class="col-xs-12 col-md-8 offset-md-2">
      <form class="card comment-form" @submit.prevent="handleSubmit">
        <div class="card-block">
          <textarea class="form-control" placeholder="Write a comment..." rows="3" v-model="commentBody"></textarea>
        </div>
        <div class="card-footer">
          <img :src="props.currentUserImage" class="comment-author-img" />
          <button class="btn btn-sm btn-primary" type="submit">Post Comment</button>
        </div>
      </form>

      <CommentComponent
        v-for="comment in commentsData"
        :key="comment.id"
        :comment-info="comment"
        @delete-comment="handleDeleteComment"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, toRef } from 'vue';
import { useQueryClient } from '@tanstack/vue-query';

import { useDeleteComment, useGetComments, usePostComment } from '@/hooks/comments';
import CommentComponent from './CommentComponent.vue';

interface Props {
  slug: string;
  currentUserImage?: string;
}

const props = defineProps<Props>();
const queryClient = useQueryClient();

const commentBody = ref('');
const slugToRef = toRef(props, 'slug');
const { mutate: postComment } = usePostComment(queryClient, slugToRef);
const { mutate: deleteComment } = useDeleteComment(queryClient, slugToRef);
const { data: commentsData } = useGetComments(slugToRef);

function handleSubmit() {
  postComment(commentBody.value);
  commentBody.value = '';
}

function handleDeleteComment(commentID: number) {
  if (!confirm('Are you sure to delete this comment?')) return;
  deleteComment(commentID);
}
</script>
