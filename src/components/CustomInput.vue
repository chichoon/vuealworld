<template>
  <input
    class="form-control form-control-lg"
    :value="value"
    @input="$emit('update:value', ($event.target as HTMLInputElement).value)"
  />
</template>

<script lang="ts" setup>
defineProps(['value']);
defineEmits(['update:value']);
</script>

<style lang="scss" scoped></style>
