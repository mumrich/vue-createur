<template>
  <div class="widget-teaser">
    <component :is="MdiAttachment" />
    <span class="widget-teaser-title">{{ title }}</span>
    <span>{{ props.uid }}</span>
  </div>
</template>

<script setup lang="ts">
  import MdiAttachment from "~icons/mdi/attachment";
  import { ref } from "vue";

  // TODO: use 'CreateurWidgetInstance' when fixed in framework
  // https://vuejs.org/api/sfc-script-setup.html#typescript-only-features
  // "Currently complex types and type imports from other files are not supported. It is possible to support type imports in the future."
  interface PreviewProps {
    uid: string;
    props: Record<string, any>;
    editor?: string;
    template?: string;
    preview?: string;
    widget?: string;
  }

  const title = ref("Attachments");
  const props = defineProps<PreviewProps>();
</script>
