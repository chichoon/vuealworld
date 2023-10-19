<template>
  <div class="article-meta">
    <a :href="`/profile/${articleInfo.author.username}`"><img :src="articleInfo.author.image" /></a>
    <div class="info">
      <a :href="`/profile/${articleInfo.author.username}`" class="author">{{ articleInfo.author.username }}</a>
      <span class="date">{{ new Date(articleInfo.createdAt).toDateString() }}</span>
    </div>
    &nbsp;&nbsp;
    <template v-if="isMyArticle">
      <button class="btn btn-sm btn-outline-secondary"><i class="ion-edit"></i><span> Edit Article</span></button>
      <button class="btn btn-sm btn-outline-danger"><i class="ion-trash-a"></i><span> Delete Article</span></button>
    </template>
    <template v-else-if="isLoggedIn">
      <button class="btn btn-sm btn-outline-secondary">
        <i class="ion-plus-round"></i>
        <span> Follow {{ articleInfo.author.username }}</span>
      </button>
      <button class="btn btn-sm btn-outline-primary">
        <i class="ion-heart"></i>
        <span> Favorite Post ({{ articleInfo.favoritesCount }})</span>
      </button>
    </template>
  </div>
</template>

<script setup lang="ts">
import { usePostFavorite } from '@/hooks/article';
import type { ArticleData } from '@/types/article';

interface Props {
  articleInfo: ArticleData;
  isMyArticle: boolean;
  isLoggedIn: boolean;
}

const { articleInfo, isMyArticle, isLoggedIn } = defineProps<Props>();

const { mutate: favoriteMutate } = usePostFavorite(articleInfo.slug);
</script>
