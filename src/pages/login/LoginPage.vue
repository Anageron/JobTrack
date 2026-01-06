<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/features/auth/model/authStore'
import ButtonText from '@/shared/ui/ButtonText.vue'
import InputDefault from '@/shared/ui/InputDefault.vue'

const form = ref<{ email?: string, password?: string }>({})
const authStore = useAuthStore()
const router = useRouter()

watch(() => [form.value.email, form.value.password], () => {
  if (authStore.loginError) {
    authStore.clearLoginError()
  }
}, { deep: true })

function redirectToRegister() {
  router.push({ name: 'register' })
}

function redirectToChangePassword() {
  router.push({ name: 'changePassword' })
}

async function onSubmit(e: Event) {
  e.preventDefault()
  if (!form.value.email || !form.value.password) {
    return
  }
  try {
    await authStore.login(form.value.email, form.value.password)
    router.push({ name: 'main' })
    form.value = {}
  }
  catch (error) {
    console.error('Login failed:', error)
  }
}
</script>

<template>
  <div class="login-page">
    <section class="login">
      <h4 class="login__title">
        Вход
      </h4>

      <form class="login__form" @submit="onSubmit">
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
        <div class="login__footer">
          <div class="login__error-placeholder">
            <Transition name="error">
              <div v-if="authStore.loginError" class="login__error">
                {{ authStore.loginError }}
              </div>
            </Transition>
          </div>
          <button class="password-button" type="button" @click="redirectToChangePassword">
            Забыли пароль?
          </button>
        </div>
        <ButtonText type="submit">
          <span class="submit-button__text">Вход</span>
        </ButtonText>
        <button class="register-button" type="button" @click="redirectToRegister">
          Нет аккаунта? Зарегистрироваться
        </button>
      </form>
    </section>
    <h1 class="login-page__title">
      JobTrack!
    </h1>
  </div>
</template>

<style lang="scss" scoped>
@use '@/shared/assets/styles/helpers' as *;

.login-page {
  min-height: 100vh;
  @include flex-center;
  gap: fluid-to-laptop(200,50);

  @include mobile {
    flex-direction: column;
  }

  &__title {
    order: 3;

    @include mobile {
    order: 1;
    }
  }
}

.login {
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
  @include mobile {
    width: calc(100% - 2 * var(--container-padding-x));
  }
}

.submit-button__text {
  padding:var(--container-padding-x);
  color:var(--color-white);
  @include fluid-text(24, 16);
}

.register-button,
.password-button {
  border: none;
  background-color: transparent;
  color: var(--color-gray-55);
  cursor: pointer;

  &:hover {
    color: var(--color-black);
  }
}

.login__footer {
  display: flex;
  justify-content: space-between;
}

.password-button {
  text-align: right;
}

.login__error {
  text-align: left;
  color:  var(--color-red);
  font-size: 14px;
  transition: 0.3s ;
}

.error-enter-active,
.error-leave-active {
  transition: opacity 0.3s ease;
}

.error-enter-from,
.error-leave-to {
  opacity: 0;
}
</style>
