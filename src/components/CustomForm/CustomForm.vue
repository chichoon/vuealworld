<template>
  <form>
    <fieldset class="form-group" v-if="isSignup">
      <CustomInput type="text" placeholder="Username" v-model:value="username" />
    </fieldset>
    <fieldset class="form-group">
      <CustomInput type="email" placeholder="Email" v-model:value="email" />
    </fieldset>
    <fieldset class="form-group">
      <CustomInput type="password" placeholder="Password" v-model:value="password" />
    </fieldset>
    <CustomButton type="submit" text="Sign up" @click="onSubmit" />
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

function onSubmit(e: Event) {
  e.preventDefault();
  if (isSignup) emits('submit', { username, email, password });
  else emits('submit', { email, password });
}
</script>
