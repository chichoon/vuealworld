<template>
  <ul class="pagination">
    <li v-for="page in totalPages" :key="page" class="page-item" :class="{ active: page === currentPage }">
      <button class="page-link" @click="() => handleClickPage(page)">{{ page }}</button>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import router from '@/router';

interface Props {
  currentPage: number;
  totalPages: number;
}

const { totalPages, currentPage } = defineProps<Props>();

function handleClickPage(pageNum: number) {
  router.replace({ path: '#', query: { page: pageNum } });
}
</script>
