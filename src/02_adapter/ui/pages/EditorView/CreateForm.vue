<template>
  <ul v-if="errorMsg.length > 0" class="error-messages">
    <li>{{ errorMsg }}</li>
  </ul>
  <form @submit.prevent="handleSubmit">
    <fieldset class="form-group">
      <CustomInput name="title" type="text" class="form-control form-control-lg" placeholder="Article Title" />
    </fieldset>
    <fieldset class="form-group">
      <CustomInput name="description" type="text" class="form-control" placeholder="What's this article about?" />
    </fieldset>
    <fieldset class="form-group">
      <CustomInput
        name="body"
        is-text-area
        class="form-control"
        rows="8"
        placeholder="Write your article (in markdown)"
      />
    </fieldset>
    <TagForm v-model:tags="tagList" />
    <button class="btn btn-lg pull-xs-right btn-primary" type="submit">Publish Article</button>
  </form>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

import CustomInput from '@/02_adapter/ui/components/CustomInput.vue';
import TagForm from '@/02_adapter/ui/components/TagForm.vue';
import { usePostArticle } from '@/01_application/server-hooks/article/mutation';
import router from '@/02_adapter/ui/router';

const tagList = ref<string[]>([]);
const errorMsg = ref<string>('');

const { mutateAsync } = usePostArticle();

async function handleSubmit(e: Event) {
  try {
    const formData = new FormData(e.target as HTMLFormElement);
    await mutateAsync({
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      body: formData.get('body') as string,
      tagList: tagList.value,
    });
    router.push('/');
  } catch (e: unknown) {
    errorMsg.value = e as string;
  }
}
</script>
