<template>
  <VueDraggable
    v-model="widgets"
    :group="groupTarget"
    :itemKey="getItemKeyForTarget"
    class="flex-grow min-h-10 min-w-10"
  >
    <template #item="{ element, index }">
      <div class="relative">
        <div class="actions">
          <MdiDelete @click="deleteWidgetInstance(index)" />
          <MdiPencil v-if="element.editor" @click="editWidgetInstance(index)" />
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
  <ModalWindowVue :show="showModalWindow" @close="onCloseModalWindow" />
</template>

<script setup lang="ts">
  import MdiDelete from "~icons/mdi/delete";
  import MdiPencil from "~icons/mdi/pencil";
  import VueDraggable from "vuedraggable";
  import ModalWindowVue from "../components/ModalWindow.vue";
  import { CreateurWidgetInstance } from "../helpers/WidgetHelper";
  import { computed, PropType, ref } from "vue";

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
    confirmDelete: {
      required: false,
      default: false,
      type: Boolean,
    },
  });

  const showModalWindow = ref(false);

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

  function onCloseModalWindow() {
    showModalWindow.value = false;
  }

  function editWidgetInstance(index: number) {
    showModalWindow.value = true;
  }

  function deleteWidgetInstance(index: number) {
    if (props.confirmDelete) {
      const widget = widgets.value[index];
      if (!confirm(`Delete '${widget}' widget n° ${index + 1}?`)) {
        return;
      }
    }

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
    @apply rounded-full cursor-pointer bg-gray-400 shadow p-1 hover:bg-gray-500;
    @apply mr-1;
  }
</style>
