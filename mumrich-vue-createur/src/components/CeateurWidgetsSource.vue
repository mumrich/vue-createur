<template>
  <VueDraggable
    :list="props.widgets"
    :group="groupSource"
    :sort="false"
    :itemKey="getItemKeyForSource"
    :clone="onClone"
    class="min-h-10 min-w-10"
  >
    <template #item="{ element }">
      <div class="template-wrapper">
        <component v-if="element.template" :is="element.template" />
        <p v-else class="fallback-template">
          <span>No Preview for:</span>
          <strong>'{{ element.widget }}'</strong>
        </p>
      </div>
    </template>
  </VueDraggable>
</template>

<script setup lang="ts">
  import VueDraggable from "vuedraggable";
  import {
    CreateurWidgetInstance,
    CreateurWidgetRegistered,
  } from "../helpers/WidgetHelper";
  import { PropType, ref } from "vue";
  import { v4 as uuidv4 } from "uuid";

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

  function onClone(original: CreateurWidgetRegistered): CreateurWidgetInstance {
    return {
      uid: uuidv4(),
      editor: original.editor,
      preview: original.preview,
      template: original.template,
      widget: original.widget,
      props: Object.assign({}, original.defaultProps),
    };
  }
</script>

<style scoped>
  .template-wrapper > * {
    @apply select-none;
    @apply text-xl;
    cursor: grab;
    @apply shadow;
  }

  .template-wrapper > *:hover {
    @apply bg-gray-50;
  }

  .fallback-template {
    @apply bg-white;
    @apply flex flex-col justify-center align-middle items-center;
    @apply shadow m-1 p-2;
    @apply select-none;
  }
</style>
