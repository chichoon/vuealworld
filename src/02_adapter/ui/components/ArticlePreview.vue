<template>
  <div class="article-preview">
    <div class="article-meta">
      <RouterLink :to="`/profile/${props.articleInfo.author.username}`"
        ><img
          :src="
            props.articleInfo.author.image.length > 0
              ? props.articleInfo.author.image
              : 'https://static.vecteezy.com/system/resources/previews/008/442/086/non_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg'
          "
      /></RouterLink>
      <div class="info">
        <RouterLink :to="`/profile/${props.articleInfo.author.username}`" class="author">{{
          props.articleInfo.author.username
        }}</RouterLink>
        <span class="date">{{ new Date(props.articleInfo.createdAt).toDateString() }}</span>
      </div>
      <FavoriteButton
        v-if="!(currentUser && currentUser.username === props.articleInfo.author.username) && !!currentUser"
        @favorite="handleClickFavorite"
        :is-favorited="props.articleInfo.favorited"
        :favorites-count="props.articleInfo.favoritesCount"
        is-short-version
      />
    </div>
    <RouterLink :to="`/article/${props.articleInfo.slug}`" class="preview-link">
      <h1>{{ props.articleInfo.title }}</h1>
      <p>{{ props.articleInfo.description }}</p>
      <span>Read more...</span>
      <ul class="tag-list">
        <li
          v-for="tag in props.articleInfo.tagList"
          class="tag-default tag-pill tag-outline"
          :key="`${props.articleInfo.slug}-${tag}`"
        >
          {{ tag }}
        </li>
      </ul>
    </RouterLink>
  </div>
</template>

<script lang="ts" setup>
import { toRef, type Ref } from 'vue';

import type { ArticleData } from '@/00_domain/entity/article';
import { useGetCurrentUserData } from '@/01_application/server-hooks/user/query';
import FavoriteButton from './FavoriteButton.vue';
import type { Slug } from '@/00_domain/common/value';

interface Props {
  articleInfo: ArticleData;
}

interface Emits {
  (e: 'favorite', slug: Ref<Slug>): void;
  (e: 'unfavorite', slug: Ref<Slug>): void;
}

const props = defineProps<Props>();
const emits = defineEmits<Emits>();

const slugToRef = toRef<Slug>(props.articleInfo.slug);
const { data: currentUser } = useGetCurrentUserData();

function handleClickFavorite() {
  if (props.articleInfo.favorited) {
    emits('unfavorite', slugToRef);
  } else {
    emits('favorite', slugToRef);
  }
}
</script>
