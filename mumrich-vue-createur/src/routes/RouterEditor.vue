<template>
  <div class="wrapper">
    <div>left</div>
    <div ref="miniAppEl">...</div>
  </div>
</template>

<script setup lang="ts">
  import { createApp, onMounted, ref } from "vue";
  import MiniAppVue from "../mini-app/MiniApp.vue";

  const miniAppEl = ref<HTMLDivElement>();
  const miniApp = createApp(MiniAppVue);

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
