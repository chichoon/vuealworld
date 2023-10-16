<template>
  <header class="header">
    <h2>Sign up</h2>
    <RouterLink to="/signin">Have an account?</RouterLink>
  </header>
  <form class="form">
    <CustomInput type="text" placeholder="Username" v-model:value="username" />
    <CustomInput type="email" placeholder="Email" v-model:value="email" />
    <CustomInput type="password" placeholder="Password" v-model:value="password" />
    <button type="submit" class="submit-button">Sign up</button>
  </form>
  <span>{{ username }}</span>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import CustomInput from '@/components/CustomInput.vue';

const username = ref('');
const email = ref('');
const password = ref('');
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
  margin-bottom: 20px;

  & > h2 {
    font-size: 30px;
    text-align: center;
  }

  & > a {
    color: var(--theme-color);
    text-decoration: none;
  }
}

.form {
  width: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 15px;
}

.submit-button {
  background-color: var(--theme-color);
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  color: #ffffff;
  font-size: 20px;
}
</style>
