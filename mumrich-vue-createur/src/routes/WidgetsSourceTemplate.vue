<template>
  <h2>Widgets Source Template</h2>
  <VueDraggable
    class="flex"
    :list="widgetsSource"
    :group="groupSource"
    :sort="false"
    :itemKey="getItemKeyForSource"
    :clone="onClone"
  >
    <template #item="{ element }">
      <WidgetTemplateVue v-bind="element" />
    </template>
  </VueDraggable>
  <hr />
  <VueDraggable
    class="flex flex-col bg-gray-100 p-8"
    v-model="widgetsTarget"
    :group="groupTarget"
    :itemKey="getItemKeyForTarget"
  >
    <template #item="{ element, index }">
      <WidgetInstanceVue v-bind="{ ...element, index }" />
    </template>
  </VueDraggable>
</template>

<script setup lang="ts">
  import MdiAttachment from "~icons/mdi/attachment";
  import MdiFormatText from "~icons/mdi/format-text";
  import MdiImageMultipleOutline from "~icons/mdi/image-multiple-outline";
  import VueDraggable from "vuedraggable";
  import WidgetTemplateVue from "../components/WidgetTemplate.vue";
  import WidgetInstanceVue from "../components/WidgetInstance.vue";
  import { computed, FunctionalComponent, ref } from "vue";
  import { defineMemoireWithBroadcastChannel } from "mumrich-vue-memoire";
  import { v4 as uuidv4 } from "uuid";

  type WidgetTemplate = {
    title: string;
    icon: FunctionalComponent;
  };

  type WidgetInstance = {
    uid: string;
  } & WidgetTemplate;

  type WidgetsState = {
    widgetsSource: WidgetTemplate[];
    widgetsTarget: WidgetInstance[];
  };

  const memoire = defineMemoireWithBroadcastChannel<WidgetsState>("widgets", {
    widgetsSource: [
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
    ],
    widgetsTarget: [],
  });

  const groupSource = ref({
    name: "widgets",
    pull: "clone",
    put: false,
  });
  const groupTarget = ref({
    name: groupSource.value.name,
  });
  const widgetsSource = computed(() => memoire.state.value.widgetsSource);

  const widgetsTarget = computed({
    get: () => memoire.state.value.widgetsTarget,
    set: (targets) =>
      memoire.update((state) => {
        state.widgetsTarget = targets;
      }),
  });

  function getItemKeyForSource(element: WidgetTemplate) {
    return element.title;
  }

  function getItemKeyForTarget(element: WidgetInstance) {
    return `${element.uid}: '${element.title}'`;
  }

  function onClone(original: WidgetTemplate): WidgetInstance {
    return Object.assign({}, original, { uid: uuidv4() });
  }
</script>
