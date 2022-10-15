<template>
  <VueDraggable v-model="routes" itemKey="path" tag="ol">
    <template #item="{ element, index }">
      <li>
        <button>{{ getFullPath(element) }}</button>
        <template v-if="element.children">
          <router-editor
            :parentPath="element.path"
            v-model="element.children"
          />
        </template>
      </li>
    </template>
  </VueDraggable>
</template>

<script lang="ts">
  import { RouteRecordRaw } from "vue-router";
  import { defineComponent, PropType, computed } from "vue";
  import VueDraggable from "vuedraggable";

  export default defineComponent({
    name: "router-editor",
    components: {
      VueDraggable,
    },
    props: {
      modelValue: {
        required: true,
        type: Array as PropType<RouteRecordRaw[]>,
      },
      parentPath: {
        required: false,
        type: String,
      },
    },
    emits: {
      "update:modelValue": (v: RouteRecordRaw[]) => v,
    },
    setup(props, { emit }) {
      function getFullPath(route: RouteRecordRaw) {
        if (props.parentPath) {
          return props.parentPath === "/"
            ? `/${route.path}`
            : `${props.parentPath}/${route.path}`;
        }

        return route.path;
      }

      const routes = computed({
        get: () => props.modelValue,
        set: (v) => emit("update:modelValue", v),
      });

      return {
        getFullPath,
        routes,
      };
    },
  });
</script>
