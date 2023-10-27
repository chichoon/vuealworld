<template>
  <div>
    <ul class="nav nav-pills outline-active">
      <li class="nav-item">
        <button @click="emits('firstTab')" class="nav-link" :class="{ active: isActive[0] }">
          {{ props.tabNames[0] }}
        </button>
      </li>
      <li class="nav-item">
        <button @click="emits('secondTab')" class="nav-link" :class="{ active: isActive[1] }">
          {{ props.tabNames[1] }}
        </button>
      </li>
      <li class="nav-item" v-if="isThirdTab">
        <button disabled class="nav-link" :class="{ active: isThirdTab }">
          {{ props.tabNames[2] }}
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
interface Props {
  tabNames: string[];
  isActive: boolean[];
  isThirdTab?: boolean;
}

interface Emits {
  (e: 'firstTab'): void;
  (e: 'secondTab'): void;
}

const props = defineProps<Props>();
const emits = defineEmits<Emits>();
</script>
