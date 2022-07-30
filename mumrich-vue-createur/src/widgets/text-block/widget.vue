<template>
  <p v-html="props.html"></p>
</template>

<script setup lang="ts">
  import { WidgetTextBlockProps } from "./Contracts";

  interface WidgetProps extends WidgetTextBlockProps {}
  const props = defineProps<WidgetProps>();
</script>
