<template>
  <div class="wrapper">
    <div>
      <ol>
        <li v-for="route in miniAppRoutes" :key="route.path">
          <input v-model="getComputedForRoute(route.path)" />
        </li>
      </ol>
    </div>
    <div ref="miniAppEl">...</div>
  </div>
</template>

<script setup lang="ts">
  import { useMiniAppMemoire } from "@/mini-app/Memoire";
  import { computed, createApp, onMounted, ref } from "vue";
  import { createRouter, createWebHashHistory } from "vue-router";
  import MiniAppVue from "../mini-app/MiniApp.vue";

  const miniAppEl = ref<HTMLDivElement>();
  const miniApp = createApp(MiniAppVue);
  const miniAppMemoire = useMiniAppMemoire();
  const router = createRouter({
    history: createWebHashHistory(),
    routes: miniAppMemoire.state.value.routes,
  });
  const miniAppRoutes = computed(() => miniAppMemoire.state.value.routes);

  function getComputedForRoute(routePath: string) {
    return computed({
      get: () => miniAppRoutes.value.find((r) => r.path === routePath),
      set: (v) =>
        miniAppMemoire.update((draftState) => {
          draftState.routes.splice(
            miniAppRoutes.value.findIndex((r) => r.path === routePath),
            1,
            v!
          );
        }),
    });
  }

  miniApp.use(router);

  onMounted(() => {
    if (miniAppEl.value) {
      miniApp.mount(miniAppEl.value);
    }
  });
</script>

<style scoped>
  .wrapper {
    @apply w-full;
    @apply flex flex-row justify-around;
  }

  .wrapper > * {
    @apply bg-gray-200;
  }
</style>
