<template>
  <h2>Widgets Source Template</h2>
  <p class="flex flex-row">
    <ButtonVue @click="widgetMemoire.undo()">
      <MdiUndo />
      <span>Undo</span>
    </ButtonVue>
    <ButtonVue @click="widgetMemoire.redo()">
      <MdiRedo />
      <span>Redo</span>
    </ButtonVue>
  </p>
  <div class="flex flex-row w-full">
    <CeateurWidgetsSourceVue
      :widgets="awailableCreateurWidgets"
      class="flex flex-row"
    />
    <CreateurWidgetsTargetVue
      v-model="createurWidgetsInstances"
      class="flex flex-row"
    />
  </div>
</template>

<script setup lang="ts">
  import ButtonVue from "../components/Button.vue";
  import CeateurWidgetsSourceVue from "../components/CeateurWidgetsSource.vue";
  import CreateurWidgetsTargetVue from "../components/CreateurWidgetsTarget.vue";
  import MdiRedo from "~icons/mdi/redo";
  import MdiUndo from "~icons/mdi/undo";
  import { computed } from "vue";
  import { widgetMemoire } from "../memoire";

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
