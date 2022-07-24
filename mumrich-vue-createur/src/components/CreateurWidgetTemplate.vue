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
      type: Object as PropType<FunctionalComponent>,
      required: true,
    },
  });
</script>

<style scoped>
  .widget-teaser {
    @apply border;
    @apply flex flex-col justify-center align-middle items-center;
    @apply m-1 p-2;
  }

  .widget-teaser-title {
    @apply text-base;
  }
</style>
