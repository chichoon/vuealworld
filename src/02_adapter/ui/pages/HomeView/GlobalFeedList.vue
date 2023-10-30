<template>
  <LoadingComponent v-if="isLoading" />
  <ErrorComponent v-else-if="isError" />
  <template v-else-if="articlesInfo">
    <ArticlePreview
      v-for="article in articlesInfo.articles"
      :key="article.slug"
      :article-info="article"
      @favorite="favoriteMutate"
      @unfavorite="unfavoriteMutate"
    />
    <PaginationComponent v-model:currentPage="currentPage" :totalPages="totalPages" />
  </template>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useQueryClient } from '@tanstack/vue-query';

import ArticlePreview from '@/02_adapter/ui/components/ArticlePreview.vue';
import LoadingComponent from '@/02_adapter/ui/components/LoadingComponent.vue';
import ErrorComponent from '@/02_adapter/ui/components/ErrorComponent.vue';
import PaginationComponent from '@/02_adapter/ui/components/PaginationComponent.vue';
import { useDeleteFavorite, usePostFavorite } from '@/01_application/server-hooks/article/mutation';
import { useGetArticles } from '@/01_application/server-hooks/article/query';

const currentPage = ref(1);
const totalPages = computed(() => Math.ceil((articlesInfo.value?.articlesCount ?? 10) / 10));
const { data: articlesInfo, isLoading, isError } = useGetArticles(currentPage);
const queryClient = useQueryClient();

const { mutate: favoriteMutate } = usePostFavorite(queryClient, { type: 'global', page: currentPage });
const { mutate: unfavoriteMutate } = useDeleteFavorite(queryClient, { type: 'global', page: currentPage });
</script>
