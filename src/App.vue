<template>
  <AuthenticatedNavHeader v-if="isAuthenticated" />
  <NavHeader v-else />
  <RouterView />
  <FooterComponent />
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { RouterView } from 'vue-router';

import { NavHeader, AuthenticatedNavHeader } from './components/NavHeader';
import FooterComponent from './components/FooterComponent.vue';
import { useGetUserData } from './hooks/user/useGetUserData';

const isAuthenticated = ref<boolean>(false);

const data = useGetUserData();
watch(data, () => {
  console.log(data.value.user);
  isAuthenticated.value = !!data;
});
</script>

<style lang="scss"></style>
