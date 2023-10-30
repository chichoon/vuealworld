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

import type { Message, Tag, Text } from '@/00_domain/common/value';
import { usePostArticle } from '@/01_application/server-hooks/article/mutation';
import CustomInput from '@/02_adapter/ui/components/CustomInput.vue';
import TagForm from '@/02_adapter/ui/components/TagForm.vue';
import router from '@/02_adapter/ui/router';

const tagList = ref<Tag[]>([]);
const errorMsg = ref<Message>('');

const { mutateAsync } = usePostArticle();

async function handleSubmit(e: Event) {
  try {
    const formData = new FormData(e.target as HTMLFormElement);
    await mutateAsync({
      title: formData.get('title') as Text,
      description: formData.get('description') as Text,
      body: formData.get('body') as Text,
      tagList: tagList.value,
    });
    router.push('/');
  } catch (e: unknown) {
    errorMsg.value = e as Message;
  }
}
</script>
