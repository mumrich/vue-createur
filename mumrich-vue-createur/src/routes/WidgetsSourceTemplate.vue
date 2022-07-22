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
  import VueDraggable from "vuedraggable";
  import WidgetTemplateVue from "../components/WidgetTemplate.vue";
  import WidgetInstanceVue from "../components/WidgetInstance.vue";
  import { computed, ref } from "vue";
  import { v4 as uuidv4 } from "uuid";
  import { widgetMemoire, WidgetInstance, WidgetTemplate } from "../memoire";

  const groupSource = ref({
    name: "widgets",
    pull: "clone",
    put: false,
  });
  const groupTarget = ref({
    name: groupSource.value.name,
  });
  const widgetsSource = computed(() => widgetMemoire.state.value.widgetsSource);

  const widgetsTarget = computed({
    get: () => widgetMemoire.state.value.widgetsTarget,
    set: (targets) =>
      widgetMemoire.update((state) => {
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
