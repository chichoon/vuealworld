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
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useQueryClient } from '@tanstack/vue-query';

import ArticlePreview from '@/02_adapter/ui/components/ArticlePreview.vue';
import LoadingComponent from '@/02_adapter/ui/components/LoadingComponent.vue';
import ErrorComponent from '@/02_adapter/ui/components/ErrorComponent.vue';
import PaginationComponent from '@/02_adapter/ui/components/PaginationComponent.vue';
import { useDeleteFavorite, usePostFavorite } from '@/01_application/server-hooks/article/mutation';
import { useGetArticlesByTag } from '@/01_application/server-hooks/article/query';
import type { Tag, Page } from '@/00_domain/common/value';

const route = useRoute();
const currentPage = ref<Page>(1);
const totalPages = computed<Page>(() => Math.ceil((articlesInfo.value?.articlesCount ?? 10) / 10));
const tag = computed<Tag>(() => route.query.tag as Tag);
const { data: articlesInfo, isLoading, isError } = useGetArticlesByTag(tag, currentPage);
const queryClient = useQueryClient();

const { mutate: favoriteMutate } = usePostFavorite(queryClient, { type: 'tagged', page: currentPage, tag: tag });
const { mutate: unfavoriteMutate } = useDeleteFavorite(queryClient, { type: 'tagged', page: currentPage, tag: tag });

watch(tag, () => {
  currentPage.value = 1;
});
</script>
