<template>
  <div v-html="html" class="h-full w-full"></div>
</template>

<script setup lang="ts">
  import { computed } from "vue";
  import { marked } from "marked";
  import DOMPurify from "dompurify";

  export interface WidgetTextBlockProps {
    markdown: string;
  }

  const props = defineProps<WidgetTextBlockProps>();

  const html = computed(() => {
    const m = props.markdown;
    const rawHtml = marked(m ?? "");

    return DOMPurify.sanitize(rawHtml);
  });
</script>
