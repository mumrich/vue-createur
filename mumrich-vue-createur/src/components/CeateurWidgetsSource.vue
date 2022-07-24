<template>
  <VueDraggable
    class="flex flex-row"
    :list="props.widgets"
    :group="groupSource"
    :sort="false"
    :itemKey="getItemKeyForSource"
    :clone="onClone"
  >
    <template #item="{ element }">
      <component :is="element.template" />
    </template>
  </VueDraggable>
</template>

<script setup lang="ts">
  import VueDraggable from "vuedraggable";
  import { CreateurWidgetRegistered } from "../helpers/WidgetHelper";
  import { PropType, ref } from "vue";

  const props = defineProps({
    widgets: {
      required: true,
      type: Array as PropType<CreateurWidgetRegistered[]>,
    },
    groupName: {
      required: false,
      default: "createur-widgets",
      type: String,
    },
  });

  const groupSource = ref({
    name: props.groupName,
    pull: "clone",
    put: false,
  });

  function getItemKeyForSource(element: CreateurWidgetRegistered) {
    return element.id;
  }

  function onClone(original: CreateurWidgetRegistered) {
    debugger;
  }
</script>
