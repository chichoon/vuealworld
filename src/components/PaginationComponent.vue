<template>
  <ul class="pagination">
    <li v-for="page in totalPages" :key="page" class="page-item" :class="{ active: page === currentPage }">
      <button class="page-link" @click="() => handleClickPage(page)">{{ page }}</button>
    </li>
  </ul>
</template>

<script lang="ts" setup>
interface Props {
  currentPage: number;
  totalPages: number;
}

const emits = defineEmits(['update:currentPage']);
const { totalPages, currentPage } = defineProps<Props>();

function handleClickPage(pageNum: number) {
  emits('update:currentPage', pageNum);
}
</script>
