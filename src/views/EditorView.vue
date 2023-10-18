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
import type { ArticleEditData } from '@/types/article';

function handleSubmit(data: ArticleEditData) {
  console.log(data);
  console.log(data.tagList);
}
</script>
