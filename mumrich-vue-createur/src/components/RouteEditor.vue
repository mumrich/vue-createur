<template>
  <input v-model="routePath" />
  <input v-model="routeName" />
</template>

<script setup lang="ts">
  import { miniAppMemoire } from "../mini-app/Memoire";
  import { computed } from "vue";
  import { RouteRecordRaw } from "vue-router";

  const props = defineProps<{
    routePath: string;
  }>();

  const routeId = computed(() =>
    miniAppMemoire.state.value.routes.findIndex(
      (r) => r.path === props.routePath
    )
  );
  const route = computed(
    () => miniAppMemoire.state.value.routes[routeId.value]
  );

  function setRouteProp(propName: keyof RouteRecordRaw, propValue: any) {
    if (routeId.value >= 0) {
      miniAppMemoire.update((draftState) => {
        const newRoutes = [...draftState.routes];
        const draftRoute = newRoutes[routeId.value];

        if (draftRoute) {
          newRoutes.splice(routeId.value, 1, {
            ...draftRoute,
            [propName]: propValue,
          });
        }
        draftState.routes = newRoutes;
      });
    }
  }

  const routeName = computed({
    get: () => route.value?.name,
    set: (v) => setRouteProp("name", v),
  });

  const routePath = computed({
    get: () => route.value.path,
    set: (v) => setRouteProp("path", v),
  });
</script>
