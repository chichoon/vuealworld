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

const userData = ref<SignUpData>({ username: '', email: '', password: '' });

function onSubmit(data: any) {
  userData.value = data;
}
</script>

<style lang="scss" scoped></style>
