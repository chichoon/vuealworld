<template>
  <div class="article-preview">
    <div class="article-meta">
      <RouterLink :to="`/profile/${articleInfo.author.username}`"
        ><img
          :src="
            articleInfo.author.image.length > 0
              ? articleInfo.author.image
              : 'https://static.vecteezy.com/system/resources/previews/008/442/086/non_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg'
          "
      /></RouterLink>
      <div class="info">
        <RouterLink :to="`/profile/${articleInfo.author.username}`" class="author">{{
          articleInfo.author.username
        }}</RouterLink>
        <span class="date">{{ new Date(articleInfo.createdAt).toDateString() }}</span>
      </div>
      <button
        @click="handleClickFavorite"
        class="btn btn-outline-primary btn-sm pull-xs-right"
        :class="{ favorited: articleInfo.favorited }"
      >
        <i class="ion-heart"></i>
        <span> {{ articleInfo.favoritesCount }}</span>
      </button>
    </div>
    <RouterLink :to="`/article/${articleInfo.slug}`" class="preview-link">
      <h1>{{ articleInfo.title }}</h1>
      <p>{{ articleInfo.description }}</p>
      <span>Read more...</span>
      <ul class="tag-list">
        <li
          v-for="tag in articleInfo.tagList"
          class="tag-default tag-pill tag-outline"
          :key="`${articleInfo.slug}-${tag}`"
        >
          {{ tag }}
        </li>
      </ul>
    </RouterLink>
  </div>
</template>

<script lang="ts" setup>
import { useQueryClient } from '@tanstack/vue-query';

import { usePostFavorite, useDeleteFavorite } from '@/hooks/article';
import type { ArticleData } from '@/types/article';

interface Props {
  articleInfo: ArticleData;
}

const { articleInfo } = defineProps<Props>();
const queryClient = useQueryClient();

const { mutate: favoriteMutate } = usePostFavorite(queryClient, articleInfo.slug);
const { mutate: unfavoriteMutate } = useDeleteFavorite(queryClient, articleInfo.slug);

function handleClickFavorite() {
  if (articleInfo.favorited) {
    unfavoriteMutate();
  } else {
    favoriteMutate();
  }
}
</script>

<style scoped>
.favorited {
  background-color: #5cb85c44;
}
</style>
