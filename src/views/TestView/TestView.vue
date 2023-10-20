<template>
  <div>
    <h1>Welcome to the secret test page!!</h1>
  </div>
  <div>
    <VBindTest v-model:value1="input1" v-model:value2="input2" />
    <span>input 1: {{ input1 }}</span>
    <br />
    <span>input 2: {{ input2 }}</span>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import VBindTest from './VBindTest.vue';

const input1 = ref('');
const input2 = ref('');
</script>
