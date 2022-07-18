<template>
  <div class="widget-instance">
    <span class="mx-1">{{ props.index + 1 }}</span>
    <span class="mx-1">{{ props.uid }}</span>
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
    uid: {
      type: String,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  });
</script>
