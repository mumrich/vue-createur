<template>
  <Teleport to="body">
    <div class="modal-background" v-if="props.show">
      <div class="modal-window">
        <div class="actions">
          <MdiClose @click="onClose" />
        </div>
        <div class="content">Hello</div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
  import MdiClose from "~icons/mdi/close";

  interface ModalWindowProps {
    show: boolean;
  }

  type ModalWindowEmits = {
    (emit: "close"): void;
  };

  const props = defineProps<ModalWindowProps>();
  const emit = defineEmits<ModalWindowEmits>();

  function onClose() {
    emit("close");
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

  .actions {
    @apply -top-2 -right-2 absolute;
  }

  .actions > * {
    @apply bg-gray-300 hover:bg-gray-400;
    @apply rounded-full;
    @apply shadow shadow-gray-900;
    @apply cursor-pointer;
  }
</style>
