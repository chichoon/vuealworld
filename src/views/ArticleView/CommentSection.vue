<template>
  <div class="row">
    <div class="col-xs-12 col-md-8 offset-md-2">
      <form class="card comment-form">
        <div class="card-block">
          <textarea class="form-control" placeholder="Write a comment..." rows="3"></textarea>
        </div>
        <div class="card-footer">
          <img src="http://i.imgur.com/Qr71crq.jpg" class="comment-author-img" />
          <button class="btn btn-sm btn-primary">Post Comment</button>
        </div>
      </form>

      <CommentComponent v-for="comment in commentsData" :key="comment.id" :comment-data="comment" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGetComments } from '@/hooks/comments';
import CommentComponent from './CommentComponent.vue';

interface Props {
  slug: string;
}

const { slug } = defineProps<Props>();

const { data: commentsData } = useGetComments(slug);
</script>
