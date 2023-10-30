<template>
  <LoadingComponent v-if="isLoading" />
  <ErrorComponent v-else-if="isError" />
  <template v-else-if="!!currentUser">
    <ul v-if="errorMsg.length > 0" class="error-messages">
      <li>{{ errorMsg }}</li>
    </ul>
    <form @submit.prevent="handleSubmit">
      <fieldset class="form-group">
        <CustomInput type="text" placeholder="URL of profile picture" name="image" :value="currentUser.image" />
      </fieldset>
      <fieldset class="form-group">
        <CustomInput type="text" placeholder="Your Name" name="username" :value="currentUser.username" />
      </fieldset>
      <fieldset class="form-group">
        <CustomInput type="text" placeholder="Short bio about you" is-text-area name="bio" :value="currentUser.bio" />
      </fieldset>
      <fieldset class="form-group">
        <CustomInput type="email" placeholder="Email" name="email" :value="currentUser.email" />
      </fieldset>
      <fieldset class="form-group">
        <CustomInput type="password" placeholder="New Password" name="password" />
      </fieldset>
      <CustomButton type="submit" text="Update Settings" />
    </form>
  </template>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';

import CustomInput from '@/02_adapter/ui/components/CustomInput.vue';
import CustomButton from '@/02_adapter/ui/components/CustomButton.vue';
import LoadingComponent from '@/02_adapter/ui/components/LoadingComponent.vue';
import ErrorComponent from '@/02_adapter/ui/components/ErrorComponent.vue';
import { useGetCurrentUserData } from '@/01_application/server-hooks/user/query';
import { usePutEditUserInfo } from '@/01_application/server-hooks/user/mutation';
import router from '@/02_adapter/ui/router';
import type { Email, Message, Password, Text, URLString, Username } from '@/00_domain/common/value';

const { data: currentUser, isLoading, isError } = useGetCurrentUserData();
const { mutateAsync } = usePutEditUserInfo();

const password = ref<Password>('');
const errorMsg = ref<Message>('');
// ref, reactive => 반응성, vue core 등

async function handleSubmit(e: Event) {
  try {
    const formData = new FormData(e.target as HTMLFormElement);
    await mutateAsync({
      image: formData.get('image') as URLString,
      username: formData.get('username') as Username,
      bio: formData.get('bio') as Text,
      email: formData.get('email') as Email,
      password: password.value.length > 0 ? password.value : undefined,
    });
    router.push('/');
  } catch (e: unknown) {
    errorMsg.value = e as Message;
  }
}

watch(currentUser, () => {
  password.value = '';
});
</script>
