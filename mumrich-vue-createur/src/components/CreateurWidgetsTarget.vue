<template>
  <VueDraggable
    v-model="widgets"
    :group="groupTarget"
    :itemKey="getItemKeyForTarget"
  >
    <template #item="{ element, index }">
      <div class="z-40 relative">
        <div class="actions">
          <MdiDelete @click="deleteWidgetInstance(index)" />
          <MdiPencil />
        </div>
        <div class="preview-wrapper">
          <component v-if="element.preview" :is="element.preview" />
          <component v-else-if="element.template" :is="element.template" />
          <p v-else class="fallback-preview">
            <span>No Preview for:</span>
            <strong>'{{ element.widget }}'</strong>
          </p>
        </div>
      </div>
    </template>
  </VueDraggable>
</template>

<script setup lang="ts">
  import { computed, PropType, ref } from "vue";
  import VueDraggable from "vuedraggable";
  import { CreateurWidgetInstance } from "../helpers/WidgetHelper";
  import MdiPencil from "~icons/mdi/pencil";
  import MdiDelete from "~icons/mdi/delete";

  const props = defineProps({
    modelValue: {
      required: true,
      type: Array as PropType<CreateurWidgetInstance[]>,
    },
    groupName: {
      required: false,
      default: "createur-widgets",
      type: String,
    },
  });

  const emit = defineEmits<{
    (
      emit: "update:modelValue",
      widgetInstances: CreateurWidgetInstance[]
    ): void;
  }>();

  const widgets = computed({
    get: () => props.modelValue,
    set: (widgetInstances) => {
      emit("update:modelValue", widgetInstances);
    },
  });

  const groupTarget = ref({
    name: props.groupName,
  });

  function getItemKeyForTarget(element: CreateurWidgetInstance) {
    return `${element.uid}: '${element.widget}'`;
  }

  function deleteWidgetInstance(index: number) {
    const newWidgets = [...widgets.value];

    newWidgets.splice(index, 1);

    widgets.value = newWidgets;
  }
</script>

<style scoped>
  .preview-wrapper > * {
    @apply bg-white;
  }

  .fallback-preview {
    @apply bg-white;
    @apply flex flex-col justify-center align-middle items-center;
    @apply shadow m-1 p-2;
    @apply select-none;
  }

  .actions {
    @apply top-0 right-0 absolute;
    @apply flex flex-row;
  }

  .actions > * {
    @apply rounded-full cursor-pointer bg-gray-400 shadow p-1 z-50 hover:bg-gray-500;
    @apply mr-1;
  }
</style>
