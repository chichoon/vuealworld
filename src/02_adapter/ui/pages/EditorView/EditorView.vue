<template>
  <div class="editor - page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12" v-if="!!currentUser">
          <EditorForm v-if="slugToRef" :slug="slugToRef" />
          <CreateForm v-else />
        </div>
        <ErrorComponent error="You must be logged in in order to write a new article" v-else />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

import type { Slug } from '@/00_domain/common/value';
import { useGetCurrentUserData } from '@/01_application/server-hooks/user/query';
import ErrorComponent from '@/02_adapter/ui/components/ErrorComponent.vue';
import EditorForm from './EditorForm.vue';
import CreateForm from './CreateForm.vue';

const route = useRoute();
const slugToRef = computed<Slug>(() => route.params.slug as Slug);

const { data: currentUser } = useGetCurrentUserData();
</script>
