<template>
  <QuillEditor
    :options="qullOptions"
    v-model:content="editorModelValue"
    @ready="onQuillReady"
  />
</template>

<script setup lang="ts">
  import { QuillEditor, Quill, Delta } from "@vueup/vue-quill";
  import "@vueup/vue-quill/dist/vue-quill.snow.css";
  import { watch, ref } from "vue";
  import { QuillOptionsStatic, WidgetTextBlockProps } from "./Contracts";

  interface EditorProps {
    modelValue: WidgetTextBlockProps;
  }

  const props = defineProps<EditorProps>();
  const emit = defineEmits<{
    (event: "update:modelValue", value: WidgetTextBlockProps): void;
  }>();

  const editorModelValue = ref<Delta>();
  const quill = ref<Quill>();

  function onQuillReady(q: Quill) {
    q.setHTML(props.modelValue.html);
    quill.value = q;
  }

  watch(editorModelValue, () => {
    const html = quill.value?.getHTML() as string | undefined;

    if (html) {
      emit("update:modelValue", { ...props.modelValue, html });
    }
  });

  const qullOptions = ref<QuillOptionsStatic>({});
</script>
