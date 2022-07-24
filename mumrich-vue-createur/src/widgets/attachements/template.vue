<template>
  <WidgetTemplateVue :title="title" :icon="MdiAttachment" />
</template>

<script setup lang="ts">
  import { ref } from "vue";
  import WidgetTemplateVue from "../../components/CreateurWidgetTemplate.vue";
  import MdiAttachment from "~icons/mdi/attachment";

  const title = ref("Attachments");
</script>
