<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

    <!-- 컴포넌트 추가 -->
    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <button
                  @click="handleClickMyFeed"
                  class="nav-link"
                  :class="{ active: !route.query.tab || route.query.tab === 'my-feed' }"
                >
                  Your Feed
                </button>
              </li>
              <li class="nav-item">
                <button
                  @click="handleClickGlobalFeed"
                  class="nav-link"
                  :class="{ active: route.query.tab === 'global-feed' }"
                >
                  Global Feed
                </button>
              </li>
            </ul>
          </div>
          <template v-if="articlesData">
            <ArticlePreview v-for="article in articlesData.articles" :article-info="article" :key="article.slug" />
            <PaginationComponent v-model:currentPage="currentPage" :totalPages="totalPages" />
          </template>
        </div>
        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>
            <div class="tag-list">
              <a href="" v-for="tag in tags" :key="tag" class="tag-pill tag-default">{{ tag }}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeMount, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

import ArticlePreview from '@/components/ArticlePreview.vue';
import PaginationComponent from '@/components/PaginationComponent.vue';
import { useGetArticles } from '@/hooks/article';
import { useGetTags } from '@/hooks/tag';
import router from '@/router';
import { useGetFeeds } from '@/hooks/article/useGetFeeds';
import type { ArticlesResponse } from '@/types/article';

const route = useRoute();

const currentPage = ref(1);
const { data: tags } = useGetTags();

const totalPages = computed(() => Math.ceil((articlesData.value?.articlesCount ?? 10) / 10));
const articlesData = ref<ArticlesResponse>({ articles: [], articlesCount: 0 });

onBeforeMount(() => {
  if (route.query.tab === 'my-feed') {
    const { data } = useGetFeeds(currentPage.value);
    if (!data.value) return;
    articlesData.value = data.value;
  } else {
    const { data } = useGetArticles(currentPage.value);
    if (!data.value) return;
    articlesData.value = data.value;
  }
});

watch(currentPage, () => {
  console.log(currentPage.value);
  if (route.query.tab === 'my-feed') {
    const { data: articlesData } = useGetFeeds(currentPage.value);
  } else {
    useGetArticles(currentPage.value);
  }
});

watch(
  () => route.query.tab,
  () => {
    currentPage.value = 1;
    if (route.query.tab === 'my-feed') {
      const { data } = useGetFeeds(currentPage.value);
      if (!data.value) return;
      articlesData.value = data.value;
    } else {
      const { data } = useGetArticles(currentPage.value);
      if (!data.value) return;
      articlesData.value = data.value;
    }
  },
);

function handleClickMyFeed() {
  router.replace({ path: '#', query: { tab: 'my-feed' } });
}

function handleClickGlobalFeed() {
  router.replace({ path: '#', query: { tab: 'global-feed' } });
}
</script>
