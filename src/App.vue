<template>
  <AuthenticatedNavHeader v-if="!!data" :user-info="data" />
  <NavHeader v-else />
  <RouterView :key="route.fullPath" />
  <FooterComponent />
</template>

<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router';

import { NavHeader, AuthenticatedNavHeader } from './components/NavHeader';
import FooterComponent from './components/FooterComponent.vue';
import { useGetCurrentUserData } from './hooks/user';

const { data } = useGetCurrentUserData();
const route = useRoute();
</script>

<style lang="scss"></style>
