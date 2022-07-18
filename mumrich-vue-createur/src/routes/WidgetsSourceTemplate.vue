<template>
  <h2>Widgets Source Template</h2>
  <div class="flex">
    <WidgetTeaserVue v-for="(widget, i) in widgets" :key="i" v-bind="widget" />
  </div>
</template>

<script setup lang="ts">
  import { ref } from "vue";
  import MdiFormatText from "~icons/mdi/format-text";
  import WidgetTeaserVue from "../components/WidgetTeaser.vue";
  import MdiImageMultipleOutline from "~icons/mdi/image-multiple-outline";
  import MdiAttachment from "~icons/mdi/attachment";

  const widgets = ref([
    {
      title: "Text Block",
      icon: MdiFormatText,
    },
    {
      title: "Image Gallery",
      icon: MdiImageMultipleOutline,
    },
    {
      title: "Attachments",
      icon: MdiAttachment,
    },
  ]);
</script>
