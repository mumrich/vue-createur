<template>
  <Teleport to="body">
    <div class="modal-background" v-if="props.show">
      <div class="modal-window">
        <div class="top-actions">
          <ButtonVue @click="onClose">
            <MdiClose />
          </ButtonVue>
        </div>
        <div class="content">
          <slot name="default">
            <span>empty...</span>
          </slot>
        </div>
        <hr class="my-2" />
        <div class="bottom-actions">
          <ButtonVue @click="onCancel">
            <MdiCancel />
            <span>Cancel</span>
          </ButtonVue>
          <ButtonVue @click="onOk">
            <MdiCheck />
            <span>OK</span>
          </ButtonVue>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
  import MdiClose from "~icons/mdi/close";
  import MdiCheck from "~icons/mdi/check";
  import MdiCancel from "~icons/mdi/cancel";
  import ButtonVue from "../components/Button.vue";

  interface ModalWindowProps {
    show: boolean;
  }

  type ModalWindowEmits = {
    (emit: "close"): void;
    (emit: "ok"): void;
    (emit: "cancel"): void;
  };

  const props = defineProps<ModalWindowProps>();
  const emit = defineEmits<ModalWindowEmits>();

  function onClose() {
    emit("close");
  }

  function onCancel() {
    emit("cancel");
  }

  function onOk() {
    emit("ok");
  }
</script>

<style scoped>
  .modal-background {
    @apply top-0 left-0 absolute;
    @apply h-full w-full;
    @apply bg-gray-600 opacity-50;
    @apply flex flex-col justify-center items-center align-middle;
  }

  .modal-window {
    @apply bg-white;
    @apply rounded-xl p-4;
    @apply relative;
  }

  .top-actions {
    @apply -top-5 -right-5 absolute;
  }

  .top-actions > * {
    @apply border-gray-600 shadow-gray-600 hover:border-gray-50;
    @apply bg-gray-400 hover:bg-gray-500;
    @apply rounded-full;
  }

  .bottom-actions {
    @apply flex flex-row justify-end;
  }
</style>
