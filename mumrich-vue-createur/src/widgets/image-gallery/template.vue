<template>
  <WidgetTemplateVue :title="title" :icon="MdiImageMultipleOutline" />
</template>

<script setup lang="ts">
  import { ref } from "vue";
  import WidgetTemplateVue from "../../components/WidgetTemplate.vue";
  import MdiImageMultipleOutline from "~icons/mdi/image-multiple-outline";

  const title = ref("Image Gallery");
</script>
