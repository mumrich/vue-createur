<template>
  <div class="wrapper">
    <RouterEditorVue />
  </div>
  <hr />
  <p class="bg-gray-50">
    <div ref="miniAppEl">...</div>
  </p>
</template>

<script setup lang="ts">
  import MiniAppVue from "../mini-app/MiniApp.vue";
  import { createApp, onMounted, ref } from "vue";
  import { createRouter, createWebHashHistory } from "vue-router";
  import { miniAppMemoire } from "../mini-app/Memoire";
  import RouterEditorVue from "../components/RouterEditor.vue";

  const miniAppEl = ref<HTMLDivElement>();
  const miniApp = createApp(MiniAppVue);
  const router = createRouter({
    history: createWebHashHistory(),
    routes: miniAppMemoire.state.value.routes,
  });
  

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
