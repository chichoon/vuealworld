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

import { useGetComments } from '@/01_application/server-hooks/comment/query';
import { useDeleteComment, usePostComment } from '@/01_application/server-hooks/comment/mutation';
import CommentComponent from './CommentComponent.vue';
import type { Text, ID, Slug, URLString } from '@/00_domain/common/value';

interface Props {
  slug: Slug;
  currentUserImage?: URLString;
}

const props = defineProps<Props>();
const queryClient = useQueryClient();

const commentBody = ref<Text>('');
const slugToRef = toRef<Props, 'slug'>(props, 'slug');
const { mutate: postComment } = usePostComment(queryClient, slugToRef);
const { mutate: deleteComment } = useDeleteComment(queryClient, slugToRef);
const { data: commentsData } = useGetComments(slugToRef);

function handleSubmit() {
  postComment(commentBody.value);
  commentBody.value = '';
}

function handleDeleteComment(commentID: ID) {
  if (!confirm('Are you sure to delete this comment?')) return;
  deleteComment(commentID);
}
</script>
