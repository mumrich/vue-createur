<template>
  <h2>Widgets Source Template</h2>
  <CeateurWidgetsSourceVue
    :widgets="awailableCreateurWidgets"
    class="flex flex-row"
  />
  <hr />
  <CreateurWidgetsTargetVue
    v-model="createurWidgetsInstances"
    class="flex flex-row bg-gray-100 p-8"
  />
</template>

<script setup lang="ts">
  import { computed } from "vue";
  import { widgetMemoire } from "../memoire";
  import CeateurWidgetsSourceVue from "../components/CeateurWidgetsSource.vue";
  import CreateurWidgetsTargetVue from "../components/CreateurWidgetsTarget.vue";

  const awailableCreateurWidgets = computed(
    () => widgetMemoire.state.value.awailableCreateurWidgets
  );

  const createurWidgetsInstances = computed({
    get: () => widgetMemoire.state.value.createurWidgetsInstances,
    set: (v) => {
      widgetMemoire.update((draftState) => {
        draftState.createurWidgetsInstances = v;
      });
    },
  });
</script>
