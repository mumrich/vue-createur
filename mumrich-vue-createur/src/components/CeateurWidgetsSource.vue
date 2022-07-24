<template>
  <VueDraggable
    :list="props.widgets"
    :group="groupSource"
    :sort="false"
    :itemKey="getItemKeyForSource"
    :clone="onClone"
  >
    <template #item="{ element }">
      <div>
        <component :is="element.template" />
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
      template: original.template,
      widget: original.template,
      props: Object.assign({}, original.defaultProps),
    };
  }
</script>
