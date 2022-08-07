<template>
  <div>
    <span><input type="checkbox" v-model="edit" />edit?</span>
    <ol>
      <li v-for="route in miniAppRoutes" :key="route.path">
        <RouteEditorVue :routePath="route.path" :edit="edit" />
      </li>
    </ol>
  </div>
</template>

<script setup lang="ts">
  import { computed, ref } from "vue";
  import RouteEditorVue from "../components/RouteEditor.vue";
  import { miniAppMemoire } from "../mini-app/Memoire";

  const edit = ref(false);
  const miniAppRoutes = computed(() => miniAppMemoire.state.value.routes);
</script>
