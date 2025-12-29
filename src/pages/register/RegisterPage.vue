<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/features/auth/model/authStore'
import ButtonText from '@/shared/ui/ButtonText.vue'
import InputDefault from '@/shared/ui/InputDefault.vue'

const form = ref<{ name?: string, email?: string, password?: string }>({})
const authStore = useAuthStore()
const router = useRouter()

function redirectToLogin() {
  router.push({ name: 'login' })
}

function onSubmit(e: Event) {
  e.preventDefault()
  if (!form.value.name || !form.value.email || !form.value.password) {
    return
  }
  authStore.login(form.value.email, form.value.password)
  form.value = {}
}
</script>

<template>
  <div class="register-page">
    <section class="register">
      <h4 class="register__title">
        Регистрация
      </h4>
      <form class="register__form" @submit="onSubmit">
        <InputDefault
          v-model="form.name"
          type="name"
          inputmode="text"
          name="name"
          autocomplete="name"
          placeholder="Имя"
        />
        <InputDefault
          v-model="form.email"
          type="email"
          inputmode="email"
          name="email"
          autocomplete="email"
          placeholder="Email"
        />
        <InputDefault
          v-model="form.password"
          type="password"
          inputmode="text"
          name="password"
          autocomplete="current-password"
          placeholder="Пароль"
        />
        <InputDefault
          v-model="form.password"
          type="password"
          inputmode="text"
          name="password"
          autocomplete="current-password"
          placeholder="Повторите пароль"
        />
        <ButtonText type="submit">
          <span class="submit-button__text">Вход</span>
        </ButtonText>
        <button class="register-button" type="button" @click="redirectToLogin">
          Есть аккаунт? Войти
        </button>
      </form>
    </section>
    <h1 class="register-page__title">
      Добро пожаловать!
    </h1>
  </div>
</template>

<style lang="scss" scoped>
@use '@/shared/assets/styles/helpers' as *;

.register-page {
  min-height: 100vh;
  @include flex-center;
  gap: fluid-to-laptop(100,50);

  @include mobile {
    flex-direction: column;
  }

  &__title {
    max-width: 300px;
    order: 3;

    @include mobile {
    order: 1;
    }
  }
}

.register {
  width: 100%;
  max-width: fluid(500,390);
  padding: var(--container-padding-x) var(--container-padding-x);
  flex-direction: column;
  order: 2;

  &__title {
    text-align: left;
  }

  &__form {
    display: flex;
    flex-direction: column;
    gap: fluid(20,14)
  }
}

.submit-button__text {
  padding:var(--container-padding-x);
  color:var(--color-white);
  @include fluid-text(24, 16);
}

.register-button {
  border: none;
  background-color: transparent;
  color: var(--color-gray-55);
  cursor: pointer;

  &:hover {
    color: var(--color-black);
  }
}
</style>
