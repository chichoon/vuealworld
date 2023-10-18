<template>
  <AuthenticatedNavHeader v-if="isAuthenticated" />
  <NavHeader />
  <RouterView />
  <FooterComponent />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { RouterView } from 'vue-router';

import { NavHeader, AuthenticatedNavHeader } from './components/NavHeader';
import FooterComponent from './components/FooterComponent.vue';
import { useGetUserData } from './hooks/user/useGetUserData';

const isAuthenticated = ref<boolean>(false);

const user = useGetUserData();
</script>

<style lang="scss"></style>
