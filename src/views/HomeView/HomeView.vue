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
                  :class="{ active: (!route.query.tab || route.query.tab === 'my-feed') && !route.query.tag }"
                >
                  Your Feed
                </button>
              </li>
              <li class="nav-item">
                <button
                  @click="handleClickGlobalFeed"
                  class="nav-link"
                  :class="{ active: route.query.tab === 'global-feed' && !route.query.tag }"
                >
                  Global Feed
                </button>
              </li>
              <li class="nav-item" v-if="route.query.tag">
                <button disabled @click="handleClickGlobalFeed" class="nav-link" :class="{ active: route.query.tag }">
                  {{ route.query.tag }}
                </button>
              </li>
            </ul>
          </div>
          <template v-if="(!route.query.tab || route.query.tab === 'my-feed') && !route.query.tag">
            <LoadingComponent v-if="isLoading" />
            <ErrorComponent
              v-else-if="isError || (!currentUser && (!route.query.tab || route.query.tab === 'my-feed'))"
              :error="'You must be logged in to access feed list'"
            />
            <MyFeedList v-else-if="!!currentUser" />
          </template>
          <GlobalFeedList v-else-if="route.query.tab === 'global-feed' && !route.query.tag" />
          <TagFeedList v-else-if="route.query.tag" />
        </div>
        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>
            <div class="tag-list">
              <button
                @click="() => handleClickTags(tag)"
                v-for="tag in tags"
                :key="tag"
                class="tag-pill tag-default tag-button"
              >
                {{ tag }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';

import LoadingComponent from '@/components/LoadingComponent.vue';
import ErrorComponent from '@/components/ErrorComponent.vue';
import { useGetTags } from '@/hooks/tag';
import { useGetCurrentUserData } from '@/hooks/user';
import router from '@/router';
import MyFeedList from './MyFeedList.vue';
import GlobalFeedList from './GlobalFeedList.vue';
import TagFeedList from './TagFeedList.vue';

const route = useRoute();
const { data: currentUser, isLoading, isError } = useGetCurrentUserData();
const { data: tags } = useGetTags();

function handleClickMyFeed() {
  router.replace({ path: '', query: { tab: 'my-feed' } });
}

function handleClickGlobalFeed() {
  router.replace({ path: '', query: { tab: 'global-feed' } });
}

function handleClickTags(tag: string) {
  router.replace({ path: '', query: { tag } });
}
</script>

<style scoped>
.tag-button {
  border: none;
}
</style>
