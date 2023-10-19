<template>
  <template v-if="articlesData">
    <ArticlePreview v-for="article in articlesData.articles" :key="article.slug" :article-info="article" />
    <PaginationComponent v-model:currentPage="currentPage" :totalPages="totalPages" />
  </template>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

import ArticlePreview from '@/components/ArticlePreview.vue';
import PaginationComponent from '@/components/PaginationComponent.vue';
import { useGetArticles } from '@/hooks/article';

const currentPage = ref(1);
const { data: articlesData } = useGetArticles(currentPage.value);
const totalPages = computed(() => Math.ceil((articlesData.value?.articlesCount ?? 10) / 10));
</script>
