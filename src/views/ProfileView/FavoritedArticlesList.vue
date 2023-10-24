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
import { useGetArticlesByFavorited } from '@/hooks/article';
import ArticlePreview from '@/components/ArticlePreview.vue';

interface Props {
  username: string;
}

const { username } = defineProps<Props>();

const currentPage = ref(1);
const usernameToRef = ref(username);
const { data: articlesInfo, isLoading, isError } = useGetArticlesByFavorited(usernameToRef, currentPage);
const totalPages = computed(() => Math.ceil((articlesInfo.value?.articlesCount ?? 10) / 10));
</script>
