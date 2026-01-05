<script setup lang="ts">
import { ref } from 'vue'
import ButtonText from '@/shared/ui/ButtonText.vue'
import InputDefault from '@/shared/ui/InputDefault.vue'

const step = ref<'email' | 'code' | 'newPassword'>('email')
const form = ref<{ email?: string, code?: string, newPassword?: string }>({})

function sendCode() {
  step.value = 'code'
}

function verifyCode() {
  step.value = 'newPassword'
}

function changePassword() {
  step.value = 'email'
}
</script>

<template>
  <div class="changePassword-page">
    <section class="changePassword">
      <h4 class="changePassword__title">
        Смена пароля
      </h4>
      <Transition name="fade" mode="out-in">
        <div v-if="step === 'email'" key="email" class="changePassword__form">
          <InputDefault
            v-model="form.email"
            type="email"
            inputmode="email"
            name="email"
            autocomplete="email"
            placeholder="Введите вашу почту"
          />
          <ButtonText type="submit" @click="sendCode">
            <span class="submit-button__text">Отправить код на почту</span>
          </ButtonText>
        </div>

        <div v-else-if="step === 'code'" key="code" class="changePassword__form">
          <InputDefault
            v-model="form.code"
            type="password"
            inputmode="text"
            name="password"
            autocomplete="current-password"
            placeholder="Код из письма"
          />
          <ButtonText type="submit" @click="verifyCode">
            <span class="submit-button__text">Подтвердить</span>
          </ButtonText>
        </div>

        <div v-else-if="step === 'newPassword'" key="newPassword" class="changePassword__form">
          <InputDefault
            v-model="form.newPassword"
            type="password"
            inputmode="text"
            name="password"
            autocomplete="current-password"
            placeholder="Новый пароль"
          />
          <ButtonText type="submit" @click="changePassword">
            <span class="submit-button__text">Подтвердить</span>
          </ButtonText>
        </div>
      </Transition>
    </section>
  </div>
</template>

<style lang="scss" scoped>
@use '@/shared/assets/styles/helpers' as *;

.changePassword-page {
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

.changePassword {
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
