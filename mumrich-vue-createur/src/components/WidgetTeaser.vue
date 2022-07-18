<template>
  <div class="widget-teaser">
    <component :is="props.icon" />
    <span class="widget-teaser-title">{{ props.title }}</span>
  </div>
</template>

<script setup lang="ts">
  import { FunctionalComponent, PropType } from "vue";

  const props = defineProps({
    title: {
      type: String,
      required: true,
    },
    icon: {
      type: Function as PropType<FunctionalComponent>,
      required: true,
    },
  });
</script>

<style scoped>
  .widget-teaser {
    @apply border;
    @apply flex flex-col justify-center align-middle items-center;
    @apply m-1 p-2;
    @apply select-none;
    @apply text-xl;
    cursor: grab;
    @apply shadow;
  }

  .widget-teaser:hover {
    @apply bg-gray-50;
  }

  .widget-teaser-title {
    @apply text-base;
  }
</style>
