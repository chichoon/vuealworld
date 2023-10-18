<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign in</h1>
          <p class="text-xs-center">
            <a href="/register">Need an account?</a>
          </p>
          <ul v-if="errorMsg.length > 0" class="error-messages">
            <li>{{ errorMsg }}</li>
          </ul>
          <CustomForm @submit="handleSubmit" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

import CustomForm from '@/components/CustomForm/CustomForm.vue';
import type { SignInData } from '@/types/userData';
import { useSignin } from '@/hooks/user';
import router from '@/router';

const errorMsg = ref<string>('');

const { mutateAsync } = useSignin();

async function handleSubmit(data: SignInData) {
  try {
    await mutateAsync(data);
    router.push('/');
  } catch (e: unknown) {
    errorMsg.value = e as string;
  }
}
</script>
