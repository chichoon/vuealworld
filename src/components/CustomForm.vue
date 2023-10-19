<template>
  <form @submit.prevent="handleSubmit">
    <fieldset class="form-group" v-if="isSignup">
      <CustomInput type="text" placeholder="Username" v-model:value="username" />
    </fieldset>
    <fieldset class="form-group">
      <CustomInput type="email" placeholder="Email" v-model:value="email" />
    </fieldset>
    <fieldset class="form-group">
      <CustomInput type="password" placeholder="Password" v-model:value="password" />
    </fieldset>
    <CustomButton type="submit" text="Sign up" />
  </form>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

import CustomInput from './CustomInput.vue';
import CustomButton from '@/components/CustomButton.vue';

const emits = defineEmits(['submit']);
const isSignup = window.location.pathname === '/register';

const username = ref('');
const email = ref('');
const password = ref('');

function handleSubmit(e: Event) {
  console.log(e);
  if (isSignup) emits('submit', { username: username.value, email: email.value, password: password.value });
  else emits('submit', { email: email.value, password: password.value });
}
</script>
