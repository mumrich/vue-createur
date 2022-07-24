<template>
  <button>
    <slot />
  </button>
</template>

<style scoped>
  button {
    @apply m-1 p-2;
    @apply border shadow;
    @apply flex flex-row text-center align-middle items-center;
    @apply bg-gray-50;
  }

  button > * {
    @apply pl-10;
  }

  button:hover {
    @apply bg-gray-100;
  }
</style>
