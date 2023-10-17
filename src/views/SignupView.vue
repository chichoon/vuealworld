<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign up</h1>
          <p class="text-xs-center">
            <RouterLink to="/login">Have an account?</RouterLink>
          </p>
          <CustomForm @submit="onSubmit" />
        </div>
      </div>
    </div>
  </div>
  <span>{{ userData }}</span>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import CustomForm from '@/components/CustomForm/CustomForm.vue';
import type { SignUpData } from '@/types/userData';
import router from '@/router';

const userData = ref<SignUpData>({ username: '', email: '', password: '' });
const isValidationFailed = ref<boolean>(false);

function onSubmit(data: any) {
  userData.value = data;
  fetch('http://localhost:8080/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ user: userData.value }),
  })
    .then(() => router.push('/'))
    .catch(() => (isValidationFailed.value = true));
}
</script>

<style lang="scss" scoped></style>
