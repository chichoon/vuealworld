<template>
  <div class="profile-page" v-if="userInfo">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img
              :src="
                userInfo?.image.length > 0
                  ? userInfo.image
                  : 'https://static.vecteezy.com/system/resources/previews/008/442/086/non_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg'
              "
              class="user-img"
            />
            <h4>{{ userInfo.username }}</h4>
            <p>
              {{ userInfo.bio }}
            </p>
            <button class="btn btn-sm btn-outline-secondary action-btn">
              <i class="ion-plus-round"></i>
              &nbsp; Follow {{ userInfo.username }}
            </button>
            <RouterLink to="/settings" class="btn btn-sm btn-outline-secondary action-btn">
              <i class="ion-gear-a"></i>
              &nbsp; Edit Profile Settings
            </RouterLink>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <button
                  @click="handleClickMyArticle"
                  :class="{ 'nav-link': true, active: !route.query.tab || route.query.tab === 'my-articles' }"
                >
                  My Articles
                </button>
              </li>
              <li class="nav-item">
                <button
                  @click="handleClickFavoriteArticle"
                  :class="{ 'nav-link': true, active: route.query.tab === 'favorited-articles' }"
                >
                  Favorited Articles
                </button>
              </li>
            </ul>
          </div>
          <ArticlePreview
            v-for="article in [DUMMY_ARTICLE, DUMMY_ARTICLE]"
            :key="article.slug"
            :article-info="article"
          />

          <ul class="pagination">
            <li class="page-item active">
              <a class="page-link" href="">1</a>
            </li>
            <li class="page-item">
              <a class="page-link" href="">2</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <h1>404 Not Found</h1>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink, useRoute } from 'vue-router';

import router from '@/router';
import { useGetCurrentUserData } from '@/hooks/user/useGetCurrentUserData';
import type { ArticleData } from '@/types/article';
import ArticlePreview from '@/components/ArticlePreview.vue';
import { useGetProfile } from '@/hooks/profile/useGetProfile';

const route = useRoute();

const userInfo = useGetProfile(route.path.split('/')[2]);

function handleClickMyArticle() {
  router.replace({ path: '#', query: { tab: 'my-articles' } });
}

function handleClickFavoriteArticle() {
  router.replace({ path: '#', query: { tab: 'favorited-articles' } });
}

// TODO: remove
const DUMMY_ARTICLE = ref<ArticleData>({
  slug: 'how-to-buil-webapps-that-scale',
  title: 'How to build webapps that scale',
  description: 'This is the description for the post.',
  body: 'This is the description for the post.',
  tagList: ['realworld', 'implementations'],
  createdAt: 'January 20th',
  updatedAt: 'January 20th',
  favorited: false,
  favoritesCount: 29,
  author: {
    username: 'Eric Simons',
    bio: 'Eric Simons is the co-founder of Thinkster, the former CTO of ...',
    image: 'http://i.imgur.com/Qr71crq.jpg',
    following: false,
  },
});
</script>
