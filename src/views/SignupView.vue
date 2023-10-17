<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign up</h1>
          <p class="text-xs-center">
            <RouterLink to="/login">Have an account?</RouterLink>
          </p>
          <form>
            <fieldset class="form-group">
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
        </div>
      </div>
    </div>
  </div>
  <span>{{ username }}</span>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import CustomButton from '@/components/CustomButton.vue';
import CustomInput from '@/components/CustomInput.vue';

const username = ref('');
const email = ref('');
const password = ref('');
</script>

<style lang="scss" scoped></style>
