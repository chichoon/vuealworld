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
import { computed, ref, toRef } from 'vue';
import { useQueryClient } from '@tanstack/vue-query';

import LoadingComponent from '@/02_adapter/ui/components/LoadingComponent.vue';
import ErrorComponent from '@/02_adapter/ui/components/ErrorComponent.vue';
import PaginationComponent from '@/02_adapter/ui/components/PaginationComponent.vue';
import ArticlePreview from '@/02_adapter/ui/components/ArticlePreview.vue';
import { useGetArticlesByAuthor } from '@/01_application/server-hooks/article/query';
import { useDeleteFavorite, usePostFavorite } from '@/01_application/server-hooks/article/mutation';

interface Props {
  username: string;
}

const props = defineProps<Props>();

const currentPage = ref(1);
const usernameToRef = toRef(props.username);
const { data: articlesInfo, isLoading, isError } = useGetArticlesByAuthor(usernameToRef, currentPage);
const totalPages = computed(() => Math.ceil((articlesInfo.value?.articlesCount ?? 10) / 10));
const queryClient = useQueryClient();

const { mutate: favoriteMutate } = usePostFavorite(queryClient, {
  type: 'author',
  page: currentPage,
  by: usernameToRef,
});
const { mutate: unfavoriteMutate } = useDeleteFavorite(queryClient, {
  type: 'author',
  page: currentPage,
  by: usernameToRef,
});
</script>