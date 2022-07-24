<template>
  <VueDraggable
    v-model="widgets"
    :group="groupTarget"
    :itemKey="getItemKeyForTarget"
  >
    <template #item="{ element }">
      <component :is="element.template" />
    </template>
  </VueDraggable>
</template>

<script setup lang="ts">
  import { computed, PropType, ref } from "vue";
  import VueDraggable from "vuedraggable";
  import { CreateurWidgetInstance } from "../helpers/WidgetHelper";

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
    set: (widgetInstances) => emit("update:modelValue", widgetInstances),
  });

  const groupTarget = ref({
    name: props.groupName,
  });

  function getItemKeyForTarget(element: CreateurWidgetInstance) {
    return `${element.uid}: '${element.widget}'`;
  }
</script>
