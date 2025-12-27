<script setup lang="ts">
import { onMounted, useTemplateRef } from 'vue'

type Iinputmode = 'text' | 'email' | 'search' | 'tel' | 'url' | 'none' | 'numeric' | 'decimal'

const {
  isFocused,
  type,
  inputmode,
  name,
  autocomplete,
} = defineProps<{
  isFocused?: boolean
  type?: string
  inputmode?: Iinputmode
  name?: string
  autocomplete?: string
}>()
const data = defineModel<string>()
const input = useTemplateRef<HTMLInputElement>('input')

onMounted(() => {
  if (isFocused && input.value) {
    input.value.focus()
  }
})
</script>

<template>
  <input
    ref="input"
    v-model="data"
    :type="type"
    :inputmode="inputmode"
    :name="name"
    :autocomplete="autocomplete"
    class="input"
  >
</template>

<style lang="scss" scoped>
 @use '@/shared/assets/styles/helpers' as *;

.input {
  background-color: transparent;
  border: none;
  border-bottom: 1px solid var(--color-gray-60);
  @include fluid-text(24, 16);

  &:focus-visible {
    outline: 2px solid var(--color-gray-99);
  }
}
</style>
