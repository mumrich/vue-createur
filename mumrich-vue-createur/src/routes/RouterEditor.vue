<template>
  <div class="wrapper">
    <div>left</div>
    <div>right</div>
  </div>
</template>

<style scoped>
  .wrapper {
    @apply w-full;
    @apply flex flex-row justify-around;
  }

  .wrapper > * {
    @apply bg-gray-200;
  }
</style>
