<template>
  <LoadingComponent v-if="isLoading" />
  <ErrorComponent v-else-if="isError" />
  <template v-else-if="articleInfo">
    <div class="article-page">
      <div class="banner">
        <div class="container">
          <h1>{{ articleInfo.title }}</h1>
          <ArticleMetadata
            :article-info="articleInfo"
            :is-my-article="articleInfo.author.username === currentUser?.username"
            :is-logged-in="!!currentUser"
          />
        </div>
      </div>
      <div class="container page">
        <div class="row article-content">
          <div class="col-md-12">
            <p>{{ articleInfo.body }}</p>
            <ul class="tag-list">
              <li v-for="tag in articleInfo.tagList" :key="tag" class="tag-default tag-pill tag-outline">{{ tag }}</li>
            </ul>
          </div>
        </div>
        <hr />
        <ArticleMetadata
          :article-info="articleInfo"
          :is-my-article="articleInfo.author.username === currentUser?.username"
          :is-logged-in="!!currentUser"
        />
        <CommentSection v-if="!!currentUser" :slug="articleInfo.slug" :current-user-image="currentUser?.image" />
      </div>
    </div>
  </template>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { ref } from 'vue';

import ErrorComponent from '@/02_adapter/ui/components/ErrorComponent.vue';
import LoadingComponent from '@/02_adapter/ui/components/LoadingComponent.vue';
import { useGetCurrentUserData } from '@/01_application/server-hooks/user/query';
import { useGetArticle } from '@/01_application/server-hooks/article/query';
import ArticleMetadata from './ArticleMetadata.vue';
import CommentSection from './CommentSection.vue';

const route = useRoute();

const routeToRef = ref(route.params.slug as string);
const { data: articleInfo, isLoading, isError } = useGetArticle(routeToRef);
const { data: currentUser } = useGetCurrentUserData();
</script>
