<template>
  <input class="input" :value="value" @input="$emit('update:value', ($event.target as HTMLInputElement).value)" />
</template>

<script lang="ts" setup>
defineProps(['value']);
defineEmits(['update:value']);
</script>

<style lang="scss" scoped>
.input {
  border: 1px solid #cccccc;
  border-radius: 5px;
  padding: 10px 15px;
  font-size: 20px;
}
</style>
