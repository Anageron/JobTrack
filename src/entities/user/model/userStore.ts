import type { IUser } from '../types/user'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const profile = ref<IUser>()

  async function fetchUser() {
    // TODO раскоментировать когда будет готово апи
    //  const { data } = await client().get<IUser>(API_ROUTES.auth.profile)
    const mockProfile: IUser = {
      id: 'user-1',
      email: 'test@test.com',
      name: 'Anageron',
    }
    profile.value = mockProfile
  }

  return { profile, fetchUser }
})
