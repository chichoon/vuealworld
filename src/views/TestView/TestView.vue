<template>
  <div>
    <h1>Welcome to the secret test page!!</h1>
  </div>
  <div v-once>
    <div>{{ timer }}</div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import VBindTest from './VBindTest.vue';
import TestTemplate from './TestTemplate.vue';

const input1 = ref('');
const input2 = ref('');
const value = '컴파일이 되어버렸당';
const timer = ref(0);

onMounted(() => {
  setInterval(() => {
    timer.value += 1;
  }, 1000);
});
</script>
