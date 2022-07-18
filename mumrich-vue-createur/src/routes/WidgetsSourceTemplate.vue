<template>
  <h2>Widgets Source Template</h2>
  <VueDraggable
    class="flex"
    v-model="widgetsSource"
    :group="groupSource"
    :sort="false"
  >
    <template #item="{ element }">
      <WidgetTeaserVue v-bind="element" />
    </template>
  </VueDraggable>
  <hr />
  <VueDraggable
    class="flex flex-col bg-gray-100 p-8"
    v-model="widgetsTarget"
    :group="groupTarget"
    tag="ol"
  >
    <template #item="{ element }">
      <li>{{ element.title }}</li>
    </template>
  </VueDraggable>
</template>

<script setup lang="ts">
  import { ref } from "vue";
  import MdiFormatText from "~icons/mdi/format-text";
  import WidgetTeaserVue from "../components/WidgetTeaser.vue";
  import MdiImageMultipleOutline from "~icons/mdi/image-multiple-outline";
  import MdiAttachment from "~icons/mdi/attachment";
  import VueDraggable from "vuedraggable";

  const groupSource = ref({
    name: "widgets",
    pull: "clone",
    put: false,
  });
  const groupTarget = ref({
    name: groupSource.value.name,
  });
  const widgetsSource = ref([
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

  const widgetsTarget = ref<typeof widgetsSource.value>([]);
</script>
