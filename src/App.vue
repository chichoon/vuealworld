<template>
  <AuthenticatedNavHeader v-if="!!data" :user-info="data" />
  <NavHeader v-else />
  <RouterView />
  <FooterComponent />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';

import { NavHeader, AuthenticatedNavHeader } from './components/NavHeader';
import FooterComponent from './components/FooterComponent.vue';
import { useGetCurrentUserData } from './hooks/user';

const data = useGetCurrentUserData();
</script>

<style lang="scss"></style>
