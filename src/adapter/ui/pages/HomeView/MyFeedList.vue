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

import ArticlePreview from '@/components/ArticlePreview.vue';
import LoadingComponent from '@/components/LoadingComponent.vue';
import ErrorComponent from '@/components/ErrorComponent.vue';
import PaginationComponent from '@/components/PaginationComponent.vue';
import { useDeleteFavorite, useGetFeeds, usePostFavorite } from '@/hooks/article';

const currentPage = ref(1);
const totalPages = computed(() => Math.ceil((articlesInfo.value?.articlesCount ?? 10) / 10));
const { data: articlesInfo, isLoading, isError } = useGetFeeds(currentPage);
const queryClient = useQueryClient();

const { mutate: favoriteMutate } = usePostFavorite(queryClient, { type: 'feed', page: currentPage });
const { mutate: unfavoriteMutate } = useDeleteFavorite(queryClient, { type: 'feed', page: currentPage });
</script>
