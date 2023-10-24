<template>
  <LoadingComponent v-if="isLoading" />
  <ErrorComponent v-else-if="isError" />
  <template v-else-if="articlesInfo">
    <ArticlePreview v-for="article in articlesInfo.articles" :key="article.slug" :article-info="article" />
    <PaginationComponent v-model:currentPage="currentPage" :totalPages="totalPages" />
  </template>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

import ArticlePreview from '@/components/ArticlePreview.vue';
import LoadingComponent from '@/components/LoadingComponent.vue';
import ErrorComponent from '@/components/ErrorComponent.vue';
import PaginationComponent from '@/components/PaginationComponent.vue';
import { useGetArticlesByTag } from '@/hooks/article';

const route = useRoute();
const currentPage = ref(1);
const tag = computed(() => route.query.tag as string);
const { data: articlesInfo, isLoading, isError } = useGetArticlesByTag(tag, currentPage);
const totalPages = computed(() => Math.ceil((articlesInfo.value?.articlesCount ?? 10) / 10));

watch(tag, () => {
  currentPage.value = 1;
});
</script>
