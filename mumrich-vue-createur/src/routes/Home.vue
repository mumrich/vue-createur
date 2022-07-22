<template>
  <h2>Home sweet home...</h2>
  <ol>
    <li v-for="(target, index) in targets">
      <WidgetInstanceVue v-bind="{ ...target, index }" />
    </li>
  </ol>
</template>

<script setup lang="ts">
  import { computed } from "@vue/reactivity";
  import { widgetMemoire } from "../memoire";
  import WidgetInstanceVue from "../components/WidgetInstance.vue";
  import { watch, ref } from "vue";
  import {
    CreateurWidget,
    importCreateurWidgetsPromise,
  } from "../helpers/WidgetHelper";

  const targets = computed(() => widgetMemoire.state.value.widgetsTarget);
  const createurWidgets = ref<CreateurWidget[]>();

  watch(widgetMemoire.data, (newData) => console.log(newData));

  importCreateurWidgetsPromise().then((widgets) => {
    createurWidgets.value = widgets;
  });
</script>
