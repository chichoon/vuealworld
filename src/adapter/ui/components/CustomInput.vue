<template>
  <input v-if="!isTextArea" class="form-control form-control-lg" />
  <textarea v-else class="form-control form-control-lg" />
</template>

<script lang="ts" setup>
interface Props {
  isTextArea?: boolean;
}
defineProps<Props>();
</script>

<style lang="scss" scoped></style>
