<template>
  <div class="settings-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Your Settings</h1>
          <SettingsForm />
          <hr />
          <button @click="handleLogout" class="btn btn-outline-danger">Or click here to logout.</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useCookies } from 'vue3-cookies';

import { useGetCurrentUserData } from '@/hooks/user';
import SettingsForm from './SettingsForm.vue';
import router from '@/router';

const { cookies } = useCookies();

function handleLogout() {
  cookies.remove('authorization');
  router.push('/');
}
</script>
