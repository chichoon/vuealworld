<template>
  <div class="article-meta">
    <a :href="`/profile/${props.articleInfo.author.username}`"><img :src="props.articleInfo.author.image" /></a>
    <div class="info">
      <a :href="`/profile/${props.articleInfo.author.username}`" class="author">{{
        props.articleInfo.author.username
      }}</a>
      <span class="date">{{ new Date(props.articleInfo.createdAt).toDateString() }}</span>
    </div>
    &nbsp;&nbsp;
    <template v-if="isMyArticle">
      <RouterLink :to="`/editor/${props.articleInfo.slug}`" class="btn btn-sm btn-outline-secondary"
        ><i class="ion-edit"></i><span> Edit Article</span></RouterLink
      >
      <button class="btn btn-sm btn-outline-danger" @click="handleClickDelete">
        <i class="ion-trash-a"></i><span> Delete Article</span>
      </button>
    </template>
    <template v-else-if="isLoggedIn">
      <FollowButton
        :is-following="props.articleInfo.author.following"
        :username="props.articleInfo.author.username"
        @follow="handleClickFollow"
      />
      <FavoriteButton
        :is-favorited="props.articleInfo.favorited"
        :favorites-count="props.articleInfo.favoritesCount"
        @favorite="handleClickFavorite"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import { toRef } from 'vue';
import { useQueryClient } from '@tanstack/vue-query';

import type { ArticleData } from '@/00_domain/entity/article';
import type { ProfileData } from '@/00_domain/entity/user';
import { useDeleteArticle, useDeleteFavorite, usePostFavorite } from '@/01_application/server-hooks/article/mutation';
import { useDeleteFollow, usePostFollow } from '@/01_application/server-hooks/profile/mutation';
import FollowButton from '@/02_adapter/ui/components/FollowButton.vue';
import FavoriteButton from '@/02_adapter/ui/components/FavoriteButton.vue';
import router from '@/02_adapter/ui/router';

interface Props {
  articleInfo: ArticleData;
  isMyArticle: boolean;
  isLoggedIn: boolean;
}

const props = defineProps<Props>();
// props를 destructuring 하면 반응성이 깨어지므로 데이터의 변화를 감지하지 못하게 된다

const queryClient = useQueryClient();
const slugToRef = toRef<ArticleData, 'slug'>(props.articleInfo, 'slug');
const usernameToRef = toRef<ProfileData, 'username'>(props.articleInfo.author, 'username');
const { mutate: favoriteMutate } = usePostFavorite(queryClient);
const { mutate: unfavoriteMutate } = useDeleteFavorite(queryClient);
const { mutate: followMutate } = usePostFollow(queryClient, usernameToRef, slugToRef);
const { mutate: unfollowMutate } = useDeleteFollow(queryClient, usernameToRef, slugToRef);
const { mutate: deleteMutate } = useDeleteArticle(queryClient, slugToRef);

function handleClickFavorite() {
  if (props.articleInfo.favorited) {
    unfavoriteMutate(slugToRef);
  } else {
    favoriteMutate(slugToRef);
  }
}

function handleClickFollow() {
  if (props.articleInfo.author.following) {
    unfollowMutate();
  } else {
    followMutate();
  }
}

function handleClickDelete() {
  if (!confirm('Are you sure to delete this article?')) return;
  deleteMutate();
  router.push('/');
}
</script>
