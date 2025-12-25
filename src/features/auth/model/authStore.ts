import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useUserStore } from '@/entities/user/model/userStore'
import { deleteCookie, getCookie, getCookieOptions, setCookie } from '@/shared/lib/cookies'

const COOKIE_NAME = 'jobtrack_session'

export const useAuthStore = defineStore('auth', () => {
  // TODO раскоментировать когда будет готово апи
  //   const token = ref<string>()
  //   const initalValue = getCookie(COOKIE_NAME)

  const isAuthenticated = ref(false)
  const cookie = getCookie(COOKIE_NAME)
  if (cookie === 'true') {
    isAuthenticated.value = true
  }

  function setAuthenticated(value: boolean) {
    isAuthenticated.value = value
    if (value) {
      setCookie(COOKIE_NAME, 'true', getCookieOptions())
    }
    else {
      deleteCookie(COOKIE_NAME)
    }
  }

  async function login(email: string, password: string) {
    if (password !== '123') {
      throw new Error('Неверный пароль')
    }
    setAuthenticated(true)
    const userStore = useUserStore()
    await userStore.fetchUser()
  }
  function logout() {
    setAuthenticated(false)
    const userStore = useUserStore()
    userStore.$reset()
  }
  // TODO раскоментировать когда будет готово апи
  //
  // if (initalValue) {
  //   token.value = initalValue
  // }

  // function setToken(newToken: string) {
  //   token.value = newToken
  //   setCookie(COOKIE_NAME, newToken)
  // }
  // // TODO раскоментировать когда будет готово апи
  // //   const getToken = computed(() => token.value)

  // async function login(email: string, password: string) {
  //   const { data } = await client().post<ILoginResponse>(API_ROUTES.auth.login, {
  //     email,
  //     password,
  //   })
  //   setToken(data.token)
  // }

  // function logout() {
  //   token.value = undefined
  //   deleteCookie(COOKIE_NAME)
  // }
  return { isAuthenticated, login, logout }
})
