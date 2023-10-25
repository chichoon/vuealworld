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
import { useQueryClient } from '@tanstack/vue-query';

import SettingsForm from './SettingsForm.vue';
import router from '@/router';
import { userKeys } from '@/hooks/user/queries';

const { cookies } = useCookies();
const queryClient = useQueryClient();

function handleLogout() {
  if (!confirm('Are you sure you want to logout?')) return;
  queryClient.setQueryData(userKeys.current, null);
  cookies.remove('authorization');
  router.push('/');
}
</script>
