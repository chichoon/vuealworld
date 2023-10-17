<template>
  <input
    v-if="!isTextArea"
    class="form-control form-control-lg"
    :value="value"
    @input="$emit('update:value', ($event.target as HTMLInputElement).value)"
  />
  <textarea
    v-else
    class="form-control form-control-lg"
    :value="value"
    @input="$emit('update:value', ($event.target as HTMLTextAreaElement).value)"
  />
</template>

<script lang="ts" setup>
defineProps({ value: String, isTextArea: Boolean });
defineEmits(['update:value']);
</script>

<style lang="scss" scoped></style>
