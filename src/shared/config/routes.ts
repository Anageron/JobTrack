import type { RouteRecordRaw } from 'vue-router'

const HomePage = () => import('@/pages/main/MainPage.vue')
const LoginPage = () => import('@/pages/login/LoginPage.vue')

export const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    component: LoginPage,
  },
  {
    path: '/',
    name: 'main',
    component: HomePage,
    meta: { requiresAuth: true },
  },
]
