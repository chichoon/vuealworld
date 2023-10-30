<template>
  <form class="form-group" @submit.prevent="handleSubmit">
    <input class="form-control" type="text" placeholder="Enter tags" v-model="newTag" />
  </form>
  <div class="tag-list">
    <button v-for="tag in tagList" :key="tag" class="tag-default tag-pill tag-button" @click="() => handleDelete(tag)">
      <i class="ion-close-round"></i>
      <span>
        {{ tag }}
      </span>
    </button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

import type { Tag } from '@/00_domain/common/value';

interface Props {
  tags: Tag[];
}

defineProps<Props>();
const emits = defineEmits(['update:tags']);

const tagList = ref<Tag[]>([]);
const newTag = ref<Tag>('');

function handleSubmit() {
  tagList.value = [...new Set([...tagList.value, newTag.value])];
  emits('update:tags', tagList.value);
  newTag.value = '';
}

function handleDelete(tag: Tag) {
  tagList.value = tagList.value.filter((t) => t !== tag);
}
</script>

<style scoped>
.tag-button {
  border: none;
}
</style>
