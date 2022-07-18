<script setup lang="ts">
  import LogosVue from "~icons/logos/vue";
  import NavVue from "./components/Nav.vue";
</script>

<template>
  <h1><LogosVue />App</h1>
  <NavVue />
  <hr />
  <router-view></router-view>
</template>
