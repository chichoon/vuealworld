<template>
  <AuthenticatedNavHeader v-if="!!data" :user-info="data" />
  <NavHeader v-else />
  <RouterView />
  <FooterComponent />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';

import NavHeader from '@/02_adapter/ui/components/NavHeader.vue';
import AuthenticatedNavHeader from '@/02_adapter/ui/components/AuthenticatedNavHeader.vue';
import FooterComponent from '@/02_adapter/ui/components/FooterComponent.vue';
import { useGetCurrentUserData } from '@/01_application/server-hooks/user/query';

const { data } = useGetCurrentUserData();
</script>

<style lang="scss"></style>
