import type { IUser } from '../types/user'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { deleteCookie, getCookie, getCookieOptions, setCookie } from '@/shared/lib/cookies'

const COOKIE_NAME = 'jobtrack_session'

export const useUserStore = defineStore('user', () => {
  const user = ref<IUser | null>(null)
  const isAuthenticated = ref(false)

  const logout = () => {
    user.value = null
    isAuthenticated.value = false
    deleteCookie('jobtrack_session')
  }

  const initAuth = () => {
    const cookie = getCookie(COOKIE_NAME)
    if (cookie) {
      try {
        const session = JSON.parse(cookie)
        if (session.isAuthenticated && session.user) {
          isAuthenticated.value = true
          user.value = session.user
        }
        else {
          logout()
        }
      }
      catch {
        logout()
      }
    }
  }

  const login = (email: string, name: string) => {
    const sessionData = {
      isAuthenticated: true,
      user: { email, name },
    }
    setCookie(COOKIE_NAME, JSON.stringify(sessionData), getCookieOptions())
    isAuthenticated.value = true
    user.value = { email, name }
  }

  initAuth()

  return {
    user,
    isAuthenticated,
    login,
    logout,
  }
})
