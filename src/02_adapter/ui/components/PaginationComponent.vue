<template>
  <ul class="pagination">
    <li v-for="page in props.totalPages" :key="page" class="page-item" :class="{ active: page === props.currentPage }">
      <button data-testid="pagination-button" class="page-link" @click="() => handleClickPage(page)">{{ page }}</button>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import type { Page } from '@/00_domain/common/value';

interface Props {
  currentPage: Page;
  totalPages: Page;
}

const emits = defineEmits(['update:currentPage']);
const props = defineProps<Props>();

function handleClickPage(pageNum: Page) {
  emits('update:currentPage', pageNum);
}
</script>
