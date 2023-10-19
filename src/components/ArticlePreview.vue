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
      <button class="btn btn-outline-primary btn-sm pull-xs-right">
        <i class="ion-heart"></i>{{ articleInfo.favoritesCount }}
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
import type { ArticleData } from '@/types/article';

interface Props {
  articleInfo: ArticleData;
}

const { articleInfo } = defineProps<Props>();
</script>
