<template>
  <form @submit.prevent="handleSubmit">
    <fieldset class="form-group" v-if="isSignup">
      <CustomInput type="text" placeholder="Username" name="username" />
    </fieldset>
    <fieldset class="form-group">
      <CustomInput type="email" placeholder="Email" name="email" />
    </fieldset>
    <fieldset class="form-group">
      <CustomInput type="password" placeholder="Password" name="password" />
    </fieldset>
    <CustomButton type="submit" text="Sign up" />
  </form>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

import type { Email, Password, Username } from '@/00_domain/common/value';
import CustomButton from './CustomButton.vue';
import CustomInput from './CustomInput.vue';

const emits = defineEmits(['submit']);
const route = useRoute();
const isSignup = computed(() => route.path === '/register');

function handleSubmit(e: Event) {
  const formData = new FormData(e.target as HTMLFormElement);
  if (isSignup.value)
    emits('submit', {
      username: formData.get('username') as Username,
      email: formData.get('email') as Email,
      password: formData.get('password') as Password,
    });
  else emits('submit', { email: formData.get('email') as Email, password: formData.get('password') as Password });
}
</script>
