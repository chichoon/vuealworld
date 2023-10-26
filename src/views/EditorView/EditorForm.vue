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

import LoadingComponent from '@/components/LoadingComponent.vue';
import ErrorComponent from '@/components/ErrorComponent.vue';
import CustomInput from '@/components/CustomInput.vue';
import TagForm from '@/components/TagForm.vue';
import { useGetArticle, usePutEditArticle } from '@/hooks/article';
import router from '@/router';
import { useQueryClient } from '@tanstack/vue-query';

interface Props {
  slug: string;
}

const props = defineProps<Props>();
const queryClient = useQueryClient();

const slugToRef = toRef(props.slug);
const { data: articleData, isLoading, isError } = useGetArticle(slugToRef);
const tagList = ref<string[]>([...(articleData.value?.tagList ?? [])]);
const errorMsg = ref<string>('');

const { mutateAsync } = usePutEditArticle(queryClient, slugToRef);

async function handleSubmit(e: Event) {
  try {
    const formData = new FormData(e.target as HTMLFormElement);
    await mutateAsync({
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      body: formData.get('body') as string,
      tagList: tagList.value,
    });
    router.push(`/article/${props.slug}`);
  } catch (e: unknown) {
    errorMsg.value = e as string;
  }
}

watch(articleData, () => {
  tagList.value = [...(articleData.value?.tagList ?? [])];
});
</script>
