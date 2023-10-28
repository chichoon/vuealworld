<template>
  <input
    class="form-control form-control-lg"
    :value="value1"
    @input="$emit('update:value1', ($event.target as HTMLInputElement).value)"
  />
  <input
    class="form-control form-control-lg"
    :value="value2"
    @input="$emit('update:value2', ($event.target as HTMLInputElement).value)"
  />
</template>

<script lang="ts" setup>
interface Props {
  value1: string;
  value2: string;
  isTextArea?: boolean;
}
defineProps<Props>();
defineEmits(['update:value1', 'update:value2']);
</script>

<style lang="scss" scoped></style>
