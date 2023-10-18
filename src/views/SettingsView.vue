<template>
  <div class="settings-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Your Settings</h1>
          <ul class="error-messages">
            <li>That name is required</li>
          </ul>
          <SettingsForm />
          <hr />
          <button @click="handleLogout" class="btn btn-outline-danger">Or click here to logout.</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import SettingsForm from '@/components/CustomForm/SettingsForm.vue';
import router from '@/router';
import { useCookies } from 'vue3-cookies';

const { cookies } = useCookies();

function handleLogout() {
  cookies.remove('authorization');
  router.push('/');
}
</script>
