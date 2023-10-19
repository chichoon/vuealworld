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

import CustomForm from '@/components/CustomForm.vue';
import type { SignUpData } from '@/types/userData';
import { useSignup } from '@/hooks/user';
import router from '@/router';

const errorMsg = ref<string>('');

const { mutateAsync } = useSignup();

async function handleSubmit(data: SignUpData) {
  try {
    await mutateAsync(data);
    router.push('/'); // TODO: 왜안됨???? (url만 바뀌고 컴포넌트가 안바뀜)
  } catch (e: unknown) {
    errorMsg.value = e as string;
  }
}
</script>

<style lang="scss" scoped></style>
