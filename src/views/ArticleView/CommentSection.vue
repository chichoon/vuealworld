import CommentComponent from './CommentComponent.vue';
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

      <CommentComponent v-for="i in 10" :key="i" />
    </div>
  </div>
</template>

<script setup lang="ts">
import CommentComponent from './CommentComponent.vue';
</script>
