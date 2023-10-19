<template>
  <LoadingComponent v-if="isLoading" />
  <ErrorComponent v-else-if="isError" />
  <template v-else-if="articlesInfo">
    <ArticlePreview v-for="article in articlesInfo.articles" :key="article.slug" :article-info="article" />
    <PaginationComponent v-model:currentPage="currentPage" :totalPages="totalPages" />
  </template>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import LoadingComponent from '@/components/LoadingComponent.vue';
import ErrorComponent from '@/components/ErrorComponent.vue';
import PaginationComponent from '@/components/PaginationComponent.vue';
import { useGetArticles } from '@/hooks/article';
import ArticlePreview from '@/components/ArticlePreview.vue';

interface Props {
  username: string;
}

const { username } = defineProps<Props>();

const currentPage = ref(1);
const { data: articlesInfo, isLoading, isError } = useGetArticles(currentPage, { author: username });
const totalPages = computed(() => Math.ceil((articlesInfo.value?.articlesCount ?? 10) / 10));
</script>
