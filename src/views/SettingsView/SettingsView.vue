<template>
  <div class="settings-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12" v-if="!!currentUser">
          <h1 class="text-xs-center">Your Settings</h1>
          <SettingsForm />
          <hr />
          <button @click="handleLogout" class="btn btn-outline-danger">Or click here to logout.</button>
        </div>
        <ErrorComponent error="You must be logged in in order to set up a profile" v-else />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useCookies } from 'vue3-cookies';
import { useQueryClient } from '@tanstack/vue-query';

import ErrorComponent from '@/components/ErrorComponent.vue';
import { useGetCurrentUserData } from '@/hooks/user';
import { userKeys } from '@/hooks/user/queries';
import router from '@/router';
import SettingsForm from './SettingsForm.vue';

const { cookies } = useCookies();
const queryClient = useQueryClient();

const { data: currentUser } = useGetCurrentUserData();

function handleLogout() {
  if (!confirm('Are you sure you want to logout?')) return;
  queryClient.setQueryData(userKeys.current, null);
  cookies.remove('authorization');
  router.push('/');
}
</script>
