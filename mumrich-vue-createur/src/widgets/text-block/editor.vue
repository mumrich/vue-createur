<template>
  <QuillEditor :options="qullOptions" />
</template>

<script setup lang="ts">
  import { QuillEditor } from "@vueup/vue-quill";
  import "@vueup/vue-quill/dist/vue-quill.snow.css";
  import { ref } from "vue";

  interface StringMap {
    [key: string]: any;
  }

  interface QuillOptionsStatic {
    debug?: string | boolean | undefined;
    modules?: StringMap | undefined;
    placeholder?: string | undefined;
    readOnly?: boolean | undefined;
    theme?: string | undefined;
    formats?: string[] | undefined;
    bounds?: HTMLElement | string | undefined;
    scrollingContainer?: HTMLElement | string | undefined;
    strict?: boolean | undefined;
  }

  const qullOptions = ref<QuillOptionsStatic>({
    placeholder: "Compose an epic...",
  });
</script>
