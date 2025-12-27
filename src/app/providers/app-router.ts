import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/features/auth/model/authStore'
import { routes } from '@/shared/config/routes'

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({ name: 'login', query: { redirect: to.fullPath } })
    return
  }

  if (to.name === 'Login' && authStore.isAuthenticated) {
    next({ name: 'main' })
    return
  }

  next()
})

export default router
