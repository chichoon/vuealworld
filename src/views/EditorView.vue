<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <ul class="error-messages">
            <li>That title is required</li>
          </ul>
          <EditorForm @submit="handleSubmit" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import EditorForm from '@/components/CustomForm/EditorForm.vue';
import { usePostArticle } from '@/hooks/article';
import type { ArticleData } from '@/types/article';
import router from '@/router';

const { mutateAsync } = usePostArticle();

async function handleSubmit(data: ArticleData) {
  await mutateAsync(data);
  router.push('/');
}
</script>
