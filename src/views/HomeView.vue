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
            <PaginationComponent :currentPage="currentPage" :totalPages="totalPages" />
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
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

import ArticlePreview from '@/components/ArticlePreview.vue';
import PaginationComponent from '@/components/PaginationComponent.vue';
import { useGetArticles } from '@/hooks/article';
import { useGetTags } from '@/hooks/tag';
import router from '@/router';

const route = useRoute();

const currentPage = ref(1);
const { data: articlesData } = useGetArticles(currentPage.value);
const { data: tags } = useGetTags();

const totalPages = computed(() => Math.ceil((articlesData.value?.articlesCount ?? 10) / 10));

watch(
  () => route.query.page,
  () => {
    console.log('hi query changed');
    currentPage.value = route.query.page ? Number(route.query.page) : 1;
  },
);

function handleClickMyFeed() {
  router.replace({ path: '#', query: { tab: 'my-feed', page: '1' } });
}

function handleClickGlobalFeed() {
  router.replace({ path: '#', query: { tab: 'global-feed', page: '1' } });
}
</script>
