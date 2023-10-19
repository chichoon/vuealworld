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
        <CommentSection :slug="articleInfo.slug" :current-user-image="currentUser?.image" />
      </div>
    </div>
  </template>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';

import ErrorComponent from '@/components/ErrorComponent.vue';
import LoadingComponent from '@/components/LoadingComponent.vue';
import { useGetCurrentUserData } from '@/hooks/user';
import { useGetArticle } from '@/hooks/article';
import ArticleMetadata from './ArticleMetadata.vue';
import CommentSection from './CommentSection.vue';

const route = useRoute();

const { data: articleInfo, isLoading, isError } = useGetArticle(route.params.slug);
const { data: currentUser } = useGetCurrentUserData();
</script>
