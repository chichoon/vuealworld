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
import { useQueryClient } from '@tanstack/vue-query';

import type { Message } from '@/00_domain/common/value';
import type { SignInData } from '@/01_application/ports/outbound/auth';
import { useSignin } from '@/01_application/server-hooks/user/mutation';
import CustomForm from '@/02_adapter/ui/components/CustomForm.vue';
import router from '@/02_adapter/ui/router';

const queryClient = useQueryClient();
const errorMsg = ref<Message>('');

const { mutateAsync } = useSignin(queryClient);

async function handleSubmit(data: SignInData) {
  try {
    await mutateAsync(data);
    router.push('/');
  } catch (e: unknown) {
    errorMsg.value = e as Message;
  }
}
</script>
