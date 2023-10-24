<template>
  <LoadingComponent v-if="isLoading" />
  <ErrorComponent v-else-if="isError" />
  <template v-else>
    <ul v-if="errorMsg.length > 0" class="error-messages">
      <li>{{ errorMsg }}</li>
    </ul>
    <form @submit.prevent="handleSubmit">
      <CustomInput type="text" class="form-control form-control-lg" placeholder="Article Title" v-model:value="title" />
      <fieldset class="form-group"></fieldset>
      <fieldset class="form-group">
        <CustomInput
          type="text"
          class="form-control"
          placeholder="What's this article about?"
          v-model:value="description"
        />
      </fieldset>
      <CustomInput
        is-text-area
        class="form-control"
        rows="8"
        placeholder="Write your article (in markdown)"
        v-model:value="body"
      />
      <fieldset class="form-group"></fieldset>
      <TagForm v-model:tags="tagList" />
      <button class="btn btn-lg pull-xs-right btn-primary" type="submit">Edit Article</button>
    </form>
  </template>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

import LoadingComponent from '@/components/LoadingComponent.vue';
import ErrorComponent from '@/components/ErrorComponent.vue';
import CustomInput from '@/components/CustomInput.vue';
import TagForm from '@/components/TagForm.vue';
import { useGetArticle, usePutEditArticle } from '@/hooks/article';
import router from '@/router';

interface Props {
  slug: string;
}

const { slug } = defineProps<Props>();

const slugToRef = ref(slug);
const { data: articleData, isLoading, isError } = useGetArticle(slugToRef);
const title = ref(articleData.value?.title ?? '');
const description = ref(articleData.value?.description ?? '');
const body = ref(articleData.value?.body ?? '');
const tagList = ref<string[]>([...(articleData.value?.tagList ?? [])]);
const errorMsg = ref<string>('');

const { mutateAsync } = usePutEditArticle(slugToRef);

async function handleSubmit() {
  try {
    await mutateAsync({ title: title.value, description: description.value, body: body.value, tagList: tagList.value });
    router.push('/');
  } catch (e: unknown) {
    errorMsg.value = e as string;
  }
}
</script>
