<template>
  <LoadingComponent v-if="isLoading" />
  <ErrorComponent v-else-if="isError" />
  <template v-else-if="!!articleData">
    <ul v-if="errorMsg.length > 0" class="error-messages">
      <li>{{ errorMsg }}</li>
    </ul>
    <form @submit.prevent="handleSubmit">
      <fieldset class="form-group">
        <CustomInput
          type="text"
          class="form-control form-control-lg"
          placeholder="Article Title"
          name="title"
          :value="articleData.title"
        />
      </fieldset>
      <fieldset class="form-group">
        <CustomInput
          type="text"
          class="form-control"
          placeholder="What's this article about?"
          name="description"
          :value="articleData.description"
        />
      </fieldset>
      <fieldset class="form-group">
        <CustomInput
          is-text-area
          class="form-control"
          rows="8"
          placeholder="Write your article (in markdown)"
          name="body"
          :value="articleData.body"
        />
      </fieldset>
      <TagForm v-model:tags="tagList" />
      <button class="btn btn-lg pull-xs-right btn-primary" type="submit">Edit Article</button>
    </form>
  </template>
</template>

<script lang="ts" setup>
import { ref, toRef, watch } from 'vue';
import { useQueryClient } from '@tanstack/vue-query';

import type { Message, Slug, Tag, Text } from '@/00_domain/common/value';
import { useGetArticle } from '@/01_application/server-hooks/article/query';
import { usePutEditArticle } from '@/01_application/server-hooks/article/mutation';
import LoadingComponent from '@/02_adapter/ui/components/LoadingComponent.vue';
import ErrorComponent from '@/02_adapter/ui/components/ErrorComponent.vue';
import CustomInput from '@/02_adapter/ui/components/CustomInput.vue';
import TagForm from '@/02_adapter/ui/components/TagForm.vue';
import router from '@/02_adapter/ui/router';

interface Props {
  slug: Slug;
}

const props = defineProps<Props>();
const queryClient = useQueryClient();

const slugToRef = toRef<Props, 'slug'>(props, 'slug');
const { data: articleData, isLoading, isError } = useGetArticle(slugToRef);
const tagList = ref<Tag[]>([...(articleData.value?.tagList ?? [])]);
const errorMsg = ref<Message>('');

const { mutateAsync } = usePutEditArticle(queryClient, slugToRef);

async function handleSubmit(e: Event) {
  try {
    const formData = new FormData(e.target as HTMLFormElement);
    await mutateAsync({
      title: formData.get('title') as Text,
      description: formData.get('description') as Text,
      body: formData.get('body') as Text,
      tagList: tagList.value,
    });
    router.push(`/article/${props.slug}`);
  } catch (e: unknown) {
    errorMsg.value = e as Message;
  }
}

watch(articleData, () => {
  tagList.value = [...(articleData.value?.tagList ?? [])];
});
</script>
