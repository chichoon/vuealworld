<template>
  <LoadingComponent v-if="isLoading" />
  <ErrorComponent v-else-if="isError" />
  <template v-else-if="!!currentUser">
    <ul v-if="errorMsg.length > 0" class="error-messages">
      <li>{{ errorMsg }}</li>
    </ul>
    <form @submit.prevent="handleSubmit">
      <fieldset class="form-group">
        <CustomInput type="text" placeholder="URL of profile picture" v-model:value="image" />
      </fieldset>
      <fieldset class="form-group">
        <CustomInput type="text" placeholder="Your Name" v-model:value="username" />
      </fieldset>
      <fieldset class="form-group">
        <CustomInput type="text" placeholder="Short bio about you" is-text-area v-model:value="bio" />
      </fieldset>
      <fieldset class="form-group">
        <CustomInput type="email" placeholder="Email" v-model:value="email" />
      </fieldset>
      <fieldset class="form-group">
        <CustomInput type="password" placeholder="New Password" v-model:value="password" />
      </fieldset>
      <CustomButton type="submit" text="Update Settings" />
    </form>
  </template>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';

import CustomInput from '@/components/CustomInput.vue';
import CustomButton from '@/components/CustomButton.vue';
import LoadingComponent from '@/components/LoadingComponent.vue';
import ErrorComponent from '@/components/ErrorComponent.vue';
import { useGetCurrentUserData, usePutUserInfo } from '@/hooks/user';
import router from '@/router';

const { data: currentUser, isLoading, isError } = useGetCurrentUserData();
const { mutateAsync } = usePutUserInfo();

const image = ref('');
const username = ref('');
const bio = ref('');
const email = ref('');
const password = ref('');
const errorMsg = ref('');

async function handleSubmit() {
  try {
    await mutateAsync({
      image: image.value.length > 0 ? image.value : undefined,
      username: username.value.length > 0 ? username.value : undefined,
      bio: bio.value.length > 0 ? bio.value : undefined,
      email: email.value.length > 0 ? email.value : undefined,
      password: password.value.length > 0 ? password.value : undefined,
    });
    router.push('/');
  } catch (e: unknown) {
    errorMsg.value = e as string;
  }
}

watch(currentUser, () => {
  image.value = currentUser.value?.image ?? '';
  username.value = currentUser.value?.username ?? '';
  bio.value = currentUser.value?.bio ?? '';
  email.value = currentUser.value?.email ?? '';
  password.value = '';
});
</script>
