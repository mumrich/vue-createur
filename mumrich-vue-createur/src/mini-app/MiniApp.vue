<template>
  <h1>Mini-App</h1>
  <hr />
  <div>
    <RouterLink
      v-for="route in routes"
      :key="route.path"
      :to="route.path"
      class="m-4 hover:bg-gray-200"
      >{{ route.name }}</RouterLink
    >
  </div>
  <hr />
  <RouterView />
</template>

<script setup lang="ts">
  import { computed } from "vue";
  import { miniAppMemoire } from "./Memoire.js";

  const routes = computed(() => miniAppMemoire.state.value.routes);
</script>
