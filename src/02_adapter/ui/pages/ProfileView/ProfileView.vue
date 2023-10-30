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
            <RouterLink
              v-if="currentUser?.username === userInfo.username"
              to="/settings"
              class="btn btn-sm btn-outline-secondary action-btn"
            >
              <i class="ion-gear-a"></i>
              &nbsp; Edit Profile Settings
            </RouterLink>
            <FollowButton
              v-else-if="!!currentUser"
              :is-following="userInfo.following"
              :username="userInfo.username"
              @follow="handleClickFollow"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <NavigationTab
            class="artickes-toggle"
            :tab-names="['My Articles', 'Favorited Articles']"
            :is-active="[
              !route.query.tab || route.query.tab === 'my-articles',
              route.query.tab === 'favorited-articles',
            ]"
            @first-tab="handleClickMyArticle"
            @second-tab="handleClickFavoriteArticle"
          />
          <MyArticlesList v-if="!route.query.tab || route.query.tab === 'my-articles'" :username="userInfo.username" />
          <FavoritedArticlesList v-else-if="route.query.tab === 'favorited-articles'" :username="userInfo.username" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import { useQueryClient } from '@tanstack/vue-query';

import type { Username } from '@/00_domain/common/value';
import { usePostFollow, useDeleteFollow } from '@/01_application/server-hooks/profile/mutation';
import { useGetProfile } from '@/01_application/server-hooks/profile/query';
import { useGetCurrentUserData } from '@/01_application/server-hooks/user/query';
import LoadingComponent from '@/02_adapter/ui/components/LoadingComponent.vue';
import ErrorComponent from '@/02_adapter/ui/components/ErrorComponent.vue';
import FollowButton from '@/02_adapter/ui/components/FollowButton.vue';
import NavigationTab from '@/02_adapter/ui/components/NavigationTab.vue';
import router from '@/02_adapter/ui/router';
import MyArticlesList from './MyArticlesList.vue';
import FavoritedArticlesList from './FavoritedArticlesList.vue';

const route = useRoute();
const queryClient = useQueryClient();

const usernameToRef = computed<Username>(() => route.params.username as Username);
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
