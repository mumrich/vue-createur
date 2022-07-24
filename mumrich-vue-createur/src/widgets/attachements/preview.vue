<template>
  <CreateurWidgetPreviewVue v-bind="props" />
</template>

<script setup lang="ts">
  import CreateurWidgetPreviewVue from "../../components/CreateurWidgetPreview.vue";

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

  const props = defineProps<PreviewProps>();
</script>
