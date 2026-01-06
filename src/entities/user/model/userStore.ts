import type { IUser } from '../types/user'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { client } from '@/shared/api/client'
import { API_ROUTES } from '@/shared/api/routes'

export const useUserStore = defineStore('user', () => {
  const profile = ref<IUser | null>(null)

  async function fetchUser() {
    const response = await client.get<IUser>(API_ROUTES.users.info)
    profile.value = response.data
  }

  return { profile, fetchUser }
})
