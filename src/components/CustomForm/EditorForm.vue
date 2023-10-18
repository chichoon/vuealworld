<template>
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
    ></CustomInput>
    <fieldset class="form-group"></fieldset>
    <TagForm v-model:tags="tagList" />
    <button class="btn btn-lg pull-xs-right btn-primary" type="button">Publish Article</button>
  </form>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

import CustomInput from './CustomInput.vue';
import TagForm from './TagForm.vue';

const title = ref('');
const description = ref('');
const body = ref('');
const tagList = ref<string[]>([]);

function handleSubmit(e: Event) {
  console.log(e);
}
</script>
