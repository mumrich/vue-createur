<template>
  <div class="wrapper">
    <div>
      <ol>
        <li v-for="route in miniAppRoutes" :key="route.path">
          <RouteEditorVue :routePath="route.path" />
        </li>
      </ol>
    </div>
  </div>
  <hr />
  <p class="bg-gray-50">
    <div ref="miniAppEl">...</div>
  </p>
</template>

<script setup lang="ts">
  import MiniAppVue from "../mini-app/MiniApp.vue";
  import RouteEditorVue from "../components/RouteEditor.vue";
  import { computed, createApp, onMounted, ref } from "vue";
  import { createRouter, createWebHashHistory } from "vue-router";
  import { miniAppMemoire } from "../mini-app/Memoire";

  const miniAppEl = ref<HTMLDivElement>();
  const miniApp = createApp(MiniAppVue);
  const router = createRouter({
    history: createWebHashHistory(),
    routes: miniAppMemoire.state.value.routes,
  });
  const miniAppRoutes = computed(() => miniAppMemoire.state.value.routes);
  const miniAppRoutesSerialized = computed(() =>
    JSON.stringify(miniAppRoutes.value, null, 2)
  );

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
