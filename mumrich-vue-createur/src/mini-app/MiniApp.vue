<template>
  <h1>Mini-App</h1>
  <hr />
  <div>
    <RouterLink v-for="route in routes" :key="route.path" :to="route.path">{{
      route.name
    }}</RouterLink>
  </div>
  <hr />
  <RouterView />
</template>

<script setup lang="ts">
  import { computed } from "vue";
  import { useMiniAppMemoire } from "./Memoire.js";

  const miniAppMemoire = useMiniAppMemoire();

  const routes = computed(() => miniAppMemoire.state.value.routes);
</script>
