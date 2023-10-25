<template>
  <div class="article-meta">
    <a :href="`/profile/${articleInfo.author.username}`"><img :src="articleInfo.author.image" /></a>
    <div class="info">
      <a :href="`/profile/${articleInfo.author.username}`" class="author">{{ articleInfo.author.username }}</a>
      <span class="date">{{ new Date(articleInfo.createdAt).toDateString() }}</span>
    </div>
    &nbsp;&nbsp;
    <template v-if="isMyArticle">
      <RouterLink :to="`/editor/${articleInfo.slug}`" class="btn btn-sm btn-outline-secondary"
        ><i class="ion-edit"></i><span> Edit Article</span></RouterLink
      >
      <button class="btn btn-sm btn-outline-danger" @click="handleClickDelete">
        <i class="ion-trash-a"></i><span> Delete Article</span>
      </button>
    </template>
    <template v-else-if="isLoggedIn">
      <button
        class="btn btn-sm btn-outline-secondary"
        :class="{ following: articleInfo.author.following }"
        @click="handleClickFollow"
      >
        <i class="ion-plus-round"></i>
        <span> Follow {{ articleInfo.author.username }}</span>
      </button>
      <button
        class="btn btn-sm btn-outline-primary"
        :class="{ favorite: articleInfo.favorited }"
        @click="handleClickFavorite"
      >
        <i class="ion-heart"></i>
        <span> Favorite Post ({{ articleInfo.favoritesCount }})</span>
      </button>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, toRef } from 'vue';
import { useQueryClient } from '@tanstack/vue-query';

import { useDeleteArticle, useDeleteFavorite, usePostFavorite } from '@/hooks/article';
import { useDeleteFollow, usePostFollow } from '@/hooks/profile';
import router from '@/router';
import type { ArticleData } from '@/types/article';

interface Props {
  articleInfo: ArticleData;
  isMyArticle: boolean;
  isLoggedIn: boolean;
}

const props = defineProps<Props>();

const queryClient = useQueryClient();
const slugToRef = ref(props.articleInfo.slug);
const usernameToRef = toRef(props.articleInfo.author, 'username');
const { mutate: favoriteMutate } = usePostFavorite(queryClient, slugToRef);
const { mutate: unfavoriteMutate } = useDeleteFavorite(queryClient, slugToRef);
const { mutate: followMutate } = usePostFollow(queryClient, usernameToRef);
const { mutate: unfollowMutate } = useDeleteFollow(queryClient, usernameToRef);
const { mutate: deleteMutate } = useDeleteArticle(queryClient, slugToRef);

function handleClickFavorite() {
  if (props.articleInfo.favorited) {
    unfavoriteMutate();
  } else {
    favoriteMutate();
  }
  // window.location.reload(); // TODO: Fix this hack
}

function handleClickFollow() {
  if (props.articleInfo.author.following) {
    unfollowMutate();
  } else {
    followMutate();
  }
  // window.location.reload(); // TODO: Fix this hack
}

function handleClickDelete() {
  if (!confirm('Are you sure to delete this article?')) return;
  deleteMutate();
  router.push('/');
}
</script>

<style scoped>
.following {
  background-color: #cccccc44;
}

.favorite {
  background-color: #5cb85c44;
}
</style>
