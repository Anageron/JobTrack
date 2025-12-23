<script setup lang="ts">

</script>

<template>
  <header class="header">
    шапка
  </header>
  <main class="main">
    главная
  </main>
</template>

<style lang="scss" scoped>
  .header,
  .main {
    margin: 0 auto;
    width: 100%;
    max-width: var(--container-width);
    outline: 5px solid var(--color-black-15);
    background-color: var(--color-gray-90);
  }

  .header {
    height: 20vh;
  }

  .main {
    min-height: 75vh;
  }
</style>
