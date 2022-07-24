<template>
  <h2>Widgets Source Template</h2>
  <p class="flex flex-row">
    <button @click="widgetMemoire.undo()">
      <span><MdiUndo /> Undo</span>
    </button>
    <button @click="widgetMemoire.redo()">
      <span><MdiRedo /> Redo</span>
    </button>
  </p>
  <div class="flex flex-row w-full">
    <CeateurWidgetsSourceVue
      :widgets="awailableCreateurWidgets"
      class="flex flex-row"
    />
    <CreateurWidgetsTargetVue
      v-model="createurWidgetsInstances"
      class="flex flex-row flex-grow bg-gray-100"
    />
  </div>
</template>

<script setup lang="ts">
  import { computed } from "vue";
  import { widgetMemoire } from "../memoire";
  import CeateurWidgetsSourceVue from "../components/CeateurWidgetsSource.vue";
  import CreateurWidgetsTargetVue from "../components/CreateurWidgetsTarget.vue";
  import MdiUndo from "~icons/mdi/undo";
  import MdiRedo from "~icons/mdi/redo";

  const awailableCreateurWidgets = computed(
    () => widgetMemoire.state.value.awailableCreateurWidgets
  );

  const createurWidgetsInstances = computed({
    get: () => widgetMemoire.state.value.createurWidgetsInstances,
    set: (v) =>
      widgetMemoire.update((draftState) => {
        draftState.createurWidgetsInstances = v;
      }),
  });
</script>

<style scoped>
  button {
    @apply m-1 p-2;
    @apply shadow;
    @apply flex flex-row align-middle justify-center items-center;
  }

  button:hover {
    @apply bg-gray-50;
  }
</style>
