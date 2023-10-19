<template>
  <LoadingComponent v-if="isLoading" />
  <ErrorComponent v-else-if="isError" />
  <template v-else-if="articlesData">
    <ArticlePreview v-for="article in articlesData.articles" :key="article.slug" :article-info="article" />
    <PaginationComponent v-model:currentPage="currentPage" :totalPages="totalPages" />
  </template>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';

import ArticlePreview from '@/components/ArticlePreview.vue';
import LoadingComponent from '@/components/LoadingComponent.vue';
import ErrorComponent from '@/components/ErrorComponent.vue';
import PaginationComponent from '@/components/PaginationComponent.vue';
import { useGetArticles } from '@/hooks/article';

const currentPage = ref(1);
const { data: articlesData, isLoading, isError } = useGetArticles(currentPage);
const totalPages = computed(() => Math.ceil((articlesData.value?.articlesCount ?? 10) / 10));

watch(currentPage, () => {
  console.log(currentPage.value);
});
</script>
