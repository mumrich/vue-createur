<template>
  <VueDraggable
    :class="draggableClass"
    :group="groupTarget"
    :itemKey="getItemKeyForTarget"
    class="min-h-10 min-w-10"
    v-model="widgets"
    v-bind="$attrs"
  >
    <template #item="{ element, index }">
      <div class="relative">
        <div class="actions">
          <ButtonVue @click="deleteWidgetInstance(index)">
            <MdiDelete />
          </ButtonVue>
          <ButtonVue>
            <MdiPencil @click="editWidgetInstance(index)" />
          </ButtonVue>
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
  <ModalWindowVue
    :show="showModalWindow"
    @close="onCloseModalWindow"
    @ok="onOkModalWindow"
    @cancel="onCancelModalWindow"
  >
    <component
      v-if="widgetUnderEdit"
      :is="widgetUnderEdit.editor"
      v-bind:modelValue="widgetUnderEdit.props"
      @update:modelValue="onModelValueUpdated($event)"
    />
  </ModalWindowVue>
</template>

<script setup lang="ts">
  import ButtonVue from "./Button.vue";
  import MdiDelete from "~icons/mdi/delete";
  import MdiPencil from "~icons/mdi/pencil";
  import ModalWindowVue from "../components/ModalWindow.vue";
  import VueDraggable from "vuedraggable";
  import {
    CreateurWidgetInstance,
    createurWidgetTargetSettings,
  } from "../helpers/WidgetHelper";
  import { computed, PropType, ref } from "vue";
  import { widgetMemoire } from "../memoire";

  const showDropzone = computed(
    () => createurWidgetTargetSettings.value.showDropzone
  );

  const draggableClass = computed(() => ({
    dropzone: showDropzone.value,
  }));

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

  const widgetUnderEdit = ref<CreateurWidgetInstance | null>(null);
  const showModalWindow = computed(() => widgetUnderEdit.value !== null);

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
    widgetUnderEdit.value = null;
  }

  function editWidgetInstance(index: number) {
    widgetUnderEdit.value = { ...widgets.value[index] };
  }

  function onOkModalWindow() {
    widgetMemoire.update((draftState) => {
      const widgetIndex = draftState.createurWidgetsInstances.findIndex(
        (w) => w.uid === widgetUnderEdit.value?.uid
      );

      if (widgetIndex >= 0 && widgetUnderEdit.value) {
        draftState.createurWidgetsInstances[widgetIndex].props =
          widgetUnderEdit.value?.props;
      }
    });
    widgetUnderEdit.value = null;
  }

  function onCancelModalWindow() {
    widgetUnderEdit.value = null;
  }

  function onModelValueUpdated(newProps: Record<string, any>) {
    if (widgetUnderEdit.value) {
      widgetUnderEdit.value.props = newProps;
    }
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
    @apply top-0 right-1 absolute;
    @apply flex flex-row;
  }

  .actions > * {
    @apply rounded-full;
  }

  .dropzone {
    @apply border-dashed border-4;
    /* @apply bg-gray-200; */
    @apply border-gray-400;
  }
</style>
