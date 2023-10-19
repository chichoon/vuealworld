<template>
  <div class="row">
    <div class="col-xs-12 col-md-8 offset-md-2">
      <form class="card comment-form" @submit.prevent="handleSubmit">
        <div class="card-block">
          <textarea class="form-control" placeholder="Write a comment..." rows="3" v-model="commentBody"></textarea>
        </div>
        <div class="card-footer">
          <img src="http://i.imgur.com/Qr71crq.jpg" class="comment-author-img" />
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
import { ref } from 'vue';

import { useDeleteComment, useGetComments, usePostComment } from '@/hooks/comments';
import CommentComponent from './CommentComponent.vue';

interface Props {
  slug: string;
}

const { slug } = defineProps<Props>();

const commentBody = ref('');

const { mutate: postComment } = usePostComment(slug);
const { mutate: deleteComment } = useDeleteComment(slug);
const { data: commentsData } = useGetComments(slug);

function handleSubmit() {
  postComment(commentBody.value);
}

function handleDeleteComment(commentID: number) {
  deleteComment(commentID);
}
</script>
