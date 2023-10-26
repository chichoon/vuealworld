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

import CustomInput from '@/components/CustomInput.vue';
import CustomButton from '@/components/CustomButton.vue';
import LoadingComponent from '@/components/LoadingComponent.vue';
import ErrorComponent from '@/components/ErrorComponent.vue';
import { useGetCurrentUserData, usePutUserInfo } from '@/hooks/user';
import router from '@/router';

const { data: currentUser, isLoading, isError } = useGetCurrentUserData();
const { mutateAsync } = usePutUserInfo();

const password = ref('');
const errorMsg = ref('');
// ref, reactive => 반응성, vue core 등

async function handleSubmit(e: Event) {
  try {
    const formData = new FormData(e.target as HTMLFormElement);
    await mutateAsync({
      image: formData.get('image') as string,
      username: formData.get('username') as string,
      bio: formData.get('bio') as string,
      email: formData.get('email') as string,
      password: password.value.length > 0 ? password.value : undefined,
    });
    router.push('/');
  } catch (e: unknown) {
    errorMsg.value = e as string;
  }
}

watch(currentUser, () => {
  password.value = '';
});
</script>
