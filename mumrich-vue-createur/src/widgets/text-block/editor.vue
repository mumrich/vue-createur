<template>
  <div class="flex flex-row">
    <div ref="editorEl" class="editor" />
    <div class="markdown">
      <WidgetVue :markdown="markdownModel" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import WidgetVue, { WidgetTextBlockProps } from "./widget.vue";
  import loader from "@monaco-editor/loader";
  import { computed, onMounted, PropType, ref, watch } from "vue";
  import { editor } from "monaco-editor/esm/vs/editor/editor.api";

  const editorEl = ref<HTMLDivElement>();
  const props = defineProps({
    modelValue: {
      type: Object as PropType<WidgetTextBlockProps>,
    },
  });
  const emit = defineEmits<{
    (emit: "update:modelValue", v: WidgetTextBlockProps): void;
  }>();

  const markdownModel = computed({
    get: () => props.modelValue?.markdown ?? "",
    set: (v) => emit("update:modelValue", { ...props.modelValue, markdown: v }),
  });

  let codeEditor: editor.IStandaloneCodeEditor | null = null;

  onMounted(async () => {
    const editorOptions = {
      language: "markdown",
      value: markdownModel.value,
      minimap: { enabled: false },
    };
    const monaco = await loader.init();
    codeEditor = monaco.editor.create(editorEl.value!, editorOptions);

    codeEditor.onDidChangeModelContent(() => {
      markdownModel.value = codeEditor?.getValue() ?? "";
    });
  });
</script>

<style scoped>
  .editor {
    width: 400px;
    height: 300px;
  }

  .markdown {
    width: 400px;
    height: 300px;
  }
</style>
