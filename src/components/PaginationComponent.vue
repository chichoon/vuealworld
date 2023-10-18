<template>
  <ul class="pagination">
    <li v-for="page in totalPages" :key="page" class="page-item" :class="{ active: page === currentPage }">
      <button class="page-link" @click="() => handleClickPage(page)">{{ page }}</button>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router';

import router from '@/router';

interface Props {
  currentPage: number;
  totalPages: number;
}

const route = useRoute();

const { totalPages, currentPage } = defineProps<Props>();

function handleClickPage(pageNum: number) {
  router.replace({ path: '#', query: { ...route.query, page: pageNum } });
}
</script>
