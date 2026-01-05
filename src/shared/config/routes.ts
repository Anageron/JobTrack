import type { RouteRecordRaw } from 'vue-router'

const MainPage = () => import('@/pages/main/MainPage.vue')
const LoginPage = () => import('@/pages/login/LoginPage.vue')
const RegisterPage = () => import('@/pages/register/RegisterPage.vue')
const ChangePassword = () => import('@/pages/changePassword/changePassword.vue')

export const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    component: LoginPage,
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterPage,
  },
  {
    path: '/changePassword',
    name: 'changePassword',
    component: ChangePassword,
  },
  {
    path: '/',
    name: 'main',
    component: MainPage,
    meta: { requiresAuth: true },
  },
]
