import axios from 'axios'
import { useAuthStore } from '@/features/auth/model/authStore'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

const instance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
})

instance.interceptors.request.use((config) => {
  const authStore = useAuthStore()
  if (authStore.token) {
    config.headers.Authorization = `Bearer ${authStore.token}`
  }
  return config
})

export const client = instance
