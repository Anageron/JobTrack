import type { ILoginResponse } from '@/shared/api/types/auth'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useUserStore } from '@/entities/user/model/userStore'
import { client } from '@/shared/api/client'
import { API_ROUTES } from '@/shared/api/routes'

export const useAuthStore = defineStore('auth', () => {
  // Токен храним в памяти
  const token = ref<string | null>(null)
  const loginError = ref<string | null>(null)
  const isAuthenticated = computed(() => !!token.value)

  async function login(email: string, password: string) {
    loginError.value = null // сброс ошибки перед попыткой
    try {
      const response = await client.post<ILoginResponse>(API_ROUTES.users.login, {
        email,
        password,
      })
      token.value = response.data.jwt
      const userStore = useUserStore()
      await userStore.fetchUser()
    }
    catch (error: any) {
      if (error.response?.status === 401) {
        loginError.value = 'Неверный email или пароль'
      }
      else {
        loginError.value = 'Ошибка сервера. Попробуйте позже.'
      }
      throw error
    }
  }

  function clearLoginError() {
    loginError.value = null
  }

  function logout() {
    token.value = null
    const userStore = useUserStore()
    userStore.$reset()
  }

  return { token, isAuthenticated, loginError, clearLoginError, login, logout }
})
