<template>
  <form class="form-group" @submit.prevent="handleSubmit">
    <CustomInput type="text" class="form-control" placeholder="Enter tags" v-model:value="newTag" />
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
import CustomInput from './CustomInput.vue';

interface Props {
  tags: string[];
}

defineProps<Props>();
const emit = defineEmits(['update:tags']);

const tagList = ref<string[]>([]);
const newTag = ref('');

function handleSubmit() {
  tagList.value = [...new Set([...tagList.value, newTag.value])];
  console.log(tagList.value);
  emit('update:tags', tagList.value);
  newTag.value = '';
}

function handleDelete(tag: string) {
  tagList.value = tagList.value.filter((t) => t !== tag);
  console.log(tagList.value);
}
</script>

<style scoped>
.tag-button {
  border: none;
}
</style>
