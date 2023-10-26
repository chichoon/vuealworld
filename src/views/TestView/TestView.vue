<template>
  <div>
    <h1>Welcome to the secret test page!!</h1>
  </div>
  <form @submit.prevent="handleSubmitAllRef">
    <input type="text" v-model="name" />
    <input type="number" v-model="age" />
    <button type="submit">Submit</button>
  </form>
  <form @submit.prevent="handleSubmitReactive">
    <input type="text" v-model="obj.name" />
    <input type="number" v-model="obj.age" />
    <button type="submit">Submit</button>
  </form>
  <form @submit.prevent="handleSubmitFormData">
    <input type="text" name="name" />
    <input type="number" name="age" />
    <button type="submit">Submit</button>
  </form>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';

interface ReactiveObj {
  name: string;
  age: number;
}

const obj = reactive<ReactiveObj>({ name: '', age: 0 });
const name = ref('');
const age = ref(0);

function handleSubmitAllRef() {
  console.log({ name: name.value, age: age.value });
}

function handleSubmitReactive() {
  console.log(obj);
}

function handleSubmitFormData(e: Event) {
  const formData = new FormData(e.target as HTMLFormElement);
  console.log({ name: formData.get('name'), age: formData.get('age') });
}
</script>
