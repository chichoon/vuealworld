<template>
  <LoadingComponent v-if="isLoading" />
  <ErrorComponent v-else-if="isError" />
  <div class="profile-page" v-else-if="userInfo">
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
            <template v-if="currentUser?.username === userInfo.username">
              <RouterLink to="/settings" class="btn btn-sm btn-outline-secondary action-btn">
                <i class="ion-gear-a"></i>
                &nbsp; Edit Profile Settings
              </RouterLink>
            </template>
            <template v-else-if="!!currentUser">
              <button
                class="btn btn-sm btn-outline-secondary action-btn"
                :class="{ following: userInfo.following }"
                @click="handleClickFollow"
              >
                <i v-if="!userInfo.following" class="ion-plus-round"></i>
                <i v-else class="ion-minus-round"></i>
                &nbsp; {{ userInfo.following ? 'Unfollow' : 'Follow' }} {{ userInfo.username }}
              </button>
            </template>
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
          <MyArticlesList v-if="!route.query.tab || route.query.tab === 'my-articles'" :username="userInfo.username" />
          <FavoritedArticlesList v-else-if="route.query.tab === 'favorited-articles'" :username="userInfo.username" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import { useQueryClient } from '@tanstack/vue-query';

import router from '@/router';
import LoadingComponent from '@/components/LoadingComponent.vue';
import ErrorComponent from '@/components/ErrorComponent.vue';
import { useGetProfile, usePostFollow, useDeleteFollow } from '@/hooks/profile';
import { useGetCurrentUserData } from '@/hooks/user';
import MyArticlesList from './MyArticlesList.vue';
import FavoritedArticlesList from './FavoritedArticlesList.vue';

const route = useRoute();
const queryClient = useQueryClient();

const usernameToRef = ref(route.path.split('/')[2]);
const { data: userInfo, isLoading, isError } = useGetProfile(usernameToRef);
const { data: currentUser } = useGetCurrentUserData();

const { mutate: followMutate } = usePostFollow(queryClient, usernameToRef);
const { mutate: unfollowMutate } = useDeleteFollow(queryClient, usernameToRef);

function handleClickMyArticle() {
  router.replace({ path: '#', query: { tab: 'my-articles' } });
}

function handleClickFavoriteArticle() {
  router.replace({ path: '#', query: { tab: 'favorited-articles' } });
}

function handleClickFollow() {
  if (userInfo.value?.following) {
    unfollowMutate();
  } else {
    followMutate();
  }
}
</script>

<style scoped>
.following {
  background-color: #cccccc44;
}
</style>
