<template>
  <h2>Widgets Source Template</h2>

  <!-- 
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
  <CeateurWidgetsSourceVue :widgets="awailableCreateurWidgets" />
  <hr />
</template>

<script setup lang="ts">
  import { computed, ref } from "vue";
  import { v4 as uuidv4 } from "uuid";
  import { widgetMemoire } from "../memoire";
  import CeateurWidgetsSourceVue from "../components/CeateurWidgetsSource.vue";

  const awailableCreateurWidgets = computed(
    () => widgetMemoire.state.value.awailableCreateurWidgets
  );

  // const groupTarget = ref({
  //   name: groupSource.value.name,
  // });
  // const widgetsSource = computed(
  //   () => widgetMemoire.state.value.widgetTemplates
  // );

  // const widgetsTarget = computed({
  //   get: () => widgetMemoire.state.value.widgetsTarget,
  //   set: (targets) =>
  //     widgetMemoire.update((state) => {
  //       state.widgetsTarget = targets;
  //     }),
  // });

  // function getItemKeyForTarget(element: CreateurWidgetInstance) {
  //   return `${element.uid}: '${element.name}'`;
  // }
</script>
