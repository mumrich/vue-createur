<template>
  <h2>Widgets Source Template</h2>
  <!-- 
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
  </VueDraggable> -->
  <VueDraggable
    class="flex"
    :list="widgetsSource"
    :group="groupSource"
    :sort="false"
    :itemKey="getItemKeyForSource"
    :clone="onClone"
  >
    <template #item="{ element }">
      <component :is="element.name" />
    </template>
  </VueDraggable>
</template>

<script setup lang="ts">
  import VueDraggable from "vuedraggable";
  import WidgetTemplateVue from "../components/WidgetTemplate.vue";
  import WidgetInstanceVue from "../components/WidgetInstance.vue";
  import { computed, ref } from "vue";
  import { v4 as uuidv4 } from "uuid";
  import {
    widgetMemoire,
    CreateurWidgetInstance,
    CreateurWidgetTemplate,
  } from "../memoire";

  const groupSource = ref({
    name: "widgets",
    pull: "clone",
    put: false,
  });
  const groupTarget = ref({
    name: groupSource.value.name,
  });
  const widgetsSource = computed(
    () => widgetMemoire.state.value.widgetTemplates
  );

  const widgetsTarget = computed({
    get: () => widgetMemoire.state.value.widgetsTarget,
    set: (targets) =>
      widgetMemoire.update((state) => {
        state.widgetsTarget = targets;
      }),
  });

  function getItemKeyForSource(element: CreateurWidgetTemplate) {
    return element.name;
  }

  function getItemKeyForTarget(element: CreateurWidgetInstance) {
    return `${element.uid}: '${element.name}'`;
  }

  function onClone(original: CreateurWidgetTemplate): CreateurWidgetInstance {
    return Object.assign({}, original, { uid: uuidv4() });
  }
</script>
