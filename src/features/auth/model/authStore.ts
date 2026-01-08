import type { ILoginResponse } from '@/shared/api/types/auth'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useUserStore } from '@/entities/user/model/userStore'
import { client } from '@/shared/api/client'
import { API_ROUTES } from '@/shared/api/routes'

const TOKEN_KEY = 'jobtrack_access_token'

export const useAuthStore = defineStore('auth', () => {
  const savedToken = localStorage.getItem(TOKEN_KEY)
  const token = ref<string | null>(savedToken)
  const loginError = ref<string | null>(null)
  const isAuthenticated = computed(() => !!token.value)

  async function login(email: string, password: string) {
    loginError.value = null
    try {
      const response = await client.post<ILoginResponse>(API_ROUTES.users.login, {
        email,
        password,
      })
      token.value = response.data.jwt
      localStorage.setItem(TOKEN_KEY, token.value) // ← сохраняем в localStorage
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
    localStorage.removeItem(TOKEN_KEY)
    const userStore = useUserStore()
    userStore.$reset()
  }

  return {
    token,
    isAuthenticated,
    loginError,
    clearLoginError,
    login,
    logout,
  }
})
