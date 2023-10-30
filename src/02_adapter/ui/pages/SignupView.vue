<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign up</h1>
          <p class="text-xs-center">
            <RouterLink to="/login">Have an account?</RouterLink>
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

import type { Message } from '@/00_domain/common/value';
import type { SignUpData } from '@/01_application/ports/auth';
import { useSignup } from '@/01_application/server-hooks/user/mutation';
import CustomForm from '@/02_adapter/ui/components/CustomForm.vue';
import router from '@/02_adapter/ui/router';

const errorMsg = ref<Message>('');

const { mutateAsync } = useSignup();

async function handleSubmit(data: SignUpData) {
  try {
    await mutateAsync(data);
    router.push('/');
  } catch (e: unknown) {
    errorMsg.value = e as Message;
  }
}
</script>

<style lang="scss" scoped></style>
