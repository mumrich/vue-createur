<template>
  <WidgetTemplateVue :title="title" :icon="MdiFormatText" />
</template>

<script setup lang="ts">
  import { ref } from "vue";
  import WidgetTemplateVue from "../../components/CreateurWidgetTemplate.vue";
  import MdiFormatText from "~icons/mdi/format-text";

  const title = ref("Text Block");
</script>
