<script setup lang="ts"></script>

<template>
  <button class="button">
    <slot />
  </button>
</template>

<style lang="scss" scoped>
@use '@/shared/assets/styles/helpers' as *;

.button {
  @include flex-center;
  border: none;
  border-radius: var(--border-radius-s) ;
  background-color: var(--color-black-30);
  cursor: pointer;

  &:hover {
    background-color: var(--color-gray-60);
  }
}
</style>
