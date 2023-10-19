<template>
  <div class="article-meta">
    <a :href="`/profile/${articleData.author.username}`"><img :src="articleData.author.image" /></a>
    <div class="info">
      <a :href="`/profile/${articleData.author.username}`" class="author">{{ articleData.author.username }}</a>
      <span class="date">{{ new Date(articleData.createdAt).toDateString() }}</span>
    </div>
    <button class="btn btn-sm btn-outline-secondary">
      <i class="ion-plus-round"></i>
      <span> Follow {{ articleData.author.username }}</span>
    </button>
    &nbsp;&nbsp;
    <template v-if="isMyArticle">
      <button class="btn btn-sm btn-outline-secondary"><i class="ion-edit"></i><span> Edit Article</span></button>
      <button class="btn btn-sm btn-outline-danger"><i class="ion-trash-a"></i><span> Delete Article</span></button>
    </template>
    <template v-else>
      <button class="btn btn-sm btn-outline-primary">
        <i class="ion-heart"></i>
        <span> Favorite Post ({{ articleData.favoritesCount }})</span>
      </button>
    </template>
  </div>
</template>

<script setup lang="ts">
import type { ArticleData } from '@/types/article';

interface Props {
  articleData: ArticleData;
  isMyArticle: boolean;
}

const { articleData, isMyArticle } = defineProps<Props>();
</script>
