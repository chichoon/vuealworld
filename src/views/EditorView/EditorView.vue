<template>
  <div class="editor - page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <EditorForm v-if="routes.path.split('/')[2]" :slug="routes.path.split('/')[2]" />
          <CreateForm v-else />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router';

import EditorForm from './EditorForm.vue';
import CreateForm from './CreateForm.vue';

const routes = useRoute();
</script>
