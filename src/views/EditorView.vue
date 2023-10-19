<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <ul v-if="errorMsg.length > 0" class="error-messages">
            <li>{{ errorMsg }}</li>
          </ul>
          <EditorForm @submit="handleSubmit" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import EditorForm from '@/components/EditorForm.vue';
import { usePostArticle } from '@/hooks/article';
import type { ArticleData } from '@/types/article';
import router from '@/router';

const errorMsg = ref<string>('');
const { mutateAsync } = usePostArticle();

async function handleSubmit(data: ArticleData) {
  try {
    await mutateAsync(data);
    router.push('/');
  } catch (e: unknown) {
    errorMsg.value = e as string;
  }
}
</script>
