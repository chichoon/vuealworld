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
          <MyFeedList v-if="!route.query.tab || route.query.tab === 'my-feed'" />
          <GlobalFeedList v-else-if="route.query.tab === 'global-feed'" />
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
import { useRoute } from 'vue-router';

import { useGetTags } from '@/hooks/tag';
import router from '@/router';
import MyFeedList from './MyFeedList.vue';
import GlobalFeedList from './GlobalFeedList.vue';

const route = useRoute();
const { data: tags } = useGetTags();

function handleClickMyFeed() {
  router.replace({ path: '', query: { tab: 'my-feed' } });
}

function handleClickGlobalFeed() {
  router.replace({ path: '', query: { tab: 'global-feed' } });
}
</script>
