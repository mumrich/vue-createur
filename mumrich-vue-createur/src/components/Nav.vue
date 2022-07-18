<template>
  <nav>
    <router-link v-for="route in routes" :key="route.path" :to="route.path">{{
      getTitle(route)
    }}</router-link>
  </nav>
</template>

<script setup lang="ts">
  import { RouteRecordRaw } from "vue-router";
  import { routes } from "../router";

  function getTitle(route: RouteRecordRaw) {
    return route.name ?? route.path;
  }
</script>
